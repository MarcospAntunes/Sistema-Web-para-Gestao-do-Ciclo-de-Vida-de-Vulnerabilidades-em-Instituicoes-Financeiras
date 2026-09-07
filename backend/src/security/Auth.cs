using System.Security.Claims;
using Microsoft.AspNetCore.Mvc;
using Utils;

namespace Security
{
  public static class Auth
  {
    public static IActionResult? CanAccessUser(ClaimsPrincipal user, int id)
    {
      var loggedId = user.FindFirst(ClaimTypes.NameIdentifier)?.Value;
      if(loggedId is null) return CustomResults.Unauthorized("Autenticação inválida");
      if(int.Parse(loggedId) != id && VerifyRole.IsHighLevel(user)) return CustomResults.Forbidden("Acesso negado");

      return null;
    }

    public static IActionResult? IsLogged(ClaimsPrincipal user)
    {
      var loggedId = user.FindFirst(ClaimTypes.NameIdentifier)?.Value;
      if(loggedId is null) return CustomResults.Unauthorized("Autenticação inválida");

      return null;
    }
  }
}