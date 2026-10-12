export type RiskSeverity = "Crítica" | "Alta" | "Média" | "Baixa";

export type TaskStatus = "backlog" | "analysis" | "execution" | "validation" | "resolved";

export interface TaskHistoryItem {
  id: string;
  timestamp: string;
  author: string;
  authorInitials: string;
  action: string;
  comment?: string;
}

export interface TaskAssignee {
  name: string;
  initials: string;
  email: string;
  role: string;
}

export interface TaskReporter {
  name: string;
  type: string;
}

export interface CvssMetrics {
  attackVector: string;
  attackComplexity: string;
  privilegesRequired: string;
  userInteraction: string;
  scope: string;
  confidentiality: string;
  integrity: string;
  availability: string;
}

export interface KanbanTask {
  id: string;
  cve: string;
  title: string;
  description: string;
  businessImpact: string;
  remediationPlan: string;
  system: string;
  environment: string;
  risk: RiskSeverity;
  cvss: number;
  cvssVersion: string;
  cvssVector: string;
  cvssMetrics?: CvssMetrics;
  priority: "Urgente" | "Alta" | "Média" | "Baixa";
  status: TaskStatus;
  statusLabel: string;
  assignee: TaskAssignee;
  reportedBy: TaskReporter;
  discoveredAt: string;
  dueDate: string;
  slaStatus: "No prazo" | "Vencendo hoje" | "Atrasado";
  slaRemainingText: string;
  tags: string[];
  complianceNorms: string[];
  history: TaskHistoryItem[];
}

export interface KanbanColumn {
  id: TaskStatus;
  title: string;
  color: string;
  cards: KanbanTask[];
}
