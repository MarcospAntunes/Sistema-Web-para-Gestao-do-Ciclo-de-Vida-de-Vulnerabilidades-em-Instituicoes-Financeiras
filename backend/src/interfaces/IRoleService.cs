using System.Security.Claims;
using DTOs;

namespace Interfaces
{
  public interface IRoleService
  {
    Task<GetRoleDTO> Get(ClaimsPrincipal user, int id);
    Task<IEnumerable<GetRoleDTO>> Getall(ClaimsPrincipal user);
    Task<UpdateRoleDTO> Put(ClaimsPrincipal user,  UpdateRoleDTO dto, int id);
    Task<ResponseRoleDTO> CreateAsync(CreateRoleDTO dto, ClaimsPrincipal user);
  }
}