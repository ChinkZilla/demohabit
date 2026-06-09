using backend;
using backend.Services;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// ── CORS ────────────────────────────────────────────────────────────────────
// Allows any origin so the Vercel frontend can reach this backend.
// Scoped down to specific origins for production.
builder.Services.AddCors(opts => opts.AddDefaultPolicy(policy =>
    policy
        .SetIsOriginAllowed(_ => true)   // allow Vercel + localhost
        .AllowAnyMethod()
        .AllowAnyHeader()
        .AllowCredentials()
));

// ── Database (EF Core in-memory) ─────────────────────────────────────────────
// No PostgreSQL needed for the demo — all data lives in memory.
// Swap UseInMemoryDatabase for UseNpgsql(...) when going to production.
builder.Services.AddDbContext<HabitDbContext>(opts =>
    opts.UseInMemoryDatabase("HabitTrackerDemo"));

// ── Services ─────────────────────────────────────────────────────────────────
builder.Services.AddScoped<IHabitService, HabitService>();

// ── Controllers + OpenAPI ────────────────────────────────────────────────────
builder.Services.AddControllers();
builder.Services.AddOpenApi();

var app = builder.Build();

// Seed the in-memory database (runs HasData from HabitDbContext.OnModelCreating)
using (var scope = app.Services.CreateScope())
{
    scope.ServiceProvider.GetRequiredService<HabitDbContext>().Database.EnsureCreated();
}

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseCors();
app.UseHttpsRedirection();
app.MapControllers();
app.Run();
