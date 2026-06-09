namespace backend.Database;

/// <summary>
/// DB model class for the log_entries table. Represents a single logged day for some habit.
/// </summary>
public class LogEntry
{
    /// <summary>
    /// FK to the habit this log is for. Part of primary key.
    /// </summary>
    public int HabitId { get; set; }
    /// <summary>
    /// The date this log was made. Part of primary key.
    /// </summary>
    public DateOnly Date { get; set; }
    
}