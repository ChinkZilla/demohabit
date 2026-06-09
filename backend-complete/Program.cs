using backend;
using backend.Services;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// ── CORS ─────────────────────────────────────────────────────────────────────
builder.Services.AddCors(opts => opts.AddDefaultPolicy(policy =>
    policy
        .SetIsOriginAllowed(_ => true)
        .AllowAnyMethod()
        .AllowAnyHeader()
        .AllowCredentials()
));

// ── Database (EF Core in-memory) ─────────────────────────────────────────────
builder.Services.AddDbContext<HabitDbContext>(opts =>
    opts.UseInMemoryDatabase("HabitTrackerDemo"));

// ── Services ─────────────────────────────────────────────────────────────────
builder.Services.AddScoped<IHabitService, HabitService>();

// ── Controllers + OpenAPI ────────────────────────────────────────────────────
builder.Services.AddControllers();
builder.Services.AddOpenApi();

var app = builder.Build();

// Seed the in-memory database
using (var scope = app.Services.CreateScope())
{
    scope.ServiceProvider.GetRequiredService<HabitDbContext>().Database.EnsureCreated();
}

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

// NOTE: No UseHttpsRedirection — Railway handles TLS at the edge.
app.UseCors();
app.MapControllers();
app.Run();
