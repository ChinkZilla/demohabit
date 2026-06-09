using backend.Database;
using backend.DTOs;

namespace backend.Services;

public interface IHabitService
{
    
    /// <summary>
    /// Retrieve the <see cref="Habit"/> of the given ID.
    /// </summary>
    /// <param name="habitId">The int ID of the habit to retrieve.</param>
    /// <returns>The <see cref="Habit"/> with the specified ID.</returns>
    /// <exception cref="KeyNotFoundException">No habit exists with the given habit ID.</exception>
    public Task<Habit> GetHabitAsync(int habitId);
    
    /// <summary>
    /// Retrieve the log entries for a given habit within a date range.
    /// </summary>
    /// <param name="habitId">ID of habit to retrieve the log of.</param>
    /// <param name="date">Date to look for log entry within.</param>
    /// <returns></returns>
    public Task<List<LogEntry>> GetHabitLogAsync(int habitId, DateOnly startDate, DateOnly endDate);

    /// <summary>
    /// Get all habits belonging to the given user, optionally filtered by only habits active on certin days
    /// of the week. Just returns the ID and active days of each habit.
    /// </summary>
    /// <param name="userId">ID of user whose habits to retrieve.</param>
    /// <param name="activeDays">Optional. If specified, only habits with active days matching at least
    /// one element in this collection are returned.</param>
    /// <returns><c>IEnumerable</c> containing every <c>Habit</c> the user has, by ID and ActiveDays..</returns>
    /// <exception cref="KeyNotFoundException">No user exists with the given user ID.</exception>
    public Task<IEnumerable<(int Id, ISet<DayOfWeek> ActiveDays)>> GetUserHabitsAsync(int userId, HashSet<DayOfWeek>? activeDays);

    /// <summary>
    /// Create and add a new habit per the given arguments to a user.
    /// </summary>
    /// <param name="userId">ID of user to create a new habit for.</param>
    /// <param name="name">User-facing display name of habit.</param>
    /// <param name="description">User-facing description of habit.</param>
    /// <param name="iconId">ID of icon to use to represent this habit on GUIs.</param>
    /// <param name="activeDays">Set of all days of the week this habit is active on.</param>
    /// <returns>The created <c>Habit</c>.</returns>
    public Task<Habit> AddHabitAsync(
        int userId, string name, string description, int iconId, HashSet<DayOfWeek> activeDays);

    /// <summary>
    /// Modify properties of an existing habit. Any fields left null are unchanged.
    /// </summary>
    /// <param name="habitId">ID of habit to change.</param>
    /// <param name="name">New name of habit, if not null.</param>
    /// <param name="description">New description of habit, if not null.</param>
    /// <param name="iconId">New icon ID of habit, if not null.</param>
    /// <param name="activeDays">New active days of habit, if not null. Existing active days are replaced
    /// with the new set here.</param>
    /// <returns>The updated <c>Habit</c>.</returns>
    public Task<Habit> UpdateHabitAsync(int habitId, string? name, string? description, int? iconId, HashSet<DayOfWeek>? activeDays);
    
    /// <summary>
    /// Log the given date for the given habit.
    /// </summary>
    /// <remarks>Does not sanity check if the given habit has the given date as an active day, as habit
    /// active days can change.</remarks>
    /// <param name="habitId">ID of habit to log.</param>
    /// <param name="date">Date to log for the given habit.</param>
    public Task LogHabitAsync(int habitId, DateOnly date);
}