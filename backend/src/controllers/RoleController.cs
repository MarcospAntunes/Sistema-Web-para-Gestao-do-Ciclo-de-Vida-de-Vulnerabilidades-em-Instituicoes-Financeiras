using DTOs;
using Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Utils;

namespace Controllers
{
  [ApiController]
  [Route("api/[controller]")]
  public class RoleController : ControllerBase
  {
    private readonly IRoleService _roleService;

    public RoleController(IRoleService roleService)
    {
      _roleService = roleService;
    }

    [HttpGet("get-role/{id}")]
    public async Task<IActionResult> Get(int id)
    {
       try
      {
        GetRoleDTO userSearched = await _roleService.Get(User, id);

        return CustomResults.Success(userSearched);
      }
      catch (Exception error)
      {
        return CustomResults.BadRequest(error.Message);
      }
    }

    [HttpPost("create-role")]
    [Authorize(policy: "AdminOnly")]
    public async Task<IActionResult> Create([FromBody] CreateRoleDTO dto)
    {
      try
      {
        ResponseRoleDTO newRole = await _roleService.CreateAsync(dto, User);
        return CustomResults.Created(newRole, newRole.Id, "role", "New role has been created.");
      }
      catch (Exception error)
      {
        return CustomResults.BadRequest(error.Message);
      }
    }

    [HttpPut("update-role/{id}")]
    [Authorize(policy: "AdminOnly")]
    public async Task<IActionResult> Update([FromBody] UpdateRoleDTO dto, int id)
    {
      try
      {
        UpdateRoleDTO updatedRole = await _roleService.Put(User, dto, id);
        return CustomResults.Success("Role has been updated.");
      }
      catch (Exception error)
      {
        return CustomResults.BadRequest(error.Message);
      }
    }
  }
}
