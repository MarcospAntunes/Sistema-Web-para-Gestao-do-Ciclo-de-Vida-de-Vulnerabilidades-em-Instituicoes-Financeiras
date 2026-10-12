"use client";

import { useTheme } from "@/hooks";
import { resolveTheme } from "@/themes";
import { KanbanStyle } from "./KanbanView.style";

const columns = [
  {
    id: "backlog",
    title: "Backlog",
    count: 42,
    color: "#9B98B0",
    cards: [
      {
        id: "VUL-2455",
        title: "Política de senha sem complexidade mínima",
        system: "portal-interno",
        risk: "Média",
        cvss: 6.4,
        assignee: { name: "João P.", initials: "JP" }
      }
    ]
  },
  {
    id: "analysis",
    title: "Em análise",
    count: 18,
    color: "#F3BB00",
    cards: [
      {
        id: "VUL-2479",
        title: "Injeção SQL no endpoint de transações",
        system: "gateway-transacoes",
        risk: "Crítica",
        cvss: 9.1,
        assignee: { name: "Rafael M.", initials: "RM" }
      }
    ]
  },
  {
    id: "execution",
    title: "Em execução",
    count: 12,
    color: "#D775F4",
    cards: [
      {
        id: "VUL-2481",
        title: "Execução remota de código no Apache Struts",
        system: "api-pagamentos-01",
        risk: "Crítica",
        cvss: 9.8,
        assignee: { name: "Ana C.", initials: "AC" }
      }
    ]
  },
  {
    id: "validation",
    title: "Validação",
    count: 7,
    color: "#5AB7F9",
    cards: [
      {
        id: "VUL-2468",
        title: "Biblioteca OpenSSL desatualizada",
        system: "core-banking-02",
        risk: "Alta",
        cvss: 7.5,
        assignee: { name: "Carla S.", initials: "CS" }
      }
    ]
  }
];

export default function KanbanView() {
  const { theme } = useTheme();
  const currentTheme = resolveTheme(theme);

  return (
    <KanbanStyle theme={currentTheme}>
      <div className="header">
        <span className="subtitle">FLUXO DE TRATAMENTO</span>
        <h1>Kanban</h1>
        <p>Acompanhe cada vulnerabilidade até sua validação.</p>
      </div>

      <div className="kanban-board">
        {columns.map(column => (
          <div className="kanban-column" key={column.id}>
            <div className="column-header">
              <div className="column-title">
                <div className="dot" style={{ backgroundColor: column.color }}></div>
                {column.title}
              </div>
              <div className="column-count">{column.count}</div>
            </div>
            
            <div className="column-content">
              {column.cards.map(card => (
                <div className="kanban-card" key={card.id}>
                  <div className="card-top">
                    <span className="card-id">{card.id}</span>
                    <span className={`badge-risk ${card.risk.toLowerCase()}`}>
                      {card.risk}
                    </span>
                  </div>
                  <div className="card-body">
                    <div className="card-title">{card.title}</div>
                    <div className="card-system">{card.system}</div>
                  </div>
                  <div className="card-footer">
                    <div className="assignee">
                      <div className="avatar-sm">{card.assignee.initials}</div>
                      <span className="name">{card.assignee.name}</span>
                    </div>
                    <div className="cvss">
                      <span>CVSS</span>
                      {card.cvss}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </KanbanStyle>
  );
}
