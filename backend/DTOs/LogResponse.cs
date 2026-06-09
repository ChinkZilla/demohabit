using backend.Database;

namespace backend.DTOs;

/// <summary>
/// DTO for a <see cref="LogEntry"/>.
/// </summary>
public record LogResponse
{
	/// <summary>
	/// The ID of the habit this log entry is for.
	/// </summary>
	public int HabitId { get; set; }
	/// <summary>
	/// The date this log was made. 
	/// </summary>
	public DateOnly Date { get; set; }
}