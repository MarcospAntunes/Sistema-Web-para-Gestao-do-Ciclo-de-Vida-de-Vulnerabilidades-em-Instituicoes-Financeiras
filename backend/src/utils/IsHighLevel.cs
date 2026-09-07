using System.Security.Claims;

namespace Utils
{
  public static class VerifyRole
  {
    public static bool IsHighLevel(ClaimsPrincipal user)
    {
      var AccessLevel = user.FindFirst("AccessLevel")?.Value;
      
      if (int.TryParse(AccessLevel, out int level))
        {
          return level >= 3;
        }
        return false;
    }
  }
}