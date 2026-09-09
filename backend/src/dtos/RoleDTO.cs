using System.ComponentModel.DataAnnotations;

namespace DTOs
{
  public record GetRoleDTO(int id, string Name, int AccessLevel);
  public record ResponseRoleDTO(int Id, string Name, int AccessLevel);
  public record CreateRoleDTO([Required] string Name, [Required] int AccessLevel);

  public record UpdateRoleDTO([Required] string Name, [Required] int AccessLevel);
}