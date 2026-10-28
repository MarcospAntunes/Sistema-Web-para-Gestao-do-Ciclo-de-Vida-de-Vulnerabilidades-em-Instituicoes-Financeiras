using System.Globalization;
using System.Text;
using System.Text.RegularExpressions;
using Enums;

namespace Utils
{
  public class CsvRecord
  {
    public int Line { get; }
    public List<string> Cells { get; }

    public CsvRecord(int line, List<string> cells)
    {
      Line = line;
      Cells = cells;
    }
  }

  public class CsvRowData
  {
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string Cve { get; set; } = CsvParserHelper.UnknownCve;
    public decimal CveScore { get; set; } = 0.0m;
    public string CvssVersion { get; set; } = "3.1";
    public string? CvssVector { get; set; }
    public string? Severity { get; set; }
    public DateTime? DiscoveredAt { get; set; }
    public DateTime? DueDate { get; set; }
    public string Asset { get; set; } = CsvParserHelper.DefaultAsset;
    public string? AssetEnvironment { get; set; }
    public assetCriticalityEnum AssetCriticality { get; set; } = assetCriticalityEnum.medium;
    public exposureEnum Exposure { get; set; } = exposureEnum.internalNetwork;
  }

  public class CsvRowResult
  {
    public CsvRowData? Data { get; set; }
    public string? Error { get; set; }
    public List<string> Warnings { get; } = new();
  }

  public static class CsvParserHelper
  {
    public const string UnknownCve = "CVE-DESCONHECIDO";
    public const string DefaultAsset = "Não informado";
    private static readonly string[] TitleAliases = { "title", "titulo", "name", "nome", "vulnerability", "vulnerabilidade", "pluginname", "finding", "issue" };
    private static readonly string[] DescriptionAliases = { "description", "descricao", "summary", "resumo", "details", "detalhes", "synopsis" };
    private static readonly string[] CveAliases = { "cve", "cveid", "cves", "identificador" };
    private static readonly string[] ScoreAliases = { "cvescore", "cvssscore", "cvss", "score", "pontuacao", "pontuacaocvss", "cvssv3basescore", "cvssv30basescore", "cvssv31basescore", "cvssbasescore", "basescore" };
    private static readonly string[] VersionAliases = { "cvssversion", "version", "versao", "versaocvss" };
    private static readonly string[] VectorAliases = { "cvssvector", "vector", "vetor", "vetorcvss", "cvssv3vector" };
    private static readonly string[] SeverityAliases = { "severity", "severidade", "risk", "risco", "criticidade", "severitylevel" };
    private static readonly string[] DiscoveredAliases = { "discoveredat", "discovered", "data", "datadescoberta", "datadedescoberta", "date", "firstseen", "firstdiscovered" };
    private static readonly string[] DueAliases = { "duedate", "due", "prazo", "datalimite", "sla", "deadline" };
    private static readonly string[] AssetAliases = { "asset", "ativo", "host", "hostname", "ip", "ipaddress", "sistema", "system", "target", "servidor", "server" };
    private static readonly string[] EnvironmentAliases = { "assetenvironment", "environment", "ambiente", "env" };
    private static readonly string[] CriticalityAliases = { "assetcriticality", "criticidadedoativo", "criticidadeativo", "criticalidadedoativo" };
    private static readonly string[] ExposureAliases = { "exposure", "exposicao", "exposto" };

    private static readonly Regex CveRegex = new(@"CVE-[0-9]{4}-[0-9]{4,10}", RegexOptions.IgnoreCase | RegexOptions.CultureInvariant);
    private static readonly Regex VersionRegex = new(@"[0-9]+(\.[0-9]+)?", RegexOptions.CultureInvariant);
    private static readonly Regex VectorVersionRegex = new(@"^CVSS:([0-9]+\.[0-9]+)/", RegexOptions.IgnoreCase | RegexOptions.CultureInvariant);
    private static readonly Regex IsoDateStart = new(@"^[0-9]{4}-[0-9]{2}-[0-9]{2}", RegexOptions.CultureInvariant);

    private static readonly string[] DateFormats =
    {
      "dd/MM/yyyy", "dd/MM/yyyy HH:mm", "dd/MM/yyyy HH:mm:ss",
      "d/M/yyyy", "d/M/yyyy H:mm", "d/M/yyyy H:mm:ss",
      "dd-MM-yyyy", "dd.MM.yyyy",
      "yyyy-MM-dd", "yyyy-MM-dd HH:mm", "yyyy-MM-dd HH:mm:ss", "yyyy/MM/dd"
    };
    private static string DecodeText(Stream stream)
    {
      using var memory = new MemoryStream();
      stream.CopyTo(memory);
      byte[] bytes = memory.ToArray();

      if (bytes.Length >= 2 && bytes[0] == 0xFF && bytes[1] == 0xFE)
        return Encoding.Unicode.GetString(bytes, 2, bytes.Length - 2);

      if (bytes.Length >= 2 && bytes[0] == 0xFE && bytes[1] == 0xFF)
        return Encoding.BigEndianUnicode.GetString(bytes, 2, bytes.Length - 2);

      int offset = bytes.Length >= 3 && bytes[0] == 0xEF && bytes[1] == 0xBB && bytes[2] == 0xBF ? 3 : 0;

      try
      {
        return new UTF8Encoding(false, true).GetString(bytes, offset, bytes.Length - offset);
      }
      catch (DecoderFallbackException)
      {
        return Encoding.Latin1.GetString(bytes, offset, bytes.Length - offset);
      }
    }

    private static char DetectDelimiter(string text)
    {
      int commas = 0, semicolons = 0, tabs = 0;
      bool inQuotes = false;
      bool sawContent = false;

      foreach (char c in text)
      {
        if (c == '"')
        {
          inQuotes = !inQuotes;
          sawContent = true;
          continue;
        }

        if (inQuotes) continue;

        if (c == '\r' || c == '\n')
        {
          if (sawContent) break;
          continue;
        }

        sawContent = true;
        if (c == ',') commas++;
        else if (c == ';') semicolons++;
        else if (c == '\t') tabs++;
      }

      if (semicolons > commas && semicolons >= tabs) return ';';
      if (tabs > commas && tabs > semicolons) return '\t';
      return ',';
    }

    public static List<CsvRecord> ParseCsv(Stream stream)
    {
      string text = DecodeText(stream);
      char delimiter = DetectDelimiter(text);

      var records = new List<CsvRecord>();
      var currentRow = new List<string>();
      var cell = new StringBuilder();
      bool inQuotes = false;
      int line = 1;
      int recordStartLine = 1;

      void FinishRow()
      {
        currentRow.Add(cell.ToString().Trim());
        cell.Clear();

        if (currentRow.Any(value => !string.IsNullOrWhiteSpace(value)))
        {
          records.Add(new CsvRecord(recordStartLine, currentRow));
        }

        currentRow = new List<string>();
      }

      for (int i = 0; i < text.Length; i++)
      {
        char c = text[i];

        if (inQuotes)
        {
          if (c == '"')
          {
            if (i + 1 < text.Length && text[i + 1] == '"')
            {
              cell.Append('"');
              i++;
            }
            else
            {
              inQuotes = false;
            }
          }
          else
          {
            if (c == '\n') line++;
            cell.Append(c);
          }
          continue;
        }

        if (c == '"' && string.IsNullOrWhiteSpace(cell.ToString()))
        {
          cell.Clear();
          inQuotes = true;
          continue;
        }

        if (c == delimiter)
        {
          currentRow.Add(cell.ToString().Trim());
          cell.Clear();
          continue;
        }

        if (c == '\r' || c == '\n')
        {
          if (c == '\r' && i + 1 < text.Length && text[i + 1] == '\n') i++;

          FinishRow();
          line++;
          recordStartLine = line;
          continue;
        }

        cell.Append(c);
      }

      if (cell.Length > 0 || currentRow.Count > 0)
      {
        FinishRow();
      }

      return records;
    }

    public static Dictionary<string, int> BuildHeaderMap(List<string> header)
    {
      var map = new Dictionary<string, int>(StringComparer.Ordinal);

      for (int i = 0; i < header.Count; i++)
      {
        string key = TextNormalizer.ToKey(header[i]);
        if (key.Length > 0) map.TryAdd(key, i);
      }

      return map;
    }

    public static bool HasTitleColumn(Dictionary<string, int> headerMap)
    {
      return TitleAliases.Any(headerMap.ContainsKey);
    }

    public static CsvRowResult MapRow(List<string> row, Dictionary<string, int> headerMap)
    {
      var result = new CsvRowResult();

      string GetValue(string[] aliases)
      {
        foreach (string alias in aliases)
        {
          if (headerMap.TryGetValue(alias, out int index) && index < row.Count && !string.IsNullOrWhiteSpace(row[index]))
          {
            return row[index];
          }
        }
        return string.Empty;
      }

      string title = GetValue(TitleAliases);
      if (string.IsNullOrWhiteSpace(title))
      {
        result.Error = "título ausente.";
        return result;
      }
      if (title.Length > 255)
      {
        title = title[..255];
        result.Warnings.Add("título truncado em 255 caracteres.");
      }

      string description = GetValue(DescriptionAliases);
      if (string.IsNullOrWhiteSpace(description)) description = title;

      string cve = UnknownCve;
      string cveRaw = GetValue(CveAliases);
      if (!string.IsNullOrWhiteSpace(cveRaw))
      {
        MatchCollection matches = CveRegex.Matches(cveRaw);
        if (matches.Count > 0)
        {
          cve = matches[0].Value.ToUpperInvariant();
          if (matches.Count > 1) result.Warnings.Add($"mais de um CVE na célula; usado o primeiro ({cve}).");
        }
        else
        {
          result.Warnings.Add($"CVE '{Truncate(cveRaw, 30)}' fora do padrão CVE-AAAA-NNNN; registrado como {UnknownCve}.");
        }
      }

      decimal score = 0m;
      string scoreRaw = GetValue(ScoreAliases);
      if (!string.IsNullOrWhiteSpace(scoreRaw))
      {
        if (!TryParseDecimal(scoreRaw, out score))
        {
          result.Error = $"score CVSS inválido ('{Truncate(scoreRaw, 20)}').";
          return result;
        }
        if (score < 0m || score > 10m)
        {
          result.Error = $"score CVSS fora da faixa 0-10 ({scoreRaw}).";
          return result;
        }
        score = Math.Round(score, 1);
      }

      string? vector = GetValue(VectorAliases);
      if (string.IsNullOrWhiteSpace(vector))
      {
        vector = null;
      }
      else if (vector.Length > 255)
      {
        vector = null;
        result.Warnings.Add("vetor CVSS maior que 255 caracteres; ignorado.");
      }

      string version = "3.1";
      string versionRaw = GetValue(VersionAliases);
      if (!string.IsNullOrWhiteSpace(versionRaw))
      {
        Match versionMatch = VersionRegex.Match(versionRaw);
        if (versionMatch.Success && versionMatch.Value.Length <= 10)
        {
          version = versionMatch.Value;
        }
        else
        {
          result.Warnings.Add($"versão CVSS '{Truncate(versionRaw, 20)}' não reconhecida; usada a 3.1.");
        }
      }
      else if (vector != null)
      {
        Match vectorVersion = VectorVersionRegex.Match(vector);
        if (vectorVersion.Success) version = vectorVersion.Groups[1].Value;
      }

      string severityRaw = GetValue(SeverityAliases);
      if (!string.IsNullOrWhiteSpace(severityRaw) && RiskClassifier.ParseSeverityText(severityRaw) == null)
      {
        result.Warnings.Add($"severidade '{Truncate(severityRaw, 20)}' não reconhecida; será usado o CVSS.");
      }

      DateTime? discoveredAt = ParseOptionalDate(GetValue(DiscoveredAliases), "data de descoberta", result);
      DateTime? dueDate = ParseOptionalDate(GetValue(DueAliases), "prazo", result);

      string asset = GetValue(AssetAliases);
      if (string.IsNullOrWhiteSpace(asset))
      {
        asset = DefaultAsset;
      }
      else if (asset.Length > 255)
      {
        asset = asset[..255];
        result.Warnings.Add("ativo truncado em 255 caracteres.");
      }

      string? environment = GetValue(EnvironmentAliases);
      if (string.IsNullOrWhiteSpace(environment))
      {
        environment = null;
      }
      else if (environment.Length > 100)
      {
        environment = environment[..100];
        result.Warnings.Add("ambiente truncado em 100 caracteres.");
      }

      result.Data = new CsvRowData
      {
        Title = title,
        Description = description,
        Cve = cve,
        CveScore = score,
        CvssVersion = version,
        CvssVector = vector,
        Severity = string.IsNullOrWhiteSpace(severityRaw) ? null : severityRaw,
        DiscoveredAt = discoveredAt,
        DueDate = dueDate,
        Asset = asset,
        AssetEnvironment = environment,
        AssetCriticality = ParseCriticality(GetValue(CriticalityAliases), result),
        Exposure = ParseExposure(GetValue(ExposureAliases), result)
      };

      return result;
    }

    public static string BuildDuplicateKey(string cve, string title, string asset)
    {
      string assetKey = TextNormalizer.ToKey(asset);

      return string.Equals(cve?.Trim(), UnknownCve, StringComparison.OrdinalIgnoreCase)
        ? $"T:{TextNormalizer.ToKey(title)}|{assetKey}"
        : $"C:{cve?.Trim().ToUpperInvariant()}|{assetKey}";
    }

    private static bool TryParseDecimal(string raw, out decimal value)
    {
      string normalized = raw.Trim().Replace(',', '.');

      return decimal.TryParse(
        normalized,
        NumberStyles.AllowDecimalPoint | NumberStyles.AllowLeadingSign,
        CultureInfo.InvariantCulture,
        out value);
    }

    private static DateTime? ParseOptionalDate(string raw, string fieldName, CsvRowResult result)
    {
      if (string.IsNullOrWhiteSpace(raw)) return null;

      if (TryParseDate(raw, out DateTime value)) return value;

      result.Warnings.Add($"{fieldName} '{Truncate(raw, 25)}' inválida (use dd/MM/aaaa ou aaaa-MM-dd); usado o valor padrão.");
      return null;
    }

    private static bool TryParseDate(string raw, out DateTime value)
    {
      const DateTimeStyles styles =
        DateTimeStyles.AllowWhiteSpaces | DateTimeStyles.AssumeUniversal | DateTimeStyles.AdjustToUniversal;

      string trimmed = raw.Trim();

      if (DateTime.TryParseExact(trimmed, DateFormats, CultureInfo.InvariantCulture, styles, out value))
        return true;

      if (IsoDateStart.IsMatch(trimmed) && DateTime.TryParse(trimmed, CultureInfo.InvariantCulture, styles, out value))
        return true;

      value = default;
      return false;
    }

    private static assetCriticalityEnum ParseCriticality(string raw, CsvRowResult result)
    {
      if (string.IsNullOrWhiteSpace(raw)) return assetCriticalityEnum.medium;

      string text = TextNormalizer.Fold(raw);
      if (text.Contains("crit")) return assetCriticalityEnum.critical;
      if (text.Contains("alt") || text.Contains("high")) return assetCriticalityEnum.high;
      if (text.Contains("med") || text.Contains("moder")) return assetCriticalityEnum.medium;
      if (text.Contains("baix") || text.Contains("low")) return assetCriticalityEnum.low;

      result.Warnings.Add($"criticidade do ativo '{Truncate(raw, 20)}' não reconhecida; usada a média.");
      return assetCriticalityEnum.medium;
    }

    private static exposureEnum ParseExposure(string raw, CsvRowResult result)
    {
      if (string.IsNullOrWhiteSpace(raw)) return exposureEnum.internalNetwork;

      string text = TextNormalizer.Fold(raw);

      if (text.Contains("internet") || text.Contains("extern") || text.Contains("public") || text.Contains("dmz"))
        return exposureEnum.internet;
      if (text.Contains("isol") || text.Contains("offline"))
        return exposureEnum.isolated;
      if (text.Contains("intern") || text.Contains("corporat") || text.Contains("lan"))
        return exposureEnum.internalNetwork;

      result.Warnings.Add($"exposição '{Truncate(raw, 20)}' não reconhecida; usada rede interna.");
      return exposureEnum.internalNetwork;
    }

    private static string Truncate(string value, int max)
    {
      return value.Length <= max ? value : value[..max] + "…";
    }
  }
}