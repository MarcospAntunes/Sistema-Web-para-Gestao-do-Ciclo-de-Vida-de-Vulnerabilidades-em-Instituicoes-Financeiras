using System.ComponentModel.DataAnnotations;
using Enums;
using Models;

namespace DTOs
{
  public record CreateUserDTO
  (
    [Required]
    [StringLength(255, MinimumLength = 3, ErrorMessage = "Your name must be between 3 and 100 characters long."),]
    string Name,
    [Required]
    [EmailAddress(ErrorMessage = "Make sure you fill in the email address correctly.")]
    string Email,
    [Required] string Password
  );

  public record ResponseUserDTO
  (
    int Id,
    string Name,
    string Email,
    int RoleId
  );

  public record GetUserDTO
  (
    int Id,
    string Name,
    string Email
  );

  public record UpdateUserDTO
  (
    [Required]
    [StringLength(255, MinimumLength = 3, ErrorMessage = "Your name must be between 3 and 100 characters long."),]
    string Name,
    [Required]
    [EmailAddress(ErrorMessage = "Make sure you fill in the email address correctly.")]
    string Email,
    [Required] string Password
  );

  public record LoginDTO(
    [Required]
    [EmailAddress(ErrorMessage = "Make sure you fill in the email address correctly.")]
    string Email,
    [Required] string Password
  );
}