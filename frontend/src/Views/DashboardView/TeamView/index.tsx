"use client";

import React, { useState, useEffect } from "react";
import { useTheme } from "@/hooks";
import { resolveTheme } from "@/themes";
import { ModalBox, ModalOverlay, TeamStyle } from "./TeamView.style";
import { getUsers } from "@/api/users";
import { register } from "@/api";
import { 
  FiUserPlus, 
  FiUsers, 
  FiActivity, 
  FiCheckCircle, 
  FiMail,
  FiX
} from "react-icons/fi";

export default function TeamView() {
  const { theme } = useTheme();
  const currentTheme = resolveTheme(theme);

  const [members, setMembers] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "User@2026!" });
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const loadUsers = async () => {
    try {
      const res = await getUsers();
      if (res.success && res.data && res.data.length > 0) {
        const mapped = res.data.map((u: any, idx: number) => {
          const initials = u.name
            .split(" ")
            .map((n: string) => n[0])
            .join("")
            .slice(0, 2)
            .toUpperCase();

          const specialties = ["AppSec", "Infraestrutura", "Cloud / Containers", "Compliance & BACEN"];
          const slaValues = [96, 92, 88, 85, 94];

          return {
            id: u.id,
            name: u.name,
            role: u.roleName || (u.roleId === 1 ? "Administrador SecOps" : "Analista de Vulnerabilidades"),
            email: u.email,
            initials,
            status: "ATIVA",
            specialty: specialties[idx % specialties.length],
            open: 8 + (idx * 3),
            resolved: 35 + (idx * 7),
            sla: slaValues[idx % slaValues.length]
          };
        });
        setMembers(mapped);
      } else {
        setMembers([
          {
            id: 1,
            name: "Administrador SecOps",
            role: "Administrador / CISO",
            email: "admin@vulntracker.com",
            initials: "AD",
            status: "ATIVA",
            specialty: "Gestão de Riscos & BACEN",
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
          }
        ]);
      }
    } catch (e) {
      console.warn("Erro ao buscar usuários:", e);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    const res = await register(form.name, form.email, form.password);
    setLoading(false);

    if (res.success) {
      setIsModalOpen(false);
      setForm({ name: "", email: "", password: "User@2026!" });
      loadUsers();
    } else {
      setErrorMsg(res.error || "Erro ao criar usuário.");
    }
  };

  const getSlaColor = (sla: number) => {
    if (sla >= 90) return currentTheme.success;
    if (sla >= 80) return currentTheme.warning;
    return currentTheme.critical;
  };

  const avgSla = members.length > 0 
    ? Math.round(members.reduce((acc, m) => acc + m.sla, 0) / members.length) 
    : 92;

  const totalOpen = members.reduce((acc, m) => acc + m.open, 0);

  return (
    <TeamStyle theme={currentTheme}>
      <div className="header">
        <div className="title-area">
          <span className="subtitle">RESPONSÁVEIS PELO TRATAMENTO</span>
          <h1>Equipe</h1>
          <p>Analistas, especialidades e distribuição da carga de trabalho.</p>
        </div>
        <button onClick={() => setIsModalOpen(true)}>
          <FiUserPlus />
          Convidar analista
        </button>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-content">
            <span className="stat-title">Analistas ativos</span>
            <span className="stat-value">{members.length}</span>
          </div>
          <div className="icon-container" style={{ backgroundColor: currentTheme["primary-soft"], color: currentTheme.primary }}>
            <FiUsers />
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-content">
            <span className="stat-title">Itens atribuídos</span>
            <span className="stat-value">{totalOpen}</span>
          </div>
          <div className="icon-container" style={{ backgroundColor: currentTheme["warning-soft"], color: currentTheme["warning-strong"] }}>
            <FiActivity />
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-content">
            <span className="stat-title">SLA médio da equipe</span>
            <span className="stat-value">{avgSla}%</span>
          </div>
          <div className="icon-container" style={{ backgroundColor: currentTheme["success-soft"], color: currentTheme.success }}>
            <FiCheckCircle />
          </div>
        </div>
      </div>

      <div className="team-grid">
        {members.map((member) => (
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

      {isModalOpen && (
        <ModalOverlay onClick={() => setIsModalOpen(false)}>
          <ModalBox onClick={(e) => e.stopPropagation()}>
            <div className="modal-head">
              <h3>Cadastrar Novo Analista</h3>
              <button onClick={() => setIsModalOpen(false)}><FiX /></button>
            </div>
            <form onSubmit={handleCreateUser}>
              <label>
                Nome Completo:
                <input 
                  type="text" 
                  required 
                  placeholder="Ex: Carlos Eduardo Silva" 
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </label>

              <label>
                E-mail Corporativo:
                <input 
                  type="email" 
                  required 
                  placeholder="Ex: carlos.silva@vulntracker.com" 
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </label>

              <label>
                Senha Temporária:
                <input 
                  type="password" 
                  required 
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                />
              </label>

              {errorMsg && (
                <div style={{ color: "#ef4444", fontSize: "0.85rem" }}>
                  {errorMsg}
                </div>
              )}

              <div className="modal-actions">
                <button type="button" className="btn-cancel" onClick={() => setIsModalOpen(false)}>
                  Cancelar
                </button>
                <button type="submit" className="btn-submit" disabled={loading}>
                  {loading ? "Cadastrando..." : "Cadastrar Analista"}
                </button>
              </div>
            </form>
          </ModalBox>
        </ModalOverlay>
      )}
    </TeamStyle>
  );
}
