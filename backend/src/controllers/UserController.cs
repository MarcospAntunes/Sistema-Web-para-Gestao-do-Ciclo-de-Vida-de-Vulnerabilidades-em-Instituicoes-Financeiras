using DTOs;
using Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Utils;

namespace Controllers
{
  [ApiController]
  [Route("api/[controller]")]
  public class UserController : ControllerBase
  {
    private readonly IUserService _userService;

    public UserController(IUserService userService)
    {
      _userService = userService;
    }

    [HttpGet("get-user/{id}")]
    public async Task<IActionResult> Get(int id)
    {
       try
      {
        GetUserDTO userSearched = await _userService.Get(User, id);

        return CustomResults.Success(userSearched);
      }
      catch (Exception error)
      {
        return CustomResults.BadRequest(error.Message);
      }
    }

    [HttpPost("create-user")]
    public async Task<IActionResult> Create([FromBody] CreateUserDTO dto)
    {
      try
      {
        ResponseUserDTO newUser = await _userService.CreateAsync(dto, User);
        return CustomResults.Created(newUser, newUser.Id, "user", "New user has been created.");
      }
      catch (Exception error)
      {
        return CustomResults.BadRequest(error.Message);
      }
    }

    [HttpPut("update-user/{id}")]
    public async Task<IActionResult> Update([FromBody] UpdateUserDTO dto, int id)
    {
      try
      {
        UpdateUserDTO updatedUser = await _userService.Put(User, dto, id);
        return CustomResults.Success("User has been updated.");
      }
      catch (Exception error)
      {
        return CustomResults.BadRequest(error.Message);
      }
    }

    [HttpPost("login")]
    [AllowAnonymous]
    public async Task<IActionResult> Login([FromBody] LoginDTO dto)
    {
      try
      {
        ResponseUserDTO user = await _userService.LoginUser(dto, HttpContext);

        return CustomResults.Success(user);
      } catch (Exception error)
      {
        return CustomResults.BadRequest(error.Message);
      }
    }

    [HttpGet]
    [HttpGet("get-all")]
    public async Task<IActionResult> GetAll()
    {
      try
      {
        var users = await _userService.GetAll(User);
        return CustomResults.Success(users);
      }
      catch (Exception error)
      {
        return CustomResults.BadRequest(error.Message);
      }
    }

    [HttpGet("logged-user")]
    public async Task<IActionResult> GetUserLogged()
    {
      try
      {
        var user = await _userService.GetUserLogged(User);
        return CustomResults.Success(user);
      }
      catch (Exception error)
      {
        return CustomResults.BadRequest(error.Message);
      }
    }

    [HttpPost("logout")]
    public async Task<IActionResult> Logout()
    {
      try
      {
        await _userService.LogoutAsync(HttpContext);
        return CustomResults.Success(true, "Logout realizado com sucesso.");
      }
      catch (Exception error)
      {
        return CustomResults.BadRequest(error.Message);
      }
    }

    [HttpDelete("{id}")]
    [Authorize(policy: "AdminOnly")]
    public async Task<IActionResult> Delete(int id)
    {
      try
      {
        await _userService.DeleteAsync(User, id);
        return CustomResults.Success(true, "Usuário removido com sucesso.");
      }
      catch (Exception error)
      {
        return CustomResults.BadRequest(error.Message);
      }
    }
  }
}
