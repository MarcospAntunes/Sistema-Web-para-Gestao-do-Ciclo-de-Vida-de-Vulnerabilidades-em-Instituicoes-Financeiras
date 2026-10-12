import { KanbanTask, KanbanColumn } from "./types";

export const initialTasks: KanbanTask[] = [
  {
    id: "VUL-2481",
    cve: "CVE-2023-50164",
    title: "Execução remota de código no Apache Struts",
    description:
      "Falha crítica de upload de arquivos que permite a manipulação de parâmetros nos cabeçalhos HTTP, viabilizando escalonamento de privilégios de upload e execução remota arbitrária de código (RCE) no servidor da API de Pagamentos com privilégios de execução elevados.",
    businessImpact:
      "Comprometimento total do nó de processamento de pagamentos instantâneos (PIX e TED). Potencial desvio de transações financeiras, exfiltração de chaves criptográficas de assinatura bancária e severa violação da Resolução CMN 4.893 e PCI-DSS v4.0.",
    remediationPlan:
      "1. Atualizar imediatamente o framework Apache Struts para as versões 2.5.33 ou 6.3.0.2.\n2. Aplicar regra de bloqueio emergencial no WAF (Web Application Firewall) para interceptar payloads com sequências de path traversal em multipart/form-data.\n3. Isolar preventivamente o nó de balanceamento api-pagamentos-01-inst2.\n4. Realizar varredura retrospectiva nos logs de acesso para detecção de indicadores de comprometimento (IoC).",
    system: "api-pagamentos-01",
    environment: "Produção • PCI-DSS • Core Bancário",
    risk: "Crítica",
    cvss: 9.8,
    cvssVersion: "CVSS v3.1",
    cvssVector: "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H",
    cvssMetrics: {
      attackVector: "Rede (Remoto)",
      attackComplexity: "Baixa",
      privilegesRequired: "Nenhum",
      userInteraction: "Nenhuma",
      scope: "Inalterado",
      confidentiality: "Alta",
      integrity: "Alta",
      availability: "Alta"
    },
    priority: "Urgente",
    status: "execution",
    statusLabel: "Em execução",
    assignee: {
      name: "Ana C.",
      initials: "AC",
      email: "ana.costa@bancosec.com.br",
      role: "Especialista em DevSecOps"
    },
    reportedBy: {
      name: "Qualys DAST Scanner",
      type: "Varredura Automática Semanal de Perímetro"
    },
    discoveredAt: "28/08/2026 às 14:10",
    dueDate: "29/08/2026 às 18:00",
    slaStatus: "Vencendo hoje",
    slaRemainingText: "Restam 4 horas (SLA Crítico: 24h)",
    tags: ["PCI-DSS", "BACEN 4.893", "RCE", "OWASP A03:2021", "Alta Prioridade"],
    complianceNorms: [
      "Resolução CMN nº 4.893/2020 (Art. 3º - Resposta a Incidentes)",
      "PCI-DSS v4.0 (Requisito 6.3.3 - Correção de Vulnerabilidades Críticas)",
      "LGPD (Lei 13.709/2018 - Medidas Técnicas de Segurança)"
    ],
    history: [
      {
        id: "hist-1",
        timestamp: "28/08/2026 14:10",
        author: "Qualys Scanner",
        authorInitials: "QS",
        action: "Vulnerabilidade descoberta e categorizada como CVSS 9.8 (Crítica)."
      },
      {
        id: "hist-2",
        timestamp: "28/08/2026 14:45",
        author: "Rafael M.",
        authorInitials: "RM",
        action: "Triagem concluída. Risco de impacto validado na esteira PIX.",
        comment: "Vulnerabilidade validada em ambiente espelho. Atribuída para Ana C. com SLA de emergência."
      },
      {
        id: "hist-3",
        timestamp: "28/08/2026 15:30",
        author: "Ana C.",
        authorInitials: "AC",
        action: "Status alterado para 'Em execução'.",
        comment: "Regra WAF provisória aplicada no Cloudflare. Build de atualização do Struts 6.3.0.2 em andamento no pipeline."
      }
    ]
  },
  {
    id: "VUL-2479",
    cve: "CVE-2024-28190",
    title: "Injeção SQL no endpoint de transações",
    description:
      "Parâmetro 'account_filter' no endpoint POST /v1/transactions/statement não realiza sanitização de entrada nem utiliza consultas parametrizadas na rotina de busca de extratos consolidados, possibilitando extração não autorizada de dados da tabela de contas correntes e saldos.",
    businessImpact:
      "Risco iminente de quebra de sigilo bancário (Lei Complementar nº 105/2001) e exfiltração em massa de dados financeiros de clientes. Possibilidade de bypass de autenticação e alteração indevida de saldos contábeis se o usuário do banco possuir privilégios de escrita.",
    remediationPlan:
      "1. Substituir a concatenação dinâmica de query pelo uso estrito de PreparedStatement no DAO de transações.\n2. Implementar validação sintática estrita com regex alfanumérico no payload de entrada via DTO.\n3. Habilitar inspeção de assinaturas SQLi no Web Application Firewall.\n4. Realizar re-teste com ferramenta de análise dinâmica (DAST).",
    system: "gateway-transacoes",
    environment: "Produção • DMZ Interna • Base Oracle",
    risk: "Crítica",
    cvss: 9.1,
    cvssVersion: "CVSS v3.1",
    cvssVector: "CVSS:3.1/AV:N/AC:L/PR:L/UI:N/S:U/C:H/I:H/A:H",
    cvssMetrics: {
      attackVector: "Rede (Remoto)",
      attackComplexity: "Baixa",
      privilegesRequired: "Baixo (Usuário Autenticado)",
      userInteraction: "Nenhuma",
      scope: "Inalterado",
      confidentiality: "Alta",
      integrity: "Alta",
      availability: "Alta"
    },
    priority: "Urgente",
    status: "analysis",
    statusLabel: "Em análise",
    assignee: {
      name: "Rafael M.",
      initials: "RM",
      email: "rafael.mendes@bancosec.com.br",
      role: "Analista de Segurança Ofensiva"
    },
    reportedBy: {
      name: "Pentest Externo Red Team",
      type: "Relatório de Auditoria Periódica"
    },
    discoveredAt: "27/08/2026 às 11:20",
    dueDate: "29/08/2026 às 12:00",
    slaStatus: "No prazo",
    slaRemainingText: "Restam 18 horas (SLA Crítico: 48h)",
    tags: ["SQL Injection", "Sigilo Bancário", "PCI-DSS", "OWASP A03:2021"],
    complianceNorms: [
      "Lei Complementar nº 105/2001 (Sigilo das Operações Financeiras)",
      "Resolução CMN nº 4.893/2020",
      "PCI-DSS v4.0 (Requisito 6.2 - Codificação Segura)"
    ],
    history: [
      {
        id: "hist-21",
        timestamp: "27/08/2026 11:20",
        author: "Auditoria Externa",
        authorInitials: "AE",
        action: "Vulnerabilidade reportada em Pentest Black-box."
      },
      {
        id: "hist-22",
        timestamp: "27/08/2026 13:00",
        author: "Rafael M.",
        authorInitials: "RM",
        action: "Reprodução da falha confirmada no ambiente de staging.",
        comment: "PoC validada com payload ' OR 1=1--. Time de desenvolvimento notificado para refatoração do repositório."
      }
    ]
  },
  {
    id: "VUL-2455",
    cve: "CVE-2024-11029",
    title: "Política de senha sem complexidade mínima",
    description:
      "O formulário de redefinição e cadastro de senhas de colaboradores no portal administrativo aceita senhas simples com menos de 8 caracteres e sem exigência de múltiplos conjuntos de caracteres (letras maiúsculas, minúsculas, numerais e símbolos), contrariando a política corporativa de senhas.",
    businessImpact:
      "Aumento do risco de invasão de contas internas por ataques de força bruta, dicionário ou credential stuffing, potencializando acesso indevido à intranet da instituição financeira.",
    remediationPlan:
      "1. Atualizar as diretrizes de validação no Identity Provider (Keycloak/AD) exigindo mínimo de 14 caracteres com caracteres especiais.\n2. Bloquear senhas comuns presentes na lista de senhas vazadas do NIST SP 800-63B.\n3. Habilitar obrigatoriedade de 2FA (TOTP) para todos os logins no portal.",
    system: "portal-interno",
    environment: "Corporativo • Intranet • Acesso Restrito",
    risk: "Média",
    cvss: 6.4,
    cvssVersion: "CVSS v3.1",
    cvssVector: "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:L/I:L/A:N",
    cvssMetrics: {
      attackVector: "Rede (Remoto)",
      attackComplexity: "Baixa",
      privilegesRequired: "Nenhum",
      userInteraction: "Nenhuma",
      scope: "Inalterado",
      confidentiality: "Baixa",
      integrity: "Baixa",
      availability: "Nenhuma"
    },
    priority: "Média",
    status: "backlog",
    statusLabel: "Backlog",
    assignee: {
      name: "João P.",
      initials: "JP",
      email: "joao.pedro@bancosec.com.br",
      role: "Engenheiro de Infraestrutura & IAM"
    },
    reportedBy: {
      name: "Auditoria Interna de TI",
      type: "Revisão Anual de Controles"
    },
    discoveredAt: "25/08/2026 às 09:00",
    dueDate: "05/09/2026 às 18:00",
    slaStatus: "No prazo",
    slaRemainingText: "Restam 8 dias (SLA Média: 15 dias)",
    tags: ["IAM", "NIST SP 800-63B", "Autenticação", "Controles Internos"],
    complianceNorms: [
      "Política de Segurança da Informação (PSI - BACEN 4.893)",
      "ISO/IEC 27001 (Controle A.9.4.3 - Sistema de Gestão de Senhas)"
    ],
    history: [
      {
        id: "hist-31",
        timestamp: "25/08/2026 09:00",
        author: "Auditoria Interna",
        authorInitials: "AI",
        action: "Apontamento registrado no relatório de conformidade semestral."
      },
      {
        id: "hist-32",
        timestamp: "26/08/2026 10:15",
        author: "João P.",
        authorInitials: "JP",
        action: "Item inserido no backlog para planejamento da sprint de IAM."
      }
    ]
  },
  {
    id: "VUL-2468",
    cve: "CVE-2023-3817",
    title: "Biblioteca OpenSSL desatualizada",
    description:
      "Versão vulnerável da biblioteca OpenSSL 1.1.1t instalada nos servidores de aplicação do Core Banking, vulnerável a negação de serviço e processamento excessivo de recursos ao validar parâmetros Diffie-Hellman em chaves públicas.",
    businessImpact:
      "Risco de degradação severa ou indisponibilidade temporária de nós do Core Banking durante picos de transações se um invasor enviar parâmetros maliciosos deliberados nas conexões seguras TLS.",
    remediationPlan:
      "1. Atualizar os pacotes OpenSSL para a versão 1.1.1w ou migrar para OpenSSL 3.0.x LTS nas imagens base dos contêineres.\n2. Recompilar e reiniciar os serviços core-banking-02 em janela controlada de manutenção.\n3. Validar handshake TLS e compatibilidade com cipher suites modernas.",
    system: "core-banking-02",
    environment: "Produção • Alta Disponibilidade • Cluster Kubernetes",
    risk: "Alta",
    cvss: 7.5,
    cvssVersion: "CVSS v3.1",
    cvssVector: "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:N/A:H",
    cvssMetrics: {
      attackVector: "Rede (Remoto)",
      attackComplexity: "Baixa",
      privilegesRequired: "Nenhum",
      userInteraction: "Nenhuma",
      scope: "Inalterado",
      confidentiality: "Nenhuma",
      integrity: "Nenhuma",
      availability: "Alta"
    },
    priority: "Alta",
    status: "validation",
    statusLabel: "Validação",
    assignee: {
      name: "Carla S.",
      initials: "CS",
      email: "carla.silva@bancosec.com.br",
      role: "Especialista em Segurança de Infraestrutura"
    },
    reportedBy: {
      name: "Trivy Container Scanner",
      type: "Pipeline CI/CD GitLab"
    },
    discoveredAt: "26/08/2026 às 16:40",
    dueDate: "01/09/2026 às 12:00",
    slaStatus: "No prazo",
    slaRemainingText: "Restam 2 dias (SLA Alta: 7 dias)",
    tags: ["OpenSSL", "DoS", "Kubernetes", "Infraestrutura"],
    complianceNorms: [
      "Resolução CMN nº 4.893/2020",
      "PCI-DSS v4.0 (Requisito 2.2 - Padrões de Configuração de Sistema)"
    ],
    history: [
      {
        id: "hist-41",
        timestamp: "26/08/2026 16:40",
        author: "Trivy CI/CD",
        authorInitials: "TC",
        action: "Vulnerabilidade detectada no scan de imagem Docker."
      },
      {
        id: "hist-42",
        timestamp: "27/08/2026 14:00",
        author: "Carla S.",
        authorInitials: "CS",
        action: "Patch aplicado na imagem base dos contêineres e deploy em homologação."
      },
      {
        id: "hist-43",
        timestamp: "28/08/2026 09:30",
        author: "Carla S.",
        authorInitials: "CS",
        action: "Movido para 'Validação'. Aguardando re-scan automatizado da esteira de produção."
      }
    ]
  },
  {
    id: "VUL-2490",
    cve: "CVE-2024-34001",
    title: "Ausência de cabeçalho Content-Security-Policy (CSP)",
    description:
      "A aplicação de Internet Banking Web não envia as diretivas HTTP de Content-Security-Policy (CSP), permitindo que navegadores executem scripts de origens não autorizadas caso ocorra qualquer injeção no front-end.",
    businessImpact:
      "Aumento do vetor de ataque para roubo de sessão bancária (session hijacking) e formulários fraudulentos (phishing in-app) caso scripts externos sejam injetados via dependências terceiras.",
    remediationPlan:
      "Configurar cabeçalho HTTP 'Content-Security-Policy' no ingress NGINX com diretivas default-src 'self', script-src com nonces criptográficos e report-uri para monitoramento de violações.",
    system: "internet-banking-web",
    environment: "Produção • Frontend Web • Cloudflare CDN",
    risk: "Média",
    cvss: 5.7,
    cvssVersion: "CVSS v3.1",
    cvssVector: "CVSS:3.1/AV:N/AC:H/PR:N/UI:R/S:U/C:L/I:L/A:N",
    priority: "Média",
    status: "backlog",
    statusLabel: "Backlog",
    assignee: {
      name: "João P.",
      initials: "JP",
      email: "joao.pedro@bancosec.com.br",
      role: "Engenheiro de Frontend & IAM"
    },
    reportedBy: {
      name: "DAST OWASP ZAP",
      type: "Varredura Automática Contínua"
    },
    discoveredAt: "28/08/2026 às 17:00",
    dueDate: "12/09/2026 às 18:00",
    slaStatus: "No prazo",
    slaRemainingText: "Restam 14 dias (SLA Média: 15 dias)",
    tags: ["CSP", "Headers de Segurança", "OWASP A05:2021"],
    complianceNorms: [
      "BACEN 4.893 (Mitigação de Riscos Cibernéticos em Canais Digitais)",
      "PCI-DSS v4.0 (Requisito 6.4.3 - Proteção de Scripts em Navegadores)"
    ],
    history: [
      {
        id: "hist-51",
        timestamp: "28/08/2026 17:00",
        author: "OWASP ZAP",
        authorInitials: "OZ",
        action: "Vulnerabilidade identificada na checagem de cabeçalhos de segurança."
      }
    ]
  },
  {
    id: "VUL-2462",
    cve: "CVE-2023-29409",
    title: "Criptografia fraca com TLS 1.0 e 1.1 habilitados",
    description:
      "Serviço de autenticação legado mantinha suporte a protocolos TLS 1.0 e 1.1 com algoritmos CBC desatualizados, permitindo ataques de degradação criptográfica e violação das exigências regulatórias do PCI-DSS.",
    businessImpact:
      "Não conformidade direta com PCI-DSS 4.0 e risco de multas das bandeiras de cartão de crédito. Potencial interceptação de tráfego por atacante posicionado como Man-in-the-Middle (MitM).",
    remediationPlan:
      "Desativar suporte aos protocolos TLS 1.0 e 1.1 no API Gateway. Forçar negociação exclusiva de TLS 1.2 e TLS 1.3 com Perfect Forward Secrecy (PFS).",
    system: "legacy-auth-service",
    environment: "Produção • Cluster de Autenticação Legada",
    risk: "Baixa",
    cvss: 3.7,
    cvssVersion: "CVSS v3.1",
    cvssVector: "CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:L/I:N/A:N",
    priority: "Baixa",
    status: "resolved",
    statusLabel: "Resolvido",
    assignee: {
      name: "Carla S.",
      initials: "CS",
      email: "carla.silva@bancosec.com.br",
      role: "Especialista em Segurança de Infraestrutura"
    },
    reportedBy: {
      name: "SSLLabs Scan Automático",
      type: "Monitoramento de Certificados e TLS"
    },
    discoveredAt: "15/08/2026 às 10:00",
    dueDate: "25/08/2026 às 18:00",
    slaStatus: "No prazo",
    slaRemainingText: "Resolvido e homologado",
    tags: ["TLS 1.3", "Criptografia", "PCI-DSS", "Resolvido"],
    complianceNorms: [
      "PCI-DSS v4.0 (Apêndice A2 - Criptografia Forte Obrigatória)",
      "Resolução CMN nº 4.893/2020"
    ],
    history: [
      {
        id: "hist-61",
        timestamp: "15/08/2026 10:00",
        author: "SSLLabs Monitor",
        authorInitials: "SM",
        action: "Alerta de TLS legado detectado."
      },
      {
        id: "hist-62",
        timestamp: "20/08/2026 22:00",
        author: "Carla S.",
        authorInitials: "CS",
        action: "Configuração aplicada em produção: TLS 1.2+ obrigatório.",
        comment: "Testado com todos os clientes mobile e web. Nenhum impacto adverso observado."
      },
      {
        id: "hist-63",
        timestamp: "22/08/2026 11:00",
        author: "Rafael M.",
        authorInitials: "RM",
        action: "Validação concluída com nota A+ no SSL Labs. Movido para Resolvido."
      }
    ]
  }
];

export const initialColumns: KanbanColumn[] = [
  {
    id: "backlog",
    title: "Backlog",
    color: "#9B98B0",
    cards: []
  },
  {
    id: "analysis",
    title: "Em análise",
    color: "#F3BB00",
    cards: []
  },
  {
    id: "execution",
    title: "Em execução",
    color: "#D775F4",
    cards: []
  },
  {
    id: "validation",
    title: "Validação",
    color: "#5AB7F9",
    cards: []
  },
  {
    id: "resolved",
    title: "Resolvido",
    color: "#72D577",
    cards: []
  }
];
