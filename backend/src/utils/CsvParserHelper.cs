using System.Globalization;
using System.Text;

namespace Utils
{
  public class CsvRowData
  {
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string Cve { get; set; } = string.Empty;
    public decimal CveScore { get; set; } = 0.0m;
    public string CvssVersion { get; set; } = "3.1";
    public string? CvssVector { get; set; }
    public string? Severity { get; set; }
    public DateTime? DiscoveredAt { get; set; }
    public DateTime? DueDate { get; set; }
  }

  public static class CsvParserHelper
  {
    public static List<List<string>> ParseCsv(Stream stream)
    {
      using var reader = new StreamReader(stream, Encoding.UTF8, true, 1024, leaveOpen: true);
      var rows = new List<List<string>>();
      var currentRow = new List<string>();
      var currentCell = new StringBuilder();
      bool insideQuotes = false;
      int charCode;

      while ((charCode = reader.Read()) != -1)
      {
        char c = (char)charCode;

        if (c == '"')
        {
          int nextCharCode = reader.Peek();
          if (insideQuotes && nextCharCode == '"')
          {
            currentCell.Append('"');
            reader.Read();
          }
          else
          {
            insideQuotes = !insideQuotes;
          }
        }
        else if ((c == ',' || c == ';') && !insideQuotes)
        {
          currentRow.Add(currentCell.ToString().Trim());
          currentCell.Clear();
        }
        else if ((c == '\r' || c == '\n') && !insideQuotes)
        {
          if (c == '\r' && reader.Peek() == '\n')
          {
            reader.Read();
          }
          currentRow.Add(currentCell.ToString().Trim());
          currentCell.Clear();

          if (currentRow.Any(cell => !string.IsNullOrWhiteSpace(cell)))
          {
            rows.Add(new List<string>(currentRow));
          }
          currentRow.Clear();
        }
        else
        {
          currentCell.Append(c);
        }
      }

      if (currentCell.Length > 0 || currentRow.Count > 0)
      {
        currentRow.Add(currentCell.ToString().Trim());
        if (currentRow.Any(cell => !string.IsNullOrWhiteSpace(cell)))
        {
          rows.Add(currentRow);
        }
      }

      return rows;
    }

    public static CsvRowData? MapRow(List<string> row, Dictionary<string, int> headerMap)
    {
      string GetValue(params string[] aliases)
      {
        foreach (var alias in aliases)
        {
          if (headerMap.TryGetValue(alias.ToLowerInvariant(), out int index) && index < row.Count)
          {
            return row[index];
          }
        }
        return string.Empty;
      }

      string title = GetValue("title", "titulo", "name", "vulnerability", "vulnerabilidade");
      if (string.IsNullOrWhiteSpace(title)) return null;

      string description = GetValue("description", "descricao", "summary", "resumo", "details");
      if (string.IsNullOrWhiteSpace(description)) description = title;

      string cve = GetValue("cve", "cve id", "cve-id", "cveid", "identificador");
      if (string.IsNullOrWhiteSpace(cve)) cve = "CVE-DESCONHECIDO";

      string scoreStr = GetValue("cvescore", "score", "cvss", "cvss score", "cvss_score", "pontuacao");
      decimal score = 0m;
      if (!string.IsNullOrWhiteSpace(scoreStr))
      {
        scoreStr = scoreStr.Replace(",", ".");
        decimal.TryParse(scoreStr, NumberStyles.Any, CultureInfo.InvariantCulture, out score);
      }

      string version = GetValue("cvssversion", "version", "versao");
      if (string.IsNullOrWhiteSpace(version)) version = "3.1";

      string vector = GetValue("cvssvector", "vector", "vetor", "cvss_vector");

      string severity = GetValue("severity", "severidade", "risk", "risco", "criticidade");

      DateTime discoveredAt = DateTime.UtcNow;
      string discoveredStr = GetValue("discoveredat", "discovered", "data", "data descoberta", "date");
      if (!string.IsNullOrWhiteSpace(discoveredStr) && DateTime.TryParse(discoveredStr, out DateTime parsedDiscovered))
      {
        discoveredAt = parsedDiscovered;
      }

      DateTime? dueDate = null;
      string dueStr = GetValue("duedate", "due", "prazo", "data limite", "sla");
      if (!string.IsNullOrWhiteSpace(dueStr) && DateTime.TryParse(dueStr, out DateTime parsedDue))
      {
        dueDate = parsedDue;
      }

      return new CsvRowData
      {
        Title = title,
        Description = description,
        Cve = cve,
        CveScore = score,
        CvssVersion = version,
        CvssVector = string.IsNullOrWhiteSpace(vector) ? null : vector,
        Severity = severity,
        DiscoveredAt = discoveredAt,
        DueDate = dueDate
      };
    }
  }
}
