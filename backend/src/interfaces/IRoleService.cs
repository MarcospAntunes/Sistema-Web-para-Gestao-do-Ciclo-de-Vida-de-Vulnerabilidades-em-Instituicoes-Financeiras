using System.Security.Claims;
using DTOs;

namespace Interfaces
{
  public interface IRoleService
  {
    Task<GetRoleDTO> Get(ClaimsPrincipal user, int id);
    Task<IEnumerable<GetRoleDTO>> Getall(ClaimsPrincipal user);
    Task<ResponseRoleDTO> CreateAsync(CreateRoleDTO dto, ClaimsPrincipal user);
  }
}