using Microsoft.EntityFrameworkCore;
using Models;

namespace Data
{
  public class VulnTrackerDbContext : DbContext
  {
    public VulnTrackerDbContext(DbContextOptions<VulnTrackerDbContext> options) : base(options) { }
    public DbSet<User> Users { get; set; }
    public DbSet<Vulnerability> Vulnerabilities { get; set; }
    public DbSet<Role> Roles { get; set; }
  }
}