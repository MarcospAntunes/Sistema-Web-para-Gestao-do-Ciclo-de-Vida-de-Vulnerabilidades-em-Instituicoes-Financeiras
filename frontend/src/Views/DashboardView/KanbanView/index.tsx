"use client";

import React, { useState, useRef, useEffect } from "react";
import { useTheme } from "@/hooks";
import { resolveTheme } from "@/themes";
import { KanbanStyle } from "./KanbanView.style";
import { initialTasks, initialColumns } from "./mockData";
import { KanbanTask, TaskStatus } from "./types";
import { mapBackendToKanban, statusToStatusEnum, BackendVulnerability } from "./mapper";
import { getVulnerabilities, updateVulnerabilityStatus, addVulnerabilityHistory } from "@/api/vulnerabilities";
import TaskModal from "./TaskModal";
import { FiSearch, FiServer, FiArrowDown } from "react-icons/fi";

const statusLabels: Record<TaskStatus, string> = {
  backlog: "Backlog",
  analysis: "Em análise",
  execution: "Em execução",
  validation: "Validação",
  resolved: "Resolvido"
};

export default function KanbanView() {
  const { theme } = useTheme();
  const currentTheme = resolveTheme(theme);

  const [tasks, setTasks] = useState<KanbanTask[]>(initialTasks);
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [draggedTaskId, setDraggedTaskId] = useState<string | null>(null);
  const [dragOverColumnId, setDragOverColumnId] = useState<TaskStatus | null>(null);
  const [dragOverCardId, setDragOverCardId] = useState<string | null>(null);
  const justDroppedRef = useRef(false);
  const dropTimerRef = useRef<NodeJS.Timeout | null>(null);
  const isDraggingRef = useRef(false);

  useEffect(() => {
    let isMounted = true;
    async function loadTasks() {
      setIsLoading(true);
      try {
        const res = await getVulnerabilities();
        if (res.success && res.data && res.data.length > 0 && isMounted) {
          const mapped = (res.data as BackendVulnerability[]).map(mapBackendToKanban);
          setTasks(mapped);
        }
      } catch (err) {
        console.warn("Usando dados de demonstração devido a erro:", err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }
    loadTasks();
    return () => {
      isMounted = false;
    };
  }, []);

  const selectedTask = tasks.find((t) => t.id === selectedTaskId) || null;
  const currentDraggedTask = tasks.find((t) => t.id === draggedTaskId) || null;

  const handleCardClick = (task: KanbanTask) => {
    if (justDroppedRef.current) return;
    setSelectedTaskId(task.id);
  };

  const handleCloseModal = () => {
    setSelectedTaskId(null);
  };

  const moveTaskStatus = (
    taskId: string,
    newStatus: TaskStatus,
    targetTaskId?: string,
    viaDrag = false
  ) => {
    const now = new Date();
    const formattedDate = `${now.toLocaleDateString("pt-BR")} ${now.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit"
    })}`;

    const numId = Number(taskId);
    if (!isNaN(numId) && numId > 0) {
      updateVulnerabilityStatus(numId, statusToStatusEnum(newStatus)).catch(console.error);
    }

    setTasks((prevTasks) => {
      const taskIndex = prevTasks.findIndex((t) => t.id === taskId);
      if (taskIndex === -1) return prevTasks;

      const current = prevTasks[taskIndex];
      const isStatusChanged = current.status !== newStatus;

      const updatedTask: KanbanTask = isStatusChanged
        ? {
            ...current,
            status: newStatus,
            statusLabel: statusLabels[newStatus],
            history: [
              {
                id: `hist-${Date.now()}`,
                timestamp: formattedDate,
                author: "Analista SecOps",
                authorInitials: "AS",
                action: viaDrag
                  ? `Card arrastado no quadro de '${current.statusLabel}' para '${statusLabels[newStatus]}'.`
                  : `Status alterado de '${current.statusLabel}' para '${statusLabels[newStatus]}'.`
              },
              ...current.history
            ]
          }
        : current;

      const listWithoutDragged = prevTasks.filter((t) => t.id !== taskId);

      if (targetTaskId && targetTaskId !== taskId) {
        const targetIndex = listWithoutDragged.findIndex((t) => t.id === targetTaskId);
        if (targetIndex !== -1) {
          const newList = [...listWithoutDragged];
          newList.splice(targetIndex, 0, updatedTask);
          return newList;
        }
      }

      return [...listWithoutDragged, updatedTask];
    });
  };

  const handleStatusChange = (taskId: string, newStatus: TaskStatus) => {
    moveTaskStatus(taskId, newStatus, undefined, false);
  };

  const handleAddComment = (taskId: string, commentText: string) => {
    const now = new Date();
    const formattedDate = `${now.toLocaleDateString("pt-BR")} ${now.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit"
    })}`;

    const numId = Number(taskId);
    if (!isNaN(numId) && numId > 0) {
      addVulnerabilityHistory(numId, { action: "Comentário adicionado", comment: commentText }).catch(console.error);
    }

    setTasks((prevTasks) =>
      prevTasks.map((t) => {
        if (t.id === taskId) {
          const newHistoryItem = {
            id: `hist-${Date.now()}`,
            timestamp: formattedDate,
            author: "Analista SecOps",
            authorInitials: "AS",
            action: "Adicionou um comentário",
            comment: commentText
          };

          return {
            ...t,
            history: [newHistoryItem, ...t.history]
          };
        }
        return t;
      })
    );
  };

  const handleDragStart = (e: React.DragEvent, cardId: string) => {
    isDraggingRef.current = true;
    setDraggedTaskId(cardId);
    e.dataTransfer.setData("text/plain", cardId);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragEnd = () => {
    setDraggedTaskId(null);
    setDragOverColumnId(null);
    setDragOverCardId(null);
    setTimeout(() => {
      isDraggingRef.current = false;
    }, 100);
  };

  const handleDragOverColumn = (e: React.DragEvent, columnId: TaskStatus) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    if (dragOverColumnId !== columnId) {
      setDragOverColumnId(columnId);
    }
  };

  const handleDragLeaveColumn = (e: React.DragEvent, columnId: TaskStatus) => {
    const relatedTarget = e.relatedTarget as HTMLElement | null;
    const currentTarget = e.currentTarget as HTMLElement;
    if (!currentTarget.contains(relatedTarget)) {
      if (dragOverColumnId === columnId) {
        setDragOverColumnId(null);
      }
    }
  };

  const handleDropColumn = (e: React.DragEvent, columnId: TaskStatus) => {
    e.preventDefault();
    const cardId = e.dataTransfer.getData("text/plain") || draggedTaskId;
    if (cardId) {
      moveTaskStatus(cardId, columnId, undefined, true);
    }
    setDraggedTaskId(null);
    setDragOverColumnId(null);
    setDragOverCardId(null);
  };

  const handleDragOverCard = (e: React.DragEvent, targetCardId: string) => {
    e.preventDefault();
    e.stopPropagation();
    e.dataTransfer.dropEffect = "move";
    if (dragOverCardId !== targetCardId) {
      setDragOverCardId(targetCardId);
    }
  };

  const handleDragLeaveCard = (e: React.DragEvent, targetCardId: string) => {
    e.stopPropagation();
    if (dragOverCardId === targetCardId) {
      setDragOverCardId(null);
    }
  };

  const handleDropOnCard = (
    e: React.DragEvent,
    columnId: TaskStatus,
    targetCardId: string
  ) => {
    e.preventDefault();
    e.stopPropagation();
    const cardId = e.dataTransfer.getData("text/plain") || draggedTaskId;
    if (cardId) {
      moveTaskStatus(cardId, columnId, targetCardId, true);
    }
    setDraggedTaskId(null);
    setDragOverColumnId(null);
    setDragOverCardId(null);
  };

  const filteredTasks = tasks.filter((task) => {
    if (!searchTerm.trim()) return true;
    const term = searchTerm.toLowerCase();
    return (
      task.id.toLowerCase().includes(term) ||
      task.title.toLowerCase().includes(term) ||
      task.cve.toLowerCase().includes(term) ||
      task.system.toLowerCase().includes(term) ||
      task.risk.toLowerCase().includes(term) ||
      task.assignee.name.toLowerCase().includes(term)
    );
  });

  const columns = initialColumns.map((col) => ({
    ...col,
    cards: filteredTasks.filter((t) => t.status === col.id)
  }));

  return (
    <KanbanStyle theme={currentTheme}>
      <div className="header">
        <div className="header-info">
          <span className="subtitle">FLUXO DE TRATAMENTO & REMEDIAÇÃO • DRAG & DROP</span>
          <h1>Kanban de Vulnerabilidades</h1>
          <p>
            Arraste os cards entre as colunas para atualizar o status do ciclo de vida, ou clique no card para ver as informações completas.
          </p>
        </div>

        <div className="header-actions">
          <div className="search-box">
            <FiSearch />
            <input
              type="text"
              placeholder="Buscar por ID, CVE, sistema..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="total-pill">
            Total: <strong>{filteredTasks.length}</strong> itens
          </div>
        </div>
      </div>

      <div className="kanban-board">
        {columns.map((column) => {
          const isColumnHovered = dragOverColumnId === column.id && Boolean(draggedTaskId);
          const isCrossColumn =
            isColumnHovered && currentDraggedTask && currentDraggedTask.status !== column.id;

          return (
            <div
              className={`kanban-column ${isColumnHovered ? "drag-over" : ""}`}
              key={column.id}
              onDragOver={(e) => handleDragOverColumn(e, column.id)}
              onDragLeave={(e) => handleDragLeaveColumn(e, column.id)}
              onDrop={(e) => handleDropColumn(e, column.id)}
            >
              <div className="column-header">
                <div className="column-title">
                  <div className="dot" style={{ backgroundColor: column.color }} />
                  {column.title}
                </div>
                <div className="column-count">{column.cards.length}</div>
              </div>

              <div className="column-content">
                {isCrossColumn && (
                  <div className="drop-zone">
                    <FiArrowDown /> Mover para {column.title}
                  </div>
                )}

                {column.cards.length === 0 && !isCrossColumn ? (
                  <div className="empty-column">Nenhuma vulnerabilidade neste status</div>
                ) : (
                  column.cards.map((card) => {
                    const isDragging = draggedTaskId === card.id;
                    const isTargetCard = dragOverCardId === card.id && !isDragging;

                    return (
                      <div
                        className={`kanban-card ${isDragging ? "is-dragging" : ""} ${
                          isTargetCard ? "drag-over-card" : ""
                        }`}
                        key={card.id}
                        draggable={true}
                        onDragStart={(e) => handleDragStart(e, card.id)}
                        onDragEnd={handleDragEnd}
                        onDragOver={(e) => handleDragOverCard(e, card.id)}
                        onDragLeave={(e) => handleDragLeaveCard(e, card.id)}
                        onDrop={(e) => handleDropOnCard(e, column.id, card.id)}
                        onClick={() => handleCardClick(card)}
                        title="Arraste para mover de coluna ou clique para ver detalhes completos"
                      >
                        <div className="card-top">
                          <div className="card-id-group">
                            <span className="card-id">{card.id}</span>
                            {card.cve && <span className="card-cve">{card.cve}</span>}
                          </div>
                          <span className={`badge-risk ${card.risk.toLowerCase()}`}>
                            {card.risk}
                          </span>
                        </div>

                        <div className="card-body">
                          <div className="card-title">{card.title}</div>
                          <div className="card-system">
                            <FiServer size={11} />
                            {card.system}
                          </div>
                        </div>

                        {card.tags && card.tags.length > 0 && (
                          <div className="card-tags">
                            {card.tags.slice(0, 3).map((tag) => (
                              <span className="card-tag" key={tag}>
                                #{tag}
                              </span>
                            ))}
                          </div>
                        )}

                        <div className="card-footer">
                          <div className="assignee">
                            <div className="avatar-sm">{card.assignee.initials}</div>
                            <span className="name">{card.assignee.name}</span>
                          </div>
                          <div className="cvss">
                            <span>CVSS</span>
                            {card.cvss.toFixed(1)}
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          );
        })}
      </div>

      <TaskModal
        task={selectedTask}
        isOpen={Boolean(selectedTask)}
        onClose={handleCloseModal}
        onStatusChange={handleStatusChange}
        onAddComment={handleAddComment}
      />
    </KanbanStyle>
  );
}
