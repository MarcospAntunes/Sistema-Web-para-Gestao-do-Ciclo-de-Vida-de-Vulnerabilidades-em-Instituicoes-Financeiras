"use client";

import React, { useState, useEffect } from "react";
import { useTheme } from "@/hooks";
import { resolveTheme } from "@/themes";
import { SettingsStyle } from "./SettingsView.style";
import { getLoggedUser } from "@/api/users";
import { 
  FiUser, 
  FiSliders, 
  FiClock, 
  FiCheckCircle, 
  FiMoon, 
  FiSun,
  FiInfo
} from "react-icons/fi";

export default function SettingsView() {
  const { theme, setTheme } = useTheme();
  const currentTheme = resolveTheme(theme);

  const [user, setUser] = useState<{ id: number; name: string; email: string; roleId: number } | null>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    getLoggedUser().then((res) => {
      if (res.success && res.data) {
        setUser(res.data);
      }
    });
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  return (
    <SettingsStyle theme={currentTheme}>
      <div className="header">
        <span className="tag">GESTÃO E PARÂMETROS</span>
        <h1>Configurações</h1>
        <p>Preferências da conta, regras de conformidade regulatória e parâmetros de SLA.</p>
      </div>

      <div className="settings-grid">
        <div className="settings-card">
          <div className="card-header">
            <FiUser />
            <div>
              <h3>Perfil do Operador</h3>
              <p>Informações cadastrais e nível de acesso no sistema</p>
            </div>
          </div>

          <form onSubmit={handleSave}>
            <div className="form-row">
              <div className="field">
                <label>Nome Completo</label>
                <input 
                  type="text" 
                  defaultValue={user?.name || "Administrador SecOps"} 
                  disabled 
                />
              </div>

              <div className="field">
                <label>E-mail Corporativo</label>
                <input 
                  type="email" 
                  defaultValue={user?.email || "admin@vulntracker.com"} 
                  disabled 
                />
              </div>
            </div>

            <div className="form-row" style={{ marginTop: "16px" }}>
              <div className="field">
                <label>Perfil de Acesso</label>
                <input 
                  type="text" 
                  value={user?.roleId === 1 ? "Administrador (Nível 3)" : "Analista de Segurança (Nível 2)"} 
                  disabled 
                />
              </div>

              <div className="field">
                <label>Organização</label>
                <input 
                  type="text" 
                  value="Instituição Financeira S/A" 
                  disabled 
                />
              </div>
            </div>
          </form>
        </div>

        <div className="settings-card">
          <div className="card-header">
            <FiSliders />
            <div>
              <h3>Aparência e Interface</h3>
              <p>Personalize o tema e a experiência visual do painel</p>
            </div>
          </div>

          <div style={{ display: "flex", gap: "16px" }}>
            <button
              type="button"
              onClick={() => setTheme && setTheme("dark")}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: "12px 20px",
                borderRadius: "8px",
                cursor: "pointer",
                background: theme === "dark" ? currentTheme.primary : "transparent",
                color: theme === "dark" ? currentTheme["primary-foreground"] : currentTheme.foreground,
                border: `1px solid ${theme === "dark" ? currentTheme.primary : currentTheme.border}`,
                fontWeight: 600,
                fontSize: "14px"
              }}
            >
              <FiMoon /> Tema Escuro (Dark Mode)
            </button>

            <button
              type="button"
              onClick={() => setTheme && setTheme("light")}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: "12px 20px",
                borderRadius: "8px",
                cursor: "pointer",
                background: theme === "light" ? currentTheme.primary : "transparent",
                color: theme === "light" ? currentTheme["primary-foreground"] : currentTheme.foreground,
                border: `1px solid ${theme === "light" ? currentTheme.primary : currentTheme.border}`,
                fontWeight: 600,
                fontSize: "14px"
              }}
            >
              <FiSun /> Tema Claro (Light Mode)
            </button>
          </div>
        </div>

        <div className="settings-card">
          <div className="card-header">
            <FiClock />
            <div>
              <h3>Parâmetros Regulatórios de SLA (BACEN / CMN)</h3>
              <p>Prazos máximos de tratamento baseados na Resolução CMN 4.893 e PCI-DSS</p>
            </div>
          </div>

          <table className="sla-table">
            <thead>
              <tr>
                <th>Severidade</th>
                <th>Pontuação CVSS v3.x</th>
                <th>Prazo Limite de Remediação (SLA)</th>
                <th>Impacto Regulatório</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong style={{ color: currentTheme.critical }}>Crítica</strong></td>
                <td>9.0 a 10.0</td>
                <td><strong>7 dias corridos</strong></td>
                <td>Notificação imediata ao comitê de segurança</td>
              </tr>
              <tr>
                <td><strong style={{ color: currentTheme["warning-strong"] }}>Alta</strong></td>
                <td>7.0 a 8.9</td>
                <td><strong>15 dias corridos</strong></td>
                <td>Tratamento prioritário em ambiente financeiro</td>
              </tr>
              <tr>
                <td><strong style={{ color: currentTheme.primary }}>Média</strong></td>
                <td>4.0 a 6.9</td>
                <td><strong>30 dias corridos</strong></td>
                <td>Planejamento no ciclo de sprint regular</td>
              </tr>
              <tr>
                <td><strong style={{ color: currentTheme.success }}>Baixa</strong></td>
                <td>0.1 a 3.9</td>
                <td><strong>60 dias corridos</strong></td>
                <td>Acompanhamento em janela de manutenção</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="settings-card">
          <div className="card-header">
            <FiInfo />
            <div>
              <h3>Sobre a Aplicação</h3>
              <p>Projeto de TCC — Gestão do Ciclo de Vida de Vulnerabilidades</p>
            </div>
          </div>

          <div style={{ fontSize: "14px", lineHeight: "1.6", color: currentTheme["muted-foreground"] }}>
            <p style={{ margin: "0 0 8px" }}>
              <strong>Sistema Web para Gestão do Ciclo de Vida de Vulnerabilidades em Instituições Financeiras (VulnTracker)</strong>
            </p>
            <p style={{ margin: "0 0 8px" }}>
              Desenvolvido com ASP.NET Core 9, Entity Framework Core, MySQL 8.4 e Next.js com TypeScript.
            </p>
            <p style={{ margin: 0 }}>
              Atende aos requisitos de importação e normalização de relatórios de scanners (CSV), classificação automatizada de risco CVSS v3.1, gestão visual via Kanban, rastreamento de trilha de auditoria e conformidade regulatória.
            </p>
          </div>
        </div>
      </div>
    </SettingsStyle>
  );
}
