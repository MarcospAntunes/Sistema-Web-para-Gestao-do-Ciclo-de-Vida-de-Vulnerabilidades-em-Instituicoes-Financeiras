"use client";

import React, { useState, useEffect } from "react";
import { useTheme } from "@/hooks";
import { resolveTheme } from "@/themes";
import { KanbanTask, TaskStatus } from "../types";
import {
  ModalOverlay,
  ModalContainer,
  ModalHeader,
  MetricsStrip,
  TabsNav,
  ModalBody,
  ModalFooter
} from "./TaskModal.style";
import {
  FiX,
  FiShield,
  FiCopy,
  FiCheck,
  FiClock,
  FiUser,
  FiServer,
  FiCheckCircle,
  FiAlertTriangle,
  FiActivity,
  FiFileText,
  FiCpu,
  FiSend,
  FiTag,
  FiLayers
} from "react-icons/fi";

interface TaskModalProps {
  task: KanbanTask | null;
  isOpen: boolean;
  onClose: () => void;
  onStatusChange: (taskId: string, newStatus: TaskStatus) => void;
  onAddComment: (taskId: string, commentText: string) => void;
}

const statusOptions: { id: TaskStatus; label: string }[] = [
  { id: "backlog", label: "Backlog" },
  { id: "analysis", label: "Em análise" },
  { id: "execution", label: "Em execução" },
  { id: "validation", label: "Validação" },
  { id: "resolved", label: "Resolvido" }
];

export default function TaskModal({
  task,
  isOpen,
  onClose,
  onStatusChange,
  onAddComment
}: TaskModalProps) {
  const { theme } = useTheme();
  const currentTheme = resolveTheme(theme);

  const [activeTab, setActiveTab] = useState<"geral" | "cvss" | "compliance" | "timeline">("geral");
  const [copiedCve, setCopiedCve] = useState(false);
  const [copiedId, setCopiedId] = useState(false);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen || !task) return null;

  const handleCopy = (text: string, type: "id" | "cve") => {
    navigator.clipboard.writeText(text);
    if (type === "id") {
      setCopiedId(true);
      setTimeout(() => setCopiedId(false), 2000);
    } else {
      setCopiedCve(true);
      setTimeout(() => setCopiedCve(false), 2000);
    }
  };

  const handleSendComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    onAddComment(task.id, newComment.trim());
    setNewComment("");
  };

  const getCvssClass = (score: number) => {
    if (score >= 9.0) return "critical";
    if (score >= 7.0) return "high";
    if (score >= 4.0) return "medium";
    return "low";
  };

  return (
    <ModalOverlay
      theme={currentTheme}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <ModalContainer theme={currentTheme}>
        <ModalHeader theme={currentTheme}>
          <div className="top-meta">
            <div className="meta-left">
              <span
                className="badge-id"
                title="Clique para copiar o ID"
                onClick={() => handleCopy(task.id, "id")}
                style={{ cursor: "pointer" }}
              >
                <FiShield />
                {task.id}
                {copiedId ? <FiCheck size={12} /> : <FiCopy size={11} />}
              </span>

              {task.cve && (
                <span
                  className="badge-cve"
                  title="Clique para copiar a CVE"
                  onClick={() => handleCopy(task.cve, "cve")}
                >
                  {task.cve}
                  {copiedCve ? <FiCheck size={12} /> : <FiCopy size={11} />}
                </span>
              )}

              <span className={`badge-risk ${task.risk.toLowerCase()}`}>
                <FiAlertTriangle size={11} />
                {task.risk}
              </span>

              <span
                className={`badge-sla ${
                  task.slaStatus === "Vencendo hoje" ? "vencendo" : "normal"
                }`}
              >
                <FiClock size={11} />
                {task.slaRemainingText}
              </span>
            </div>

            <button
              className="close-btn"
              onClick={onClose}
              title="Fechar (Esc)"
              aria-label="Fechar modal"
            >
              <FiX />
            </button>
          </div>

          <div className="title-row">
            <h2>{task.title}</h2>
          </div>

          <div className="subtitle-meta">
            <span>
              <FiServer />
              Sistema: <strong>{task.system}</strong>
            </span>
            <span>•</span>
            <span>
              Ambiente: <strong>{task.environment}</strong>
            </span>
            <span>•</span>
            <span>
              Descoberta: <strong>{task.discoveredAt}</strong>
            </span>
          </div>
        </ModalHeader>

        <MetricsStrip theme={currentTheme}>
          <div className="metric-card">
            <div className="label">
              <FiCpu size={12} /> Pontuação CVSS
            </div>
            <div className={`cvss-score ${getCvssClass(task.cvss)}`}>
              {task.cvss.toFixed(1)}
              <span className="scale">/ 10.0 ({task.cvssVersion})</span>
            </div>
          </div>

          <div className="metric-card">
            <div className="label">
              <FiUser size={12} /> Responsável
            </div>
            <div className="value">
              {task.assignee.name}
              <span className="sub">({task.assignee.initials})</span>
            </div>
          </div>

          <div className="metric-card">
            <div className="label">
              <FiClock size={12} /> Prazo de SLA
            </div>
            <div className="value">
              {task.dueDate}
            </div>
          </div>

          <div className="metric-card">
            <div className="label">
              <FiLayers size={12} /> Status do Fluxo
            </div>
            <div className="value">
              {task.statusLabel}
            </div>
          </div>
        </MetricsStrip>

        <TabsNav theme={currentTheme}>
          <button
            className={`tab-btn ${activeTab === "geral" ? "active" : ""}`}
            onClick={() => setActiveTab("geral")}
          >
            <FiFileText size={14} />
            Visão Técnica & Remediação
          </button>
          <button
            className={`tab-btn ${activeTab === "cvss" ? "active" : ""}`}
            onClick={() => setActiveTab("cvss")}
          >
            <FiCpu size={14} />
            Vetor CVSS & Métricas
          </button>
          <button
            className={`tab-btn ${activeTab === "compliance" ? "active" : ""}`}
            onClick={() => setActiveTab("compliance")}
          >
            <FiAlertTriangle size={14} />
            Impacto & Conformidade
          </button>
          <button
            className={`tab-btn ${activeTab === "timeline" ? "active" : ""}`}
            onClick={() => setActiveTab("timeline")}
          >
            <FiActivity size={14} />
            Histórico & Auditoria
            <span className="count-badge">{task.history.length}</span>
          </button>
        </TabsNav>

        <ModalBody theme={currentTheme}>
          {activeTab === "geral" && (
            <>
              <div className="content-section">
                <div className="section-title">
                  <FiFileText /> Descrição Detalhada da Vulnerabilidade
                </div>
                <div className="section-box highlight">
                  {task.description}
                </div>
              </div>

              <div className="content-section">
                <div className="section-title">
                  <FiCheckCircle /> Plano de Remediação & Mitigação Recomendada
                </div>
                <div className="section-box success">
                  <pre>{task.remediationPlan}</pre>
                </div>
              </div>

              <div className="grid-two-col">
                <div className="content-section">
                  <div className="section-title">
                    <FiUser /> Informações de Atribuição
                  </div>
                  <div className="section-box">
                    <p style={{ margin: "0 0 6px 0" }}>
                      <strong>Responsável:</strong> {task.assignee.name} ({task.assignee.email})
                    </p>
                    <p style={{ margin: "0 0 6px 0" }}>
                      <strong>Função:</strong> {task.assignee.role}
                    </p>
                    <p style={{ margin: "0" }}>
                      <strong>Relatado por:</strong> {task.reportedBy.name} ({task.reportedBy.type})
                    </p>
                  </div>
                </div>

                <div className="content-section">
                  <div className="section-title">
                    <FiTag /> Tags & Classificações
                  </div>
                  <div className="tags-list">
                    {task.tags.map((tag) => (
                      <span className="tag-item" key={tag}>
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}

          {activeTab === "cvss" && (
            <>
              <div className="content-section">
                <div className="section-title">
                  <FiCpu /> Vetor CVSS v3.1
                </div>
                <div className="cvss-vector-box">
                  <span className="vector-label">Vetor Base Completo</span>
                  <div className="vector-string">{task.cvssVector}</div>
                </div>
              </div>

              {task.cvssMetrics && (
                <div className="content-section">
                  <div className="section-title">
                    <FiLayers /> Detalhamento das Métricas do CVSS
                  </div>
                  <div className="cvss-metrics-grid">
                    <div className="metric-pill">
                      <span className="label">Vetor de Ataque (AV)</span>
                      <span className="val">{task.cvssMetrics.attackVector}</span>
                    </div>
                    <div className="metric-pill">
                      <span className="label">Complexidade (AC)</span>
                      <span className="val">{task.cvssMetrics.attackComplexity}</span>
                    </div>
                    <div className="metric-pill">
                      <span className="label">Privilégios Necessários (PR)</span>
                      <span className="val">{task.cvssMetrics.privilegesRequired}</span>
                    </div>
                    <div className="metric-pill">
                      <span className="label">Interação do Usuário (UI)</span>
                      <span className="val">{task.cvssMetrics.userInteraction}</span>
                    </div>
                    <div className="metric-pill">
                      <span className="label">Escopo (S)</span>
                      <span className="val">{task.cvssMetrics.scope}</span>
                    </div>
                    <div className="metric-pill">
                      <span className="label">Confidencialidade (C)</span>
                      <span className="val">{task.cvssMetrics.confidentiality}</span>
                    </div>
                    <div className="metric-pill">
                      <span className="label">Integridade (I)</span>
                      <span className="val">{task.cvssMetrics.integrity}</span>
                    </div>
                    <div className="metric-pill">
                      <span className="label">Disponibilidade (A)</span>
                      <span className="val">{task.cvssMetrics.availability}</span>
                    </div>
                  </div>
                </div>
              )}

              <div className="content-section">
                <div className="section-title">
                  <FiAlertTriangle /> Análise de Severidade & Pontuação
                </div>
                <div className="section-box">
                  Esta vulnerabilidade apresenta nível de gravidade <strong>{task.risk}</strong> com
                  score base <strong>{task.cvss.toFixed(1)}</strong>. Na matriz de riscos da
                  instituição financeira, vulnerabilidades nesta faixa requerem contenção prioritária
                  conforme a política institucional de resposta a incidentes cibernéticos.
                </div>
              </div>
            </>
          )}

          {activeTab === "compliance" && (
            <>
              <div className="content-section">
                <div className="section-title">
                  <FiAlertTriangle /> Impacto no Negócio & Risco Financeiro
                </div>
                <div className="section-box danger">
                  {task.businessImpact}
                </div>
              </div>

              <div className="content-section">
                <div className="section-title">
                  <FiCheckCircle /> Normas Regulatórias & Conformidades Afetadas
                </div>
                <div className="compliance-list">
                  {task.complianceNorms.map((norm, idx) => (
                    <div className="compliance-item" key={idx}>
                      <FiShield size={16} />
                      <span>{norm}</span>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {activeTab === "timeline" && (
            <>
              <div className="content-section">
                <div className="section-title">
                  <FiActivity /> Linha do Tempo e Trilha de Auditoria
                </div>
                <div className="timeline-container">
                  {task.history.map((event) => (
                    <div className="timeline-item" key={event.id}>
                      <div className="timeline-dot" />
                      <div className="timeline-header">
                        <span className="author">{event.author}</span>
                        <span className="time">{event.timestamp}</span>
                      </div>
                      <div className="timeline-action">{event.action}</div>
                      {event.comment && (
                        <div className="timeline-comment">{event.comment}</div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="comment-input-area">
                <div style={{ fontSize: "12px", fontWeight: 700, color: currentTheme.foreground }}>
                  Registrar Nota de Acompanhamento
                </div>
                <textarea
                  placeholder="Descreva o andamento técnico, testes executados ou justificativa de mudança de status..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                />
                <div className="comment-actions">
                  <button
                    type="button"
                    disabled={!newComment.trim()}
                    onClick={handleSendComment}
                  >
                    <FiSend size={12} />
                    Adicionar Nota
                  </button>
                </div>
              </div>
            </>
          )}
        </ModalBody>

        <ModalFooter theme={currentTheme}>
          <div className="footer-status-select">
            <span>Mover no Kanban:</span>
            <div className="status-buttons">
              {statusOptions.map((opt) => (
                <button
                  key={opt.id}
                  className={task.status === opt.id ? "active" : ""}
                  onClick={() => onStatusChange(task.id, opt.id)}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          <div className="footer-actions">
            <button className="btn-close" onClick={onClose}>
              Fechar
            </button>
          </div>
        </ModalFooter>
      </ModalContainer>
    </ModalOverlay>
  );
}
