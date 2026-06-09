namespace backend.Database;

/// <summary>
/// DB model class for the habits table.
/// </summary>
public class Habit
{
    public int    Id     { get; set; }
    public int    UserId { get; set; }

    public User?  User   { get; set; }   // nullable — navigation property

    public required string          Name        { get; set; }
    public required string          Description { get; set; }
    public required string          IconId      { get; set; }
    public required List<DayOfWeek> ActiveDays  { get; set; }
}
