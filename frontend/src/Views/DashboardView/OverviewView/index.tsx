"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useTheme } from "@/hooks";
import { resolveTheme } from "@/themes";
import { OverviewStyle } from "./OverviewView.style";
import ImportCsvModal from "./ImportCsvModal";
import { getVulnerabilityStats, getVulnerabilities } from "@/api/vulnerabilities";
import { 
  FiFileText, 
  FiShield, 
  FiAlertTriangle, 
  FiActivity, 
  FiCheckCircle,
  FiChevronDown,
  FiSearch,
  FiMoreHorizontal
} from "react-icons/fi";
import { 
  LineChart, 
  Line, 
  XAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";

const defaultLineData = [
  { name: 'Mar', value: 200 },
  { name: 'Abr', value: 250 },
  { name: 'Mai', value: 230 },
  { name: 'Jun', value: 170 },
  { name: 'Jul', value: 120 },
  { name: 'Ago', value: 90 }
];

export default function OverviewView() {
  const { theme } = useTheme();
  const currentTheme = resolveTheme(theme);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [stats, setStats] = useState({
    totalOpen: 186,
    totalCritical: 23,
    totalInProgress: 37,
    totalResolved: 64,
    bySeverity: {
      critical: 23,
      high: 48,
      medium: 71,
      low: 44
    }
  });

  const [items, setItems] = useState<any[]>([
    {
      id: "VUL-2481",
      title: "Execução remota de código no Apache Struts",
      system: "api-pagamentos-01",
      risk: "Crítica",
      cvss: 9.8,
      assignee: { name: "Ana C.", initials: "AC" },
      deadline: "Hoje",
      status: "Em execução"
    },
    {
      id: "VUL-2479",
      title: "Injeção SQL no endpoint de transações",
      system: "gateway-transacoes",
      risk: "Crítica",
      cvss: 9.1,
      assignee: { name: "Rafael M.", initials: "RM" },
      deadline: "Amanhã",
      status: "Em análise"
    },
    {
      id: "VUL-2468",
      title: "Biblioteca OpenSSL desatualizada",
      system: "core-banking-02",
      risk: "Alta",
      cvss: 7.5,
      assignee: { name: "Carla S.", initials: "CS" },
      deadline: "04 set",
      status: "Validação"
    }
  ]);

  const loadData = useCallback(async () => {
    try {
      const [statsRes, vulnsRes] = await Promise.all([
        getVulnerabilityStats(),
        getVulnerabilities()
      ]);

      if (statsRes.success && statsRes.data) {
        setStats(statsRes.data);
      }

      if (vulnsRes.success && vulnsRes.data && vulnsRes.data.length > 0) {
        const mapped = vulnsRes.data.slice(0, 10).map((v: any) => {
          const initials = (v.assignedUserName || "AS")
            .split(" ")
            .map((n: string) => n[0])
            .join("")
            .slice(0, 2)
            .toUpperCase();

          const riskMap: Record<number, string> = { 4: "Crítica", 3: "Alta", 2: "Média", 1: "Baixa", 0: "Baixa" };
          const statusMap: Record<number, string> = { 0: "Backlog", 1: "Em análise", 2: "Em execução", 3: "Validação", 4: "Resolvido" };

          return {
            id: v.cve || `VUL-${v.id}`,
            title: v.title,
            system: "Core Banking & APIs",
            risk: riskMap[v.severity] || "Média",
            cvss: v.cveScore,
            assignee: { name: v.assignedUserName || "Não atribuído", initials },
            deadline: new Date(v.dueDate).toLocaleDateString("pt-BR"),
            status: statusMap[v.status] || "Em análise"
          };
        });
        setItems(mapped);
      }
    } catch (e) {
      console.warn("Erro ao carregar dados do dashboard:", e);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const pieData = [
    { name: 'Crítica', value: stats.bySeverity?.critical ?? 23, color: '#FF6569' },
    { name: 'Alta', value: stats.bySeverity?.high ?? 48, color: '#F3BB00' },
    { name: 'Média', value: stats.bySeverity?.medium ?? 71, color: '#5AB7F9' },
    { name: 'Baixa', value: stats.bySeverity?.low ?? 44, color: '#72D577' }
  ];

  const totalSeverities = pieData.reduce((acc, curr) => acc + curr.value, 0);

  const filteredItems = items.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const todayFormatted = new Date().toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric"
  }).toUpperCase();

  return (
    <OverviewStyle theme={currentTheme}>
      <div className="header">
        <div className="title-area">
          <span className="date">{todayFormatted}</span>
          <h1>Visão geral</h1>
          <p>Panorama do risco e do trabalho da remediação em tempo real.</p>
        </div>
        <button onClick={() => setIsModalOpen(true)}>
          <FiFileText />
          Importar relatório CSV
        </button>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="card-top">
            <span className="card-title">Vulnerabilidades abertas</span>
            <div className="icon-container" style={{ backgroundColor: currentTheme["primary-soft"], color: currentTheme.primary }}>
              <FiShield />
            </div>
          </div>
          <div className="card-bottom">
            <span className="card-value">{stats.totalOpen}</span>
            <span className="card-subtitle" style={{ color: currentTheme.primary }}>Triagem em tempo real</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="card-top">
            <span className="card-title">Risco crítico</span>
            <div className="icon-container" style={{ backgroundColor: currentTheme["critical-soft"], color: currentTheme.critical }}>
              <FiAlertTriangle />
            </div>
          </div>
          <div className="card-bottom">
            <span className="card-value">{stats.totalCritical}</span>
            <span className="card-subtitle" style={{ color: currentTheme.critical }}>Prioridade máxima</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="card-top">
            <span className="card-title">Em tratamento</span>
            <div className="icon-container" style={{ backgroundColor: currentTheme["warning-soft"], color: currentTheme["warning-strong"] }}>
              <FiActivity />
            </div>
          </div>
          <div className="card-bottom">
            <span className="card-value">{stats.totalInProgress}</span>
            <span className="card-subtitle" style={{ color: currentTheme["warning-strong"] }}>Análise & Execução</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="card-top">
            <span className="card-title">Resolvidas</span>
            <div className="icon-container" style={{ backgroundColor: currentTheme["success-soft"], color: currentTheme.success }}>
              <FiCheckCircle />
            </div>
          </div>
          <div className="card-bottom">
            <span className="card-value">{stats.totalResolved}</span>
            <span className="card-subtitle" style={{ color: currentTheme.success }}>Remediações concluídas</span>
          </div>
        </div>
      </div>

      <div className="charts-grid">
        <div className="chart-card">
          <div className="chart-header">
            <div className="chart-titles">
              <h3>Evolução do risco</h3>
              <p>Histórico de vulnerabilidades tratadas</p>
            </div>
            <div className="chart-actions">
              Semestral <FiChevronDown />
            </div>
          </div>
          <div className="chart-content">
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={defaultLineData} margin={{ top: 5, right: 0, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={currentTheme.primary} stopOpacity={0.3}/>
                    <stop offset="95%" stopColor={currentTheme.primary} stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={currentTheme.border} />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: currentTheme["muted-foreground"], fontSize: 12 }} 
                  dy={10}
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: currentTheme.card, borderColor: currentTheme.border, color: currentTheme.foreground, borderRadius: '8px' }}
                  itemStyle={{ color: currentTheme.primary }}
                />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke={currentTheme.primary} 
                  strokeWidth={3} 
                  dot={false}
                  activeDot={{ r: 6, fill: currentTheme.primary, stroke: currentTheme.background, strokeWidth: 2 }}
                  fill="url(#colorValue)"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="chart-card">
          <div className="chart-header">
            <div className="chart-titles">
              <h3>Distribuição por risco</h3>
              <p>{totalSeverities} vulnerabilidades monitoradas</p>
            </div>
            <div className="chart-actions">
              <FiMoreHorizontal size={18} />
            </div>
          </div>
          <div className="chart-content" style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ width: '140px', height: '140px', position: 'relative' }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={70}
                    paddingAngle={2}
                    dataKey="value"
                    stroke="none"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
                <div style={{ fontSize: '24px', fontWeight: 'bold', color: currentTheme.foreground, lineHeight: 1 }}>{totalSeverities}</div>
                <div style={{ fontSize: '10px', color: currentTheme["muted-foreground"], fontWeight: 600 }}>TOTAL</div>
              </div>
            </div>

            <div className="donut-legend">
              {pieData.map((item, index) => (
                <div className="legend-item" key={index}>
                  <div className="legend-left">
                    <div className="dot" style={{ backgroundColor: item.color }}></div>
                    <span>{item.name}</span>
                  </div>
                  <div className="legend-value">{item.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="list-section">
        <div className="list-header">
          <div className="titles">
            <h3>Prioridade imediata</h3>
            <p>Itens que exigem atenção da equipe</p>
          </div>
          <div className="search-box">
            <FiSearch color={currentTheme["muted-foreground"]} />
            <input 
              type="text" 
              placeholder="Buscar vulnerabilidade ou CVE..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <table>
          <thead>
            <tr>
              <th>Vulnerabilidade</th>
              <th>Risco</th>
              <th>CVSS</th>
              <th>Responsável</th>
              <th>Prazo</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredItems.map((item) => (
              <tr key={item.id}>
                <td>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <span style={{ fontWeight: 600 }}>{item.title}</span>
                    <span style={{ fontSize: '12px', color: currentTheme["muted-foreground"] }}>{item.id} - {item.system}</span>
                  </div>
                </td>
                <td>
                  <span className={`badge-risk ${item.risk.toLowerCase()}`}>
                    {item.risk}
                  </span>
                </td>
                <td style={{ fontWeight: 600 }}>{item.cvss}</td>
                <td>
                  <div className="user-badge">
                    <div className="avatar-sm">{item.assignee.initials}</div>
                    <span>{item.assignee.name}</span>
                  </div>
                </td>
                <td style={{ color: currentTheme["muted-foreground"] }}>{item.deadline}</td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ 
                      width: '8px', 
                      height: '8px', 
                      borderRadius: '50%', 
                      border: `2px solid ${item.status === 'Em execução' ? currentTheme.primary : (item.status === 'Em análise' ? currentTheme["warning-strong"] : currentTheme.foreground)}` 
                    }}></div>
                    <span>{item.status}</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ImportCsvModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onImportSuccess={loadData}
      />
    </OverviewStyle>
  );
}
