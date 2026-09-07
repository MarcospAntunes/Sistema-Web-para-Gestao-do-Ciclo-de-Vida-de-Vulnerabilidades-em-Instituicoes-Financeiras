using Microsoft.AspNetCore.Mvc;
using Wrappers;

namespace Utils
{
  public static class CustomResults
  {
    // 200 OK
    public static IActionResult Success<T>(T data, string message = "")
    {
      return new OkObjectResult(new ApiResponse<T>(true, data, message));
    }

    // 201 Created
    public static IActionResult Created<T>(T data, int id, string route, string message = "")
    {
      return new CreatedResult($"{route}/{id}", new ApiResponse<T>(true, data, message));
    }

    // 400 Bad Request
    public static IActionResult BadRequest(string message)
    {
      return new BadRequestObjectResult(new ApiResponse<object>(false, null, message));
    }

    // 404 Not Found
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

    // 403 Forbidden
    public static IActionResult Forbidden(string message)
    {
      return new ObjectResult(new ApiResponse<object>(false, null, message))
      {
        StatusCode = 403
      };
    }

    // 409 Conflict
    public static IActionResult Conflict(string message)
    {
      return new ConflictObjectResult(new ApiResponse<object>(false, null, message));
    }
  }
}