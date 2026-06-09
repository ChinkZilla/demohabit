namespace backend.DTOs;

/// <summary>
/// DTO used to create/update habits from the client to the server.
/// Fields left null in update requests are unchanged in the updated habit.
/// </summary>
public class HabitRequest
{
	/// <summary>
	/// User-facing name of habit.
	/// </summary>
	public string? Name { get; set; }
	/// <summary>
	/// User-facing description of habit.
	/// </summary>
	public string? Description { get; set; }
	/// <summary>
	/// ID of user-facing icon that represents this habit.
	/// </summary>
	public string? IconId { get; set; }
	/// <summary>
	/// Every day of the week this habit is active (and should be logged) on.
	/// </summary>
	public List<DayOfWeek>? ActiveDays { get; set; }
}