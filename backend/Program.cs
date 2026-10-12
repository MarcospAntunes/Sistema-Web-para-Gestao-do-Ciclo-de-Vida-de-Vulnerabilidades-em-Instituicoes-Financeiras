using Data;
using DotNetEnv;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.EntityFrameworkCore;
using Interfaces;
using Services;

Env.Load();

WebApplicationBuilder Builder = WebApplication.CreateBuilder(args);

string? dbPassword = Environment.GetEnvironmentVariable("DB_PASSWORD");
string? dbServer = Environment.GetEnvironmentVariable("DB_SERVER") ?? "localhost";
string? dbPort = Environment.GetEnvironmentVariable("DB_PORT") ?? "3306";
string? dbName = Environment.GetEnvironmentVariable("DB_NAME");
string? dbUser = Environment.GetEnvironmentVariable("DB_USER") ?? "root";

string connectionString = $"Server={dbServer};Port={dbPort};Database={dbName};User={dbUser};Password={dbPassword};";

Builder.Services.AddDbContext<VulnTrackerDbContext>(options =>
  options.UseMySql(
    connectionString,
    ServerVersion.AutoDetect(connectionString),
    mysqlOptions => mysqlOptions.EnableRetryOnFailure()
  )
);

Builder.Services.AddScoped<IUserService, UserService>();
Builder.Services.AddScoped<IVulnerabilityService, VulnerabilityService>();
Builder.Services.AddScoped<IRoleService, RoleService>();

Builder.Services
  .AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
  .AddCookie(options =>
{
  options.Cookie.Name = "access";
  options.Events.OnRedirectToLogin = context =>
  {
    context.Response.StatusCode = 401;
    return Task.CompletedTask;
  };
  options.ExpireTimeSpan = TimeSpan.FromHours(2);
  options.Cookie.HttpOnly = true;
  options.Cookie.SameSite = SameSiteMode.Strict;
  options.Cookie.SecurePolicy = Builder.Environment.IsDevelopment()
    ? CookieSecurePolicy.SameAsRequest
    : CookieSecurePolicy.Always;
});

Builder.Services.AddAuthorization(options =>
{
  options.AddPolicy("AdminOnly", policy =>
      policy.RequireAssertion(context =>
      {
        var accessLevelClaim = context.User.FindFirst("AccessLevel")?.Value;

        if (int.TryParse(accessLevelClaim, out int level))
        {
          return level >= 3;
        }

        return false;
      }));
});

Builder.Services.AddEndpointsApiExplorer();
Builder.Services.AddSwaggerGen();

Builder.Services.AddCors(options =>
{
  options.AddPolicy("myAllowSpecificOrigins", policy =>
  {
    policy.WithOrigins("http://localhost:3000").AllowAnyHeader().AllowAnyMethod().AllowCredentials();
  });
});

Builder.Services.AddControllers();
Builder.WebHost.UseUrls("http://0.0.0.0:8080");

WebApplication App = Builder.Build();

using (var scope = App.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    try
    {
        var context = services.GetRequiredService<VulnTrackerDbContext>();
        context.Database.EnsureCreated();
    }
    catch (Exception ex)
    {
        var logger = services.GetRequiredService<ILogger<Program>>();
        logger.LogError(ex, "An error occurred creating the DB.");
    }
}

App.UseExceptionHandler("/error");
App.UseCors("myAllowSpecificOrigins");
App.UseRouting();
App.UseAuthentication();
App.UseAuthorization();

if (App.Environment.IsDevelopment())
{
  App.UseSwagger();
  App.UseSwaggerUI(c =>
  {
    c.SwaggerEndpoint("./v1/swagger.json", "SuInvest API v1");
    c.RoutePrefix = "swagger";
  });
}

App.MapControllers();
App.Run();