using backend.Database;

namespace backend.Services;

public interface IHabitService
{
    /// <summary>Get all habits belonging to a user.</summary>
    Task<List<Habit>> GetAllHabitsForUserAsync(int userId);

    /// <summary>Get a single habit by ID.</summary>
    /// <exception cref="KeyNotFoundException">No habit with that ID.</exception>
    Task<Habit> GetHabitAsync(int habitId);

    /// <summary>Get log entries for a habit within a date range.</summary>
    Task<List<LogEntry>> GetHabitLogsAsync(int habitId, DateOnly from, DateOnly to);

    /// <summary>Get the log for a habit on a specific date, or null if not logged.</summary>
    Task<LogEntry?> GetHabitLogForDateAsync(int habitId, DateOnly date);

    /// <summary>Create a new habit for a user.</summary>
    Task<Habit> AddHabitAsync(int userId, string name, string description, string iconId,
        List<DayOfWeek> activeDays);

    /// <summary>Log a habit for a given date.</summary>
    Task LogHabitAsync(int habitId, DateOnly date);

    /// <summary>Remove the log for a habit on a given date.</summary>
    Task UnlogHabitAsync(int habitId, DateOnly date);
}
