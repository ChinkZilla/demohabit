namespace backend.Database;

/// <summary>
/// Database model class for the users table.
/// </summary>
public class User
{
    public int     Id    { get; set; }
    public string? Email { get; set; }
}
