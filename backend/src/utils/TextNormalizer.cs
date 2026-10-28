using System.Globalization;
using System.Text;

namespace Utils
{
  public static class TextNormalizer
  {
    private static readonly Dictionary<char, char> AccentMap = BuildAccentMap();

    private static Dictionary<char, char> BuildAccentMap()
    {
      var map = new Dictionary<char, char>();

      void Add(string accented, char plain)
      {
        foreach (char c in accented) map[c] = plain;
      }

      Add("ÀÁÂÃÄÅàáâãäå", 'a');
      Add("ÈÉÊËèéêë", 'e');
      Add("ÌÍÎÏìíîï", 'i');
      Add("ÒÓÔÕÖòóôõö", 'o');
      Add("ÙÚÛÜùúûü", 'u');
      Add("Çç", 'c');
      Add("Ññ", 'n');
      Add("Ýýÿ", 'y');

      return map;
    }
    public static string Fold(string? value)
    {
      if (string.IsNullOrEmpty(value)) return string.Empty;

      var sb = new StringBuilder(value.Length);
      foreach (char c in value)
      {
        if (CharUnicodeInfo.GetUnicodeCategory(c) == UnicodeCategory.NonSpacingMark) continue;

        sb.Append(AccentMap.TryGetValue(c, out char plain) ? plain : char.ToLowerInvariant(c));
      }

      return sb.ToString();
    }

    public static string ToKey(string? value)
    {
      string folded = Fold(value);

      var sb = new StringBuilder(folded.Length);
      foreach (char c in folded)
      {
        if (char.IsLetterOrDigit(c)) sb.Append(c);
      }

      return sb.ToString();
    }
  }
}
