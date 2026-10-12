"use client";

import { useTheme } from "@/hooks";
import { resolveTheme } from "@/themes";
import { OverviewStyle } from "./OverviewView.style";
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
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";

const lineData = [
  { name: 'Mar', value: 200 },
  { name: 'Abr', value: 250 },
  { name: 'Mai', value: 230 },
  { name: 'Jun', value: 170 },
  { name: 'Jul', value: 120 },
  { name: 'Ago', value: 90 }
];

const pieData = [
  { name: 'Crítica', value: 23, color: '#FF6569' },
  { name: 'Alta', value: 48, color: '#F3BB00' },
  { name: 'Média', value: 71, color: '#5AB7F9' },
  { name: 'Baixa', value: 44, color: '#72D577' }
];

const listData = [
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
];

export default function OverviewView() {
  const { theme } = useTheme();
  const currentTheme = resolveTheme(theme);

  return (
    <OverviewStyle theme={currentTheme}>
      <div className="header">
        <div className="title-area">
          <span className="date">01 SETEMBRO 2026 • 19:01</span>
          <h1>Visão geral</h1>
          <p>Panorama do risco e do trabalho da remediação.</p>
        </div>
        <button>
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
            <span className="card-value">186</span>
            <span className="card-subtitle" style={{ color: currentTheme.primary }}>+12 esta semana</span>
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
            <span className="card-value">23</span>
            <span className="card-subtitle" style={{ color: currentTheme.critical }}>8 vencem em 48h</span>
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
            <span className="card-value">37</span>
            <span className="card-subtitle" style={{ color: currentTheme["warning-strong"] }}>72% dentro do SLA</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="card-top">
            <span className="card-title">Resolvidas no mês</span>
            <div className="icon-container" style={{ backgroundColor: currentTheme["success-soft"], color: currentTheme.success }}>
              <FiCheckCircle />
            </div>
          </div>
          <div className="card-bottom">
            <span className="card-value">64</span>
            <span className="card-subtitle" style={{ color: currentTheme.success }}>+18% vs. agosto</span>
          </div>
        </div>
      </div>

      <div className="charts-grid">
        <div className="chart-card">
          <div className="chart-header">
            <div className="chart-titles">
              <h3>Evolução do risco</h3>
              <p>Vulnerabilidades abertas nos últimos 6 meses</p>
            </div>
            <div className="chart-actions">
              6 meses <FiChevronDown />
            </div>
          </div>
          <div className="chart-content">
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={lineData} margin={{ top: 5, right: 0, left: -20, bottom: 0 }}>
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
              <p>186 vulnerabilidades abertas</p>
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
                <div style={{ fontSize: '24px', fontWeight: 'bold', color: currentTheme.foreground, lineHeight: 1 }}>186</div>
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
            <input type="text" placeholder="Buscar vulnerabilidade..." />
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
            {listData.map((item) => (
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
    </OverviewStyle>
  );
}
