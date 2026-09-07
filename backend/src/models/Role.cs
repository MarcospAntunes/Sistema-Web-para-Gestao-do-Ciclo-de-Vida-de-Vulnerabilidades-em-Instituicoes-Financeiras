using System.ComponentModel.DataAnnotations;

namespace Models
{
  public class Role
  {

    public Role()
    {
      Name = null!;
    }

    [Key] public int Id { get; private set; }
    [Required] public string Name { get; set; }
    [Required] public int AccessLevel { get; set; }
  }
}