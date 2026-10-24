using System.Security.Claims;
using Data;
using DTOs;
using Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Models;
using Security;
using Utils;

namespace Services
{
  public class UserService : IUserService
  {
    private readonly VulnTrackerDbContext _context;

    public UserService(VulnTrackerDbContext context)
    {
      _context = context;
    }

    private int GetAuthenticatedUserId(ClaimsPrincipal user)
    {
      string? claimValue = user.FindFirstValue(ClaimTypes.NameIdentifier);
      if (string.IsNullOrEmpty(claimValue) || !int.TryParse(claimValue, out int userId))
      {
        throw new Exception("Invalid token or user ID not found in the claims.");
      }
      return userId;
    }

    public async Task<GetUserDTO> Get(ClaimsPrincipal user, int id)
    {
      IActionResult? authResult = Auth.CanAccessUser(user, id);
      if (authResult is not null) throw new Exception("Invalid authentication or access denied.");

      GetUserDTO? currentUser = await _context.Users
        .AsNoTracking()
        .Include(u => u.Role)
        .Where(u => u.Id == id)
        .Select(u => new GetUserDTO(
          u.Id,
          u.Name,
          u.Email,
          u.RoleId,
          u.Role != null ? u.Role.Name : "Sem perfil"
        ))
        .FirstOrDefaultAsync();

      if (currentUser is null) throw new Exception("User not found.");

      return currentUser;
    }

    public async Task<IEnumerable<GetUserDTO>> GetAll(ClaimsPrincipal user)
    {
      IActionResult? authResult = Auth.IsLogged(user);
      if (authResult is not null) throw new Exception("Invalid authentication or access denied.");

      IEnumerable<GetUserDTO> users = await _context.Users
        .AsNoTracking()
        .Include(u => u.Role)
        .Select(u => new GetUserDTO(
          u.Id,
          u.Name,
          u.Email,
          u.RoleId,
          u.Role != null ? u.Role.Name : "Sem perfil"
        ))
        .ToListAsync();

      return users;
    }

    public async Task LogoutAsync(HttpContext httpContext)
    {
      await Microsoft.AspNetCore.Authentication.AuthenticationHttpContextExtensions.SignOutAsync(
        httpContext,
        Microsoft.AspNetCore.Authentication.Cookies.CookieAuthenticationDefaults.AuthenticationScheme
      );
    }

    public async Task<bool> DeleteAsync(ClaimsPrincipal user, int id)
    {
      if (!VerifyRole.IsHighLevel(user))
      {
        throw new Exception("Apenas administradores podem excluir usuários.");
      }

      User? userToDelete = await _context.Users.FindAsync(id);
      if (userToDelete is null) throw new Exception("Usuário não encontrado.");

      _context.Users.Remove(userToDelete);
      await _context.SaveChangesAsync();
      return true;
    }

    public async Task<ResponseUserDTO> CreateAsync(CreateUserDTO dto, ClaimsPrincipal user)
    {
      bool emailExists = await _context.Users.AnyAsync(u => u.Email == dto.Email);
      if (emailExists)
      {
        throw new Exception("This email address is already registered.");
      }

      User newUser = new User
      {
        Name = dto.Name,
        RoleId = 0,
      };

      newUser.SetEmail(dto.Email);
      newUser.SetPassword(dto.Password);

      _context.Users.Add(newUser);
      await _context.SaveChangesAsync();

      return new ResponseUserDTO(newUser.Id, newUser.Name, newUser.Email, newUser.RoleId);
    }

    public async Task<UpdateUserDTO> Put(ClaimsPrincipal user, UpdateUserDTO dto, int id)
    {
      IActionResult? authResult = Auth.CanAccessUser(user, id);
      if (authResult is not null) throw new Exception("Invalid authentication or access denied.");

      User? userEntity = await _context.Users.FindAsync(id);
      if (userEntity == null)
      {
        throw new Exception("User not found.");
      }

      userEntity.Name = dto.Name;
      userEntity.SetEmail(dto.Email);
      userEntity.SetPassword(dto.Password);

      await _context.SaveChangesAsync();

      return new UpdateUserDTO(userEntity.Name, userEntity.Email, dto.Password);
    }

    public async Task<ResponseUserDTO> LoginUser(LoginDTO dto, HttpContext httpContext)
    {
      User? user = await _context.Users
        .Include(u => u.Role)
        .FirstOrDefaultAsync(user => user.Email == dto.Email);
      if (user is null) throw new Exception("Usuário ou senha incorretos!");

      bool checkPassword = BCrypt.Net.BCrypt.Verify(dto.Password, user.PasswordHash);
      if (!checkPassword) throw new Exception("Usuário ou senha incorretos!");

      await Cookie.CreateAsync(httpContext, user);

      return new ResponseUserDTO(user.Id, user.Name, user.Email, user.RoleId);
    }

    public async Task<ResponseUserDTO> GetUserLogged(ClaimsPrincipal user)
    {
      if (user == null)
        throw new UnauthorizedAccessException("Usuário não fornecido.");

      // 1. Tenta buscar pelo padrão NameIdentifier
      string? claimValue = user.FindFirstValue(ClaimTypes.NameIdentifier);

      // 2. Se falhar, tenta buscar pela string pura "id" ou pelo Name (fallback de segurança)
      if (string.IsNullOrEmpty(claimValue))
      {
        claimValue = user.FindFirstValue("id") ?? user.FindFirstValue("sub") ?? user.FindFirstValue(ClaimTypes.Name);
      }

      // 3. Validação robusta antes de tentar converter para Inteiro
      if (string.IsNullOrEmpty(claimValue) || !int.TryParse(claimValue, out int userId))
      {
        // Se quiser debugar, descomente a linha abaixo para listar no console do C# todas as claims que vieram no cookie:
        // foreach (var c in user.Claims) { Console.WriteLine($"Claim encontrada: {c.Type} = {c.Value}"); }

        throw new UnauthorizedAccessException("ID do usuário não pôde ser encontrado nas claims do cookie.");
      }

      // 4. Busca o usuário de forma segura
      User? userLogged = await _context.Users
          .AsNoTracking()
          .FirstOrDefaultAsync(u => u.Id == userId);

      if (userLogged is null)
        throw new KeyNotFoundException("Usuário logado não existe no banco de dados.");

      return new ResponseUserDTO(
          userLogged.Id,
          userLogged.Name,
          userLogged.Email,
          userLogged.RoleId
      );
    }

  }
}