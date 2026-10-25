using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Net.Mail;
using System.Text.RegularExpressions;

namespace Models
{

  public class User
  {
    // Regra de senha (mantenha igual à de frontend/src/hooks/useAuthForm.ts):
    // 8 a 64 caracteres, com maiúscula, minúscula, número e caractere especial.
    private const string PasswordPattern = @"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,64}$";

    public User()
    {
      Name = null!;
      Email = null!;
      PasswordHash = null!;
    }

    [Key] public int Id { get; private set; }
    [Required]
    [StringLength(255, MinimumLength = 3, ErrorMessage = "Your name must be between 3 and 100 characters long."),]
    public required string Name { get; set; }
    [Required]
    [EmailAddress(ErrorMessage = "Make sure you fill in the email address correctly.")]
    public string Email { get; private set; }
    [Required] public string PasswordHash { get; private set; }

    [ForeignKey(nameof(Role))] public int RoleId { get; set; }
    public virtual Role Role { get; private set; } = null!;

    // Retorna false (sem alterar o hash) se a senha não atender à regra.
    // Quem chama DEVE checar o retorno.
    public bool SetPassword(string Password)
    {
      if (!Regex.IsMatch(Password, PasswordPattern))
        return false;

      PasswordHash = BCrypt.Net.BCrypt.HashPassword(Password, workFactor: 12);
      return true;
    }

    public bool VerifyPassword(string Password)
    {
      return BCrypt.Net.BCrypt.Verify(Password, PasswordHash);
    }
    public bool SetEmail(string Email)
    {
      try
      {
        new MailAddress(Email);
        this.Email = Email;

        return true;
      }
      catch { return false; }
    }
  }
}