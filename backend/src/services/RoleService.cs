using System.Security.Claims;
using Data;
using DTOs;
using Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Models;
using Security;

namespace Services
{
  public class RoleService : IRoleService
  {
    private readonly VulnTrackerDbContext _context;

    public RoleService(VulnTrackerDbContext context)
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

    public async Task<ResponseRoleDTO> CreateAsync(CreateRoleDTO dto, ClaimsPrincipal user)
    {
      int userId = GetAuthenticatedUserId(user);

      var authResult = Auth.CanAccessUser(user, userId);
      if (authResult is not null) throw new Exception("Invalid authentication or access denied.");

      Role newRole = new Role
      {
        AccessLevel = dto.AccessLevel,
        Name = dto.Name
      };

      _context.Roles.Add(newRole);
      await _context.SaveChangesAsync();

      return new ResponseRoleDTO(newRole.Id, newRole.Name, newRole.AccessLevel);
    }

    public async Task<GetRoleDTO> Get(ClaimsPrincipal user, int id)
    {
      GetRoleDTO? role = await _context.Roles
        .Where(r => r.Id == id)
        .Select(r => new GetRoleDTO(
          r.Id,
          r.Name,
          r.AccessLevel
        ))
        .FirstOrDefaultAsync();

      if (role is null) throw new Exception("Role not found.");

      return role;
    }

    public async Task<IEnumerable<GetRoleDTO>> Getall(ClaimsPrincipal user)
    {
      int userId = GetAuthenticatedUserId(user);

      var authResult = Auth.CanAccessUser(user, userId);
      if (authResult is not null) throw new Exception("Invalid authentication or access denied.");

      IEnumerable<GetRoleDTO> roles = await _context.Roles
        .AsNoTracking()
        .Select(r => new GetRoleDTO(
          r.Id,
          r.Name,
          r.AccessLevel
        ))
        .ToListAsync();

      return roles;
    }

    public async Task<UpdateRoleDTO> Put(ClaimsPrincipal user, UpdateRoleDTO dto, int id)
    {
      IActionResult? authResult = Auth.IsLogged(user);
      if (authResult is not null) throw new Exception("Invalid authentication or access denied.");

      int userId = GetAuthenticatedUserId(user);

      Role? roleEntity = await _context.Roles
        .FirstOrDefaultAsync(e => e.Id == id);

      if (roleEntity == null)
      {
        throw new Exception("Role not found.");
      }

      roleEntity.Name = dto.Name;
      roleEntity.AccessLevel = dto.AccessLevel;

      await _context.SaveChangesAsync();

      return new UpdateRoleDTO(
        roleEntity.Name,
        roleEntity.AccessLevel
      );
    }
  }
}