using Enums;

namespace Utils
{
  public static class RiskClassifier
  {

    public static severityEnum ClassifySeverity(decimal cvssScore)
    {
      if (cvssScore >= 9.0m) return severityEnum.critical;
      if (cvssScore >= 7.0m) return severityEnum.high;
      if (cvssScore >= 4.0m) return severityEnum.medium;
      if (cvssScore > 0.0m) return severityEnum.low;
      return severityEnum.none;
    }

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
