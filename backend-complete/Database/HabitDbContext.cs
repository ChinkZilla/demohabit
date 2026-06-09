using backend.Database;
using Microsoft.EntityFrameworkCore;

namespace backend;

public class HabitDbContext : DbContext
{
    public DbSet<User>     Users      { get; set; } = null!;
    public DbSet<Habit>    Habits     { get; set; } = null!;
    public DbSet<LogEntry> LogEntries { get; set; } = null!;

    public HabitDbContext(DbContextOptions<HabitDbContext> options) : base(options) { }

    protected override void OnModelCreating(ModelBuilder mb)
    {
        // LogEntry has a composite primary key: (HabitId, Date)
        mb.Entity<LogEntry>().HasKey(l => new { l.HabitId, l.Date });

        // ── Demo seed data ──────────────────────────────────────────────────
        // Hardcoded dev user (id=1) and three starter habits so the demo
        // has something to show on first load. Remove for production.
        mb.Entity<User>().HasData(
            new User { Id = 1, Email = "demo@habittracker.app" }
        );

        mb.Entity<Habit>().HasData(
            new Habit
            {
                Id = 1, UserId = 1,
                Name = "Drink water", Description = "8 glasses a day", IconId = "💧",
                ActiveDays = new List<DayOfWeek>
                {
                    DayOfWeek.Monday, DayOfWeek.Tuesday, DayOfWeek.Wednesday,
                    DayOfWeek.Thursday, DayOfWeek.Friday, DayOfWeek.Saturday, DayOfWeek.Sunday
                }
            },
            new Habit
            {
                Id = 2, UserId = 1,
                Name = "Read 20 min", Description = "Before bed", IconId = "📚",
                ActiveDays = new List<DayOfWeek>
                {
                    DayOfWeek.Monday, DayOfWeek.Tuesday, DayOfWeek.Wednesday,
                    DayOfWeek.Thursday, DayOfWeek.Friday
                }
            },
            new Habit
            {
                Id = 3, UserId = 1,
                Name = "Morning run", Description = "2 miles", IconId = "🏃",
                ActiveDays = new List<DayOfWeek>
                {
                    DayOfWeek.Monday, DayOfWeek.Wednesday, DayOfWeek.Friday
                }
            }
        );
    }
}
