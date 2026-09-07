using System.Security.Claims;
using DTOs;

namespace Interfaces
{
  public interface IUserService
  {
    Task<GetUserDTO> Get(ClaimsPrincipal user, int id);
    Task<IEnumerable<GetUserDTO>> GetAll(ClaimsPrincipal user);
    Task<ResponseUserDTO> CreateAsync(CreateUserDTO dto, ClaimsPrincipal user);
    Task<UpdateUserDTO> Put(ClaimsPrincipal user,  UpdateUserDTO dto, int id);
    Task<ResponseUserDTO> LoginUser(LoginDTO dto, HttpContext httpContext);
    Task<ResponseUserDTO> GetUserLogged(ClaimsPrincipal user);
  }
}