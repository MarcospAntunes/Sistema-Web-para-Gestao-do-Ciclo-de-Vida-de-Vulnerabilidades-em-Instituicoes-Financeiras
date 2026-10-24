import { KanbanTask, RiskSeverity, TaskStatus, CvssMetrics } from "./types";

export interface BackendVulnerability {
  id: number;
  title: string;
  description: string;
  cve: string;
  cveScore: number;
  cvssVersion: string;
  cvssVector?: string | null;
  status: number;
  severity: number;
  priority: number;
  createdByUserId: number;
  createdByUserName: string;
  assignedUserId: number;
  assignedUserName: string;
  discoveredAt: string;
  dueDate: string;
}

export function statusEnumToStatus(status: number): TaskStatus {
  switch (status) {
    case 0:
      return "backlog";
    case 1:
      return "analysis";
    case 2:
      return "execution";
    case 3:
      return "validation";
    case 4:
    default:
      return "resolved";
  }
}

export function statusToStatusEnum(status: TaskStatus): number {
  switch (status) {
    case "backlog":
      return 0;
    case "analysis":
      return 1;
    case "execution":
      return 2;
    case "validation":
      return 3;
    case "resolved":
      return 4;
    default:
      return 0;
  }
}

export function severityEnumToRisk(severity: number): RiskSeverity {
  switch (severity) {
    case 4:
      return "Crítica";
    case 3:
      return "Alta";
    case 2:
      return "Média";
    case 1:
    default:
      return "Baixa";
  }
}

export function priorityEnumToLabel(priority: number): "Urgente" | "Alta" | "Média" | "Baixa" {
  switch (priority) {
    case 3:
      return "Urgente";
    case 2:
      return "Alta";
    case 1:
      return "Média";
    default:
      return "Baixa";
  }
}

export function parseCvssVector(vector?: string | null): CvssMetrics | undefined {
  if (!vector || !vector.includes("/")) return undefined;

  const parts = vector.split("/");
  const map: Record<string, string> = {};
  for (const part of parts) {
    const [key, val] = part.split(":");
    if (key && val) map[key.toUpperCase()] = val.toUpperCase();
  }

  const avMap: Record<string, string> = { N: "Rede (Network)", A: "Adjacente", L: "Local", P: "Física" };
  const acMap: Record<string, string> = { L: "Baixa (Low)", H: "Alta (High)" };
  const prMap: Record<string, string> = { N: "Nenhum (None)", L: "Baixo (Low)", H: "Alto (High)" };
  const uiMap: Record<string, string> = { N: "Nenhuma (None)", R: "Requerida" };
  const sMap: Record<string, string> = { U: "Inalterado (Unchanged)", C: "Alterado (Changed)" };
  const ciaMap: Record<string, string> = { H: "Alto (High)", L: "Baixo (Low)", N: "Nenhum (None)" };

  return {
    attackVector: avMap[map["AV"]] || map["AV"] || "Rede (Network)",
    attackComplexity: acMap[map["AC"]] || map["AC"] || "Baixa (Low)",
    privilegesRequired: prMap[map["PR"]] || map["PR"] || "Nenhum (None)",
    userInteraction: uiMap[map["UI"]] || map["UI"] || "Nenhuma (None)",
    scope: sMap[map["S"]] || map["S"] || "Inalterado",
    confidentiality: ciaMap[map["C"]] || map["C"] || "Alto (High)",
    integrity: ciaMap[map["I"]] || map["I"] || "Alto (High)",
    availability: ciaMap[map["A"]] || map["A"] || "Alto (High)",
  };
}

export function calculateSla(dueDateStr: string): {
  slaStatus: "No prazo" | "Vencendo hoje" | "Atrasado";
  slaRemainingText: string;
} {
  const now = new Date();
  const due = new Date(dueDateStr);
  const diffMs = due.getTime() - now.getTime();
  const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays < 0) {
    return {
      slaStatus: "Atrasado",
      slaRemainingText: `Atrasado há ${Math.abs(diffDays)} dia${Math.abs(diffDays) === 1 ? "" : "s"}`,
    };
  } else if (diffDays === 0) {
    return {
      slaStatus: "Vencendo hoje",
      slaRemainingText: "Vence hoje",
    };
  } else {
    return {
      slaStatus: "No prazo",
      slaRemainingText: `${diffDays} dia${diffDays === 1 ? "" : "s"} restantes`,
    };
  }
}

export function mapBackendToKanban(v: BackendVulnerability): KanbanTask {
  const status = statusEnumToStatus(v.status);
  const risk = severityEnumToRisk(v.severity);
  const priority = priorityEnumToLabel(v.priority);
  const { slaStatus, slaRemainingText } = calculateSla(v.dueDate);

  const initials = (v.assignedUserName || "NA")
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return {
    id: v.id.toString(),
    cve: v.cve,
    title: v.title,
    description: v.description,
    businessImpact: `Impacto avaliado para o ambiente financeiro conforme pontuação CVSS ${v.cveScore}.`,
    remediationPlan: "Aplicar patches de segurança oficiais, atualizar dependências e validar conformidade.",
    system: "Core Banking & APIs",
    environment: "Produção",
    risk,
    cvss: v.cveScore,
    cvssVersion: v.cvssVersion || "3.1",
    cvssVector: v.cvssVector || "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H",
    cvssMetrics: parseCvssVector(v.cvssVector),
    priority,
    status,
    statusLabel: status,
    assignee: {
      name: v.assignedUserName || "Não atribuído",
      initials,
      email: `${(v.assignedUserName || "analista").toLowerCase().replace(/\s+/g, ".")}@banco.com.br`,
      role: "Analista de Segurança",
    },
    reportedBy: {
      name: v.createdByUserName || "Scanner Automático",
      type: "Scanner / Importação",
    },
    discoveredAt: new Date(v.discoveredAt).toLocaleDateString("pt-BR"),
    dueDate: new Date(v.dueDate).toLocaleDateString("pt-BR"),
    slaStatus,
    slaRemainingText,
    tags: [risk, priority, v.cve.startsWith("CVE") ? "CVE" : "Geral"],
    complianceNorms: ["Resolução CMN 4.893 (BACEN)", "LGPD", "PCI-DSS v4.0", "ISO/IEC 27001"],
    history: [],
  };
}
