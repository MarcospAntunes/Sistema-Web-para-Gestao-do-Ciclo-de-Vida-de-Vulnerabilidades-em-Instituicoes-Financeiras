"use client";

import { useTheme } from "@/hooks";
import { resolveTheme } from "@/themes";
import { TeamStyle } from "./TeamView.style";
import { 
  FiUserPlus, 
  FiUsers, 
  FiActivity, 
  FiCheckCircle,
  FiMail
} from "react-icons/fi";

const teamMembers = [
  {
    id: 1,
    name: "Ana Carolina Duarte",
    role: "Coordenadora de Segurança",
    email: "ana.duarte@vulntrack.io",
    initials: "AC",
    status: "ATIVA",
    specialty: "AppSec",
    open: 14,
    resolved: 62,
    sla: 96
  },
  {
    id: 2,
    name: "Rafael Mendes",
    role: "Analista Sênior",
    email: "rafael.mendes@vulntrack.io",
    initials: "RM",
    status: "ATIVA",
    specialty: "Infraestrutura",
    open: 21,
    resolved: 48,
    sla: 88
  },
  {
    id: 3,
    name: "Carla Souza",
    role: "Analista de Vulnerabilidades",
    email: "carla.souza@vulntrack.io",
    initials: "CS",
    status: "ATIVA",
    specialty: "Cloud / Containers",
    open: 9,
    resolved: 37,
    sla: 91
  },
  {
    id: 4,
    name: "João Pedro Lima",
    role: "Analista Júnior",
    email: "joao.lima@vulntrack.io",
    initials: "JP",
    status: "FÉRIAS",
    specialty: "Compliance",
    open: 6,
    resolved: 12,
    sla: 74
  }
];

export default function TeamView() {
  const { theme } = useTheme();
  const currentTheme = resolveTheme(theme);

  const getSlaColor = (sla: number) => {
    if (sla >= 90) return currentTheme.success;
    if (sla >= 80) return currentTheme.warning;
    return currentTheme.critical;
  };

  return (
    <TeamStyle theme={currentTheme}>
      <div className="header">
        <div className="title-area">
          <span className="subtitle">RESPONSÁVEIS PELO TRATAMENTO</span>
          <h1>Equipe</h1>
          <p>Analistas, especialidades e carga de trabalho atual.</p>
        </div>
        <button>
          <FiUserPlus />
          Convidar analista
        </button>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-content">
            <span className="stat-title">Analistas ativos</span>
            <span className="stat-value">3</span>
          </div>
          <div className="icon-container" style={{ backgroundColor: currentTheme["primary-soft"], color: currentTheme.primary }}>
            <FiUsers />
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-content">
            <span className="stat-title">Itens atribuídos</span>
            <span className="stat-value">50</span>
          </div>
          <div className="icon-container" style={{ backgroundColor: currentTheme["warning-soft"], color: currentTheme["warning-strong"] }}>
            <FiActivity />
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-content">
            <span className="stat-title">SLA médio da equipe</span>
            <span className="stat-value">87%</span>
          </div>
          <div className="icon-container" style={{ backgroundColor: currentTheme["success-soft"], color: currentTheme.success }}>
            <FiCheckCircle />
          </div>
        </div>
      </div>

      <div className="team-grid">
        {teamMembers.map((member) => (
          <div className="member-card" key={member.id}>
            <div className="member-header">
              <div className="member-info">
                <div className="avatar">{member.initials}</div>
                <div className="details">
                  <span className="name">{member.name}</span>
                  <span className="role">{member.role}</span>
                  <span className="email"><FiMail /> {member.email}</span>
                </div>
              </div>
              <span className={`status-badge ${member.status.toLowerCase().replace('é', 'e')}`}>
                {member.status}
              </span>
            </div>

            <div className="member-tags">
              <span className="specialty">{member.specialty}</span>
              <span className="workload">{member.open} em aberto</span>
              <span className="workload">{member.resolved} resolvidas</span>
            </div>

            <div className="sla-section">
              <div className="sla-header">
                <span>Cumprimento de SLA</span>
                <strong>{member.sla}%</strong>
              </div>
              <div className="sla-bar">
                <div 
                  className="sla-fill" 
                  style={{ 
                    width: `${member.sla}%`, 
                    backgroundColor: getSlaColor(member.sla) 
                  }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </TeamStyle>
  );
}
