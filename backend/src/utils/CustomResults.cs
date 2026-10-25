using Microsoft.AspNetCore.Mvc;
using Wrappers;

namespace Utils
{
  public static class CustomResults
  {
    public static IActionResult Success<T>(T data, string message = "")
    {
      return new OkObjectResult(new ApiResponse<T>(true, data, message));
    }

    public static IActionResult Created<T>(T data, int id, string route, string message = "")
    {
      return new CreatedResult($"{route}/{id}", new ApiResponse<T>(true, data, message));
    }

    public static IActionResult BadRequest(string message)
    {
      return new BadRequestObjectResult(new ApiResponse<object>(false, null, message));
    }

    public static IActionResult NotFound(string message)
    {
      return new NotFoundObjectResult(new ApiResponse<object>(false, null, message));
    }

    // 401 Unauthorized
    public static IActionResult Unauthorized(string message)
    {
      return new ObjectResult(new ApiResponse<object>(false, null, message))
      {
        StatusCode = 401
      };
    }

    public static IActionResult Forbidden(string message)
    {
      return new ObjectResult(new ApiResponse<object>(false, null, message))
      {
        StatusCode = 403
      };
    }

    public static IActionResult Conflict(string message)
    {
      return new ConflictObjectResult(new ApiResponse<object>(false, null, message));
    }
  }
}