namespace backend.Database;

/// <summary>
/// Database model class for the users table. Represents a single user account.
/// </summary>
public class User
{
    /// <summary>
    /// Primary key to identify a user.
    /// </summary>
    public int Id;
    
    /// <summary>
    /// Email provided for the user account.
    /// </summary>
    public string? Email;
}