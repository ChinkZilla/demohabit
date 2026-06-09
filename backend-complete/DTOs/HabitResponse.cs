using backend.Database;

namespace backend.DTOs;

/// <summary>
/// DTO for the <see cref="Habit"/> class.
/// </summary>
public class HabitResponse
{
	/// <summary>
	/// Int primary key used to identify this habit.
	/// </summary>
	public required int Id { get; init; }
	
	/// <summary>
	/// User-facing name of habit.
	/// </summary>
	public required string Name { get; init; }
	/// <summary>
	/// User-facing description of habit.
	/// </summary>
	public required string Description { get; init; }
	/// <summary>
	/// ID of user-facing icon that represents this habit.
	/// </summary>
	public required string IconId { get; init; }
	/// <summary>
	/// Every day of the week this habit is active (and should be logged) on.
	/// </summary>
	public required List<DayOfWeek> ActiveDays { get; init; }
}