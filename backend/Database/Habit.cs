namespace backend.Database;

/// <summary>
/// DB model class for the habits table. Represents a single habit of a user.
/// </summary>
public class Habit
{
    /// <summary>
    /// Int primary key used to identify this habit.
    /// </summary>
    public int Id { get; set; }
    
    /// <summary>
    /// Navigation property to the User who owns this habit.
    /// </summary>
    public User User { get; set; }
    /// <summary>
    /// FK to owning user, used for User nav property.
    /// </summary>
    public int UserId { get; set; }
    
    /// <summary>
    /// User-facing name of habit.
    /// </summary>
    public required string Name { get; set; }
    /// <summary>
    /// User-facing description of habit.
    /// </summary>
    public required string Description { get; set; }
    /// <summary>
    /// ID of user-facing icon that represents this habit.
    /// </summary>
    public required string IconId { get; set; }
    /// <summary>
    /// Every day of the week this habit is active (and should be logged) on.
    /// </summary>
    public required List<DayOfWeek> ActiveDays { get; set; }
    
}