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

    [HttpGet("logged-user")]
    public async Task<IActionResult> GetUserLogged()
    {
     var user = await _userService.GetUserLogged(User);

      return CustomResults.Success(user);
    }
  }
}
