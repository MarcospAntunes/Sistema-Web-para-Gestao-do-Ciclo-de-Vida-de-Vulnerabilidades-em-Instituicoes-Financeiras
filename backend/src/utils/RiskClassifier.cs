using System.Globalization;
using Enums;

namespace Utils
{
  public record RiskClassification(severityEnum Severity, priorityEnum Priority, int SlaDays, string Rationale);
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

    public static int ContextSteps(assetCriticalityEnum criticality, exposureEnum exposure)
    {
      int criticalityFactor = criticality switch
      {
        assetCriticalityEnum.low => -1,
        assetCriticalityEnum.medium => 0,
        _ => 1
      };

      int exposureFactor = exposure switch
      {
        exposureEnum.isolated => -1,
        exposureEnum.internalNetwork => 0,
        _ => 1
      };

      return Math.Clamp(criticalityFactor + exposureFactor, -1, 1);
    }

    public static priorityEnum ClassifyPriority(
      severityEnum severity,
      assetCriticalityEnum criticality = assetCriticalityEnum.medium,
      exposureEnum exposure = exposureEnum.internalNetwork)
    {

      if (severity == severityEnum.none) return priorityEnum.low;

      priorityEnum basePriority = severity switch
      {
        severityEnum.critical => priorityEnum.urgent,
        severityEnum.high => priorityEnum.high,
        severityEnum.medium => priorityEnum.medium,
        _ => priorityEnum.low
      };

      int adjusted = Math.Clamp(
        (int)basePriority + ContextSteps(criticality, exposure),
        (int)priorityEnum.low,
        (int)priorityEnum.urgent);

      return (priorityEnum)adjusted;
    }

    public static int GetSlaDays(priorityEnum priority)
    {
      return priority switch
      {
        priorityEnum.urgent => 7,
        priorityEnum.high => 15,
        priorityEnum.medium => 30,
        _ => 60
      };
    }

    public static DateTime CalculateDueDate(DateTime discoveredAt, priorityEnum priority)
    {
      return discoveredAt.AddDays(GetSlaDays(priority));
    }
    public static DateTime CalculateDueDate(DateTime discoveredAt, severityEnum severity)
    {
      return CalculateDueDate(discoveredAt, ClassifyPriority(severity));
    }

    public static severityEnum? ParseSeverityText(string? value)
    {
      string text = TextNormalizer.Fold(value);
      if (text.Length == 0) return null;

      if (text.Contains("crit")) return severityEnum.critical;
      if (text.Contains("alt") || text.Contains("high")) return severityEnum.high;
      if (text.Contains("med") || text.Contains("moder")) return severityEnum.medium;
      if (text.Contains("baix") || text.Contains("low")) return severityEnum.low;
      if (text.Contains("info") || text.Contains("none") || text.Contains("nenhum")) return severityEnum.none;

      return null;
    }

    public static severityEnum ResolveSeverity(decimal cvssScore, string? scannerSeverity, out string? note)
    {
      note = null;
      severityEnum? fromText = ParseSeverityText(scannerSeverity);

      if (cvssScore > 0m)
      {
        severityEnum fromScore = ClassifySeverity(cvssScore);

        if (fromText.HasValue && fromText.Value != fromScore)
        {
          note = $"severidade do scanner ({Label(fromText.Value)}) difere do CVSS {FormatScore(cvssScore)} ({Label(fromScore)}); prevaleceu o CVSS.";
        }

        return fromScore;
      }

      return fromText ?? severityEnum.none;
    }
    public static RiskClassification Classify(
      decimal cvssScore,
      severityEnum severity,
      assetCriticalityEnum criticality,
      exposureEnum exposure)
    {
      priorityEnum priority = ClassifyPriority(severity, criticality, exposure);

      return new RiskClassification(
        severity,
        priority,
        GetSlaDays(priority),
        Explain(cvssScore, severity, priority, criticality, exposure)
      );
    }
    public static string Explain(
      decimal cvssScore,
      severityEnum severity,
      priorityEnum priority,
      assetCriticalityEnum criticality,
      exposureEnum exposure)
    {
      priorityEnum basePriority = ClassifyPriority(severity);

      string text = $"CVSS {FormatScore(cvssScore)} → severidade {Label(severity)}, prioridade {Label(priority)}";

      if (priority != basePriority)
      {
        text += $" (ajustada de {Label(basePriority)}: ativo de criticidade {Label(criticality)} e exposição {Label(exposure)})";
      }

      return text + $", prazo de {GetSlaDays(priority)} dias.";
    }

    private static string FormatScore(decimal score) => score.ToString("0.0", CultureInfo.InvariantCulture);

    private static string Label(severityEnum severity) => severity switch
    {
      severityEnum.critical => "Crítica",
      severityEnum.high => "Alta",
      severityEnum.medium => "Média",
      severityEnum.low => "Baixa",
      _ => "Nenhuma"
    };

    private static string Label(priorityEnum priority) => priority switch
    {
      priorityEnum.urgent => "Urgente",
      priorityEnum.high => "Alta",
      priorityEnum.medium => "Média",
      _ => "Baixa"
    };

    private static string Label(assetCriticalityEnum criticality) => criticality switch
    {
      assetCriticalityEnum.critical => "crítica",
      assetCriticalityEnum.high => "alta",
      assetCriticalityEnum.medium => "média",
      _ => "baixa"
    };

    private static string Label(exposureEnum exposure) => exposure switch
    {
      exposureEnum.internet => "internet",
      exposureEnum.internalNetwork => "rede interna",
      _ => "isolado"
    };
  }
}