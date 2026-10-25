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
    public DbSet<VulnerabilityHistory> VulnerabilityHistories { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
      base.OnModelCreating(modelBuilder);

      modelBuilder.Entity<User>()
        .HasOne(u => u.Role)
        .WithMany()
        .HasForeignKey(u => u.RoleId)
        .OnDelete(DeleteBehavior.Restrict);

      modelBuilder.Entity<User>()
        .HasIndex(u => u.Email)
        .IsUnique();

      // Vulnerability tem dois FKs para User — precisa definir explicitamente
      modelBuilder.Entity<Vulnerability>()
        .HasOne(v => v.CreatedByUser)
        .WithMany()
        .HasForeignKey(v => v.CreatedByUserId)
        .OnDelete(DeleteBehavior.Restrict);

      modelBuilder.Entity<Vulnerability>()
        .HasOne(v => v.AssignedUser)
        .WithMany()
        .HasForeignKey(v => v.AssignedUserId)
        .OnDelete(DeleteBehavior.Restrict);

      // Índices usados pelos filtros da listagem, pelo stats e pelos relatórios de SLA
      modelBuilder.Entity<Vulnerability>().HasIndex(v => v.Status);
      modelBuilder.Entity<Vulnerability>().HasIndex(v => v.Severity);
      modelBuilder.Entity<Vulnerability>().HasIndex(v => v.DueDate);
      modelBuilder.Entity<Vulnerability>().HasIndex(v => v.Cve);

      // VulnerabilityHistory
      modelBuilder.Entity<VulnerabilityHistory>()
        .HasOne(h => h.Vulnerability)
        .WithMany()
        .HasForeignKey(h => h.VulnerabilityId)
        .OnDelete(DeleteBehavior.Cascade);

      modelBuilder.Entity<VulnerabilityHistory>()
        .HasOne(h => h.User)
        .WithMany()
        .HasForeignKey(h => h.UserId)
        .OnDelete(DeleteBehavior.Restrict);

      modelBuilder.Entity<VulnerabilityHistory>()
        .HasIndex(h => new { h.VulnerabilityId, h.CreatedAt });
    }
  }
}