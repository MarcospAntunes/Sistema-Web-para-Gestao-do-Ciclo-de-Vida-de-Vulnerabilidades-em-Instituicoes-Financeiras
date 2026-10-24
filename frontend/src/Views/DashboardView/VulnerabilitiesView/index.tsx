"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useTheme } from "@/hooks";
import { resolveTheme } from "@/themes";
import { VulnerabilitiesStyle } from "./VulnerabilitiesView.style";
import NewVulnerabilityModal from "./NewVulnerabilityModal";
import ImportCsvModal from "../OverviewView/ImportCsvModal";
import { getVulnerabilities, deleteVulnerability } from "@/api/vulnerabilities";
import { 
  FiSearch, 
  FiPlus, 
  FiFileText, 
  FiTrash2, 
  FiShield, 
  FiCheckCircle, 
  FiAlertTriangle,
  FiFilter
} from "react-icons/fi";

export default function VulnerabilitiesView() {
  const { theme } = useTheme();
  const currentTheme = resolveTheme(theme);

  const [vulnerabilities, setVulnerabilities] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [severityFilter, setSeverityFilter] = useState<string>("all");

  const [isNewModalOpen, setIsNewModalOpen] = useState(false);
  const [isCsvModalOpen, setIsCsvModalOpen] = useState(false);

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const statusParam = statusFilter !== "all" ? Number(statusFilter) : undefined;
      const severityParam = severityFilter !== "all" ? Number(severityFilter) : undefined;

      const res = await getVulnerabilities({
        status: statusParam,
        severity: severityParam,
        search: searchTerm || undefined
      });

      if (res.success && res.data) {
        setVulnerabilities(res.data);
      }
    } catch (err) {
      console.warn("Erro ao carregar vulnerabilidades:", err);
    } finally {
      setLoading(false);
    }
  }, [statusFilter, severityFilter, searchTerm]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleDelete = async (id: number, cve: string) => {
    if (window.confirm(`Tem certeza que deseja excluir a vulnerabilidade ${cve}?`)) {
      const res = await deleteVulnerability(id);
      if (res.success) {
        loadData();
      } else {
        alert(res.error || "Erro ao excluir vulnerabilidade.");
      }
    }
  };

  const getRiskBadge = (severity: number) => {
    switch (severity) {
      case 4:
        return <span className="badge-risk crítica">Crítica</span>;
      case 3:
        return <span className="badge-risk alta">Alta</span>;
      case 2:
        return <span className="badge-risk média">Média</span>;
      default:
        return <span className="badge-risk baixa">Baixa</span>;
    }
  };

  const getStatusBadge = (status: number) => {
    const map: Record<number, { label: string; color: string }> = {
      0: { label: "Backlog", color: "#64748b" },
      1: { label: "Em análise", color: "#f59e0b" },
      2: { label: "Em execução", color: "#3b82f6" },
      3: { label: "Validação", color: "#8b5cf6" },
      4: { label: "Resolvido", color: "#10b981" },
    };
    const s = map[status] || map[0];
    return (
      <span className="badge-status">
        <span className="dot" style={{ backgroundColor: s.color }}></span>
        <span>{s.label}</span>
      </span>
    );
  };

  return (
    <VulnerabilitiesStyle theme={currentTheme}>
      <div className="header">
        <div className="title-area">
          <span className="tag">CATÁLOGO DE ATIVOS E AMEAÇAS</span>
          <h1>Vulnerabilidades</h1>
          <p>Listagem completa, filtros regulatórios e inventário de vulnerabilidades.</p>
        </div>

        <div className="header-actions">
          <button className="btn-secondary" onClick={() => setIsCsvModalOpen(true)}>
            <FiFileText />
            Importar CSV
          </button>
          <button className="btn-primary" onClick={() => setIsNewModalOpen(true)}>
            <FiPlus />
            Nova Vulnerabilidade
          </button>
        </div>
      </div>

      <div className="filters-bar">
        <div className="search-box">
          <FiSearch color={currentTheme["muted-foreground"]} />
          <input 
            type="text" 
            placeholder="Buscar por título, CVE ou descrição..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="select-group">
          <select 
            value={severityFilter} 
            onChange={(e) => setSeverityFilter(e.target.value)}
          >
            <option value="all">Todas as Severidades</option>
            <option value="4">Crítica (CVSS &ge; 9.0)</option>
            <option value="3">Alta (CVSS 7.0 - 8.9)</option>
            <option value="2">Média (CVSS 4.0 - 6.9)</option>
            <option value="1">Baixa (CVSS &lt; 4.0)</option>
          </select>

          <select 
            value={statusFilter} 
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">Todos os Status</option>
            <option value="0">Backlog (Nova)</option>
            <option value="1">Em análise</option>
            <option value="2">Em execução (Remediação)</option>
            <option value="3">Validação</option>
            <option value="4">Resolvido</option>
          </select>
        </div>
      </div>

      <div className="table-card">
        {loading ? (
          <div className="empty-state">Carregando vulnerabilidades...</div>
        ) : vulnerabilities.length === 0 ? (
          <div className="empty-state">
            <FiShield />
            <h3>Nenhuma vulnerabilidade encontrada</h3>
            <p>Importe um relatório de scanner em CSV ou cadastre uma vulnerabilidade manualmente.</p>
          </div>
        ) : (
          <table>
            <thead>
              <tr>
                <th>CVE / Identificador</th>
                <th>Título</th>
                <th>Severidade</th>
                <th>CVSS Score</th>
                <th>Responsável</th>
                <th>Prazo (SLA)</th>
                <th>Status</th>
                <th style={{ textAlign: "right" }}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {vulnerabilities.map((v) => {
                const initials = (v.assignedUserName || "AS")
                  .split(" ")
                  .map((n: string) => n[0])
                  .join("")
                  .slice(0, 2)
                  .toUpperCase();

                const isOverdue = new Date(v.dueDate).getTime() < Date.now() && v.status < 4;

                return (
                  <tr key={v.id}>
                    <td>
                      <strong style={{ color: currentTheme.primary }}>{v.cve}</strong>
                    </td>
                    <td>
                      <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                        <span style={{ fontWeight: 600 }}>{v.title}</span>
                        <span style={{ fontSize: "12px", color: currentTheme["muted-foreground"] }}>
                          {v.cvssVector ? v.cvssVector.substring(0, 40) + "..." : "Vetor CVSS v3.1"}
                        </span>
                      </div>
                    </td>
                    <td>{getRiskBadge(v.severity)}</td>
                    <td>
                      <span style={{ fontWeight: 700, fontSize: "15px" }}>{v.cveScore}</span>
                    </td>
                    <td>
                      <div className="user-badge">
                        <div className="avatar-sm">{initials}</div>
                        <span>{v.assignedUserName || "Não atribuído"}</span>
                      </div>
                    </td>
                    <td>
                      <span style={{ color: isOverdue ? "#ef4444" : currentTheme["muted-foreground"], fontWeight: isOverdue ? 600 : 400 }}>
                        {new Date(v.dueDate).toLocaleDateString("pt-BR")}
                        {isOverdue && " (Vencido)"}
                      </span>
                    </td>
                    <td>{getStatusBadge(v.status)}</td>
                    <td style={{ textAlign: "right" }}>
                      <div className="actions-cell" style={{ justifyContent: "flex-end" }}>
                        <button 
                          className="delete" 
                          onClick={() => handleDelete(v.id, v.cve)}
                          title="Excluir Vulnerabilidade"
                        >
                          <FiTrash2 /> Excluir
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      <NewVulnerabilityModal 
        isOpen={isNewModalOpen}
        onClose={() => setIsNewModalOpen(false)}
        onCreated={loadData}
      />

      <ImportCsvModal 
        isOpen={isCsvModalOpen}
        onClose={() => setIsCsvModalOpen(false)}
        onImportSuccess={loadData}
      />
    </VulnerabilitiesStyle>
  );
}
