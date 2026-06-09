using backend.Database;
using Microsoft.EntityFrameworkCore;

namespace backend.Services;

public class HabitService : IHabitService
{
    private readonly HabitDbContext _db;
    private int _nextHabitId = 4; // starts above seeded data

    public HabitService(HabitDbContext db)
    {
        _db = db;
    }

    public async Task<List<Habit>> GetAllHabitsForUserAsync(int userId)
    {
        return await _db.Habits
            .Where(h => h.UserId == userId)
            .ToListAsync();
    }

    public async Task<Habit> GetHabitAsync(int habitId)
    {
        var habit = await _db.Habits.FindAsync(habitId);
        if (habit is null) throw new KeyNotFoundException($"Habit {habitId} not found.");
        return habit;
    }

    public async Task<List<LogEntry>> GetHabitLogsAsync(int habitId, DateOnly from, DateOnly to)
    {
        return await _db.LogEntries
            .Where(l => l.HabitId == habitId && l.Date >= from && l.Date <= to)
            .ToListAsync();
    }

    public async Task<LogEntry?> GetHabitLogForDateAsync(int habitId, DateOnly date)
    {
        return await _db.LogEntries
            .FirstOrDefaultAsync(l => l.HabitId == habitId && l.Date == date);
    }

    public async Task<Habit> AddHabitAsync(int userId, string name, string description,
        string iconId, List<DayOfWeek> activeDays)
    {
        var habit = new Habit
        {
            Id         = _nextHabitId++,
            UserId     = userId,
            Name       = name,
            Description = description,
            IconId     = iconId,
            ActiveDays = activeDays,
        };
        _db.Habits.Add(habit);
        await _db.SaveChangesAsync();
        return habit;
    }

    public async Task LogHabitAsync(int habitId, DateOnly date)
    {
        var exists = await _db.LogEntries
            .AnyAsync(l => l.HabitId == habitId && l.Date == date);
        if (exists) return; // already logged — idempotent

        _db.LogEntries.Add(new LogEntry { HabitId = habitId, Date = date });
        await _db.SaveChangesAsync();
    }

    public async Task UnlogHabitAsync(int habitId, DateOnly date)
    {
        var entry = await _db.LogEntries
            .FirstOrDefaultAsync(l => l.HabitId == habitId && l.Date == date);
        if (entry is null) return; // not logged — idempotent

        _db.LogEntries.Remove(entry);
        await _db.SaveChangesAsync();
    }
}
