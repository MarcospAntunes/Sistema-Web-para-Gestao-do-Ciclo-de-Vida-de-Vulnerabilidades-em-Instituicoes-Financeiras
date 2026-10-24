using Enums;

namespace Utils
{
  public static class RiskClassifier
  {
    /// <summary>
    /// Classifica a severidade de acordo com a pontuação CVSS v3.x (FIRST.org)
    /// </summary>
    public static severityEnum ClassifySeverity(decimal cvssScore)
    {
      if (cvssScore >= 9.0m) return severityEnum.critical;
      if (cvssScore >= 7.0m) return severityEnum.high;
      if (cvssScore >= 4.0m) return severityEnum.medium;
      if (cvssScore > 0.0m) return severityEnum.low;
      return severityEnum.none;
    }

    /// <summary>
    /// Define a prioridade com base na severidade e CVSS
    /// </summary>
    public static priorityEnum ClassifyPriority(severityEnum severity)
    {
      return severity switch
      {
        severityEnum.critical => priorityEnum.urgent,
        severityEnum.high => priorityEnum.high,
        severityEnum.medium => priorityEnum.medium,
        _ => priorityEnum.low
      };
    }

    /// <summary>
    /// Calcula a data limite de remediação (SLA) segundo políticas de segurança para instituições financeiras:
    /// - Crítica: 7 dias
    /// - Alta: 15 dias
    /// - Média: 30 dias
    /// - Baixa: 60 dias
    /// </summary>
    public static DateTime CalculateDueDate(DateTime discoveredAt, severityEnum severity)
    {
      int days = severity switch
      {
        severityEnum.critical => 7,
        severityEnum.high => 15,
        severityEnum.medium => 30,
        _ => 60
      };

      return discoveredAt.AddDays(days);
    }

    /// <summary>
    /// Tenta interpretar string de severidade vinda de scanners (Nessus, Qualys, OpenVAS, Trivy)
    /// </summary>
    public static severityEnum ParseSeverityString(string? value, decimal fallbackScore = 0)
    {
      if (string.IsNullOrWhiteSpace(value))
      {
        return ClassifySeverity(fallbackScore);
      }

      string normalized = value.Trim().ToLowerInvariant();
      if (normalized.Contains("crit")) return severityEnum.critical;
      if (normalized.Contains("alt") || normalized.Contains("high")) return severityEnum.high;
      if (normalized.Contains("med")) return severityEnum.medium;
      if (normalized.Contains("baix") || normalized.Contains("low")) return severityEnum.low;

      return ClassifySeverity(fallbackScore);
    }
  }
}
