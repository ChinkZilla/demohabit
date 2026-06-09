namespace backend.Database;

/// <summary>
/// DB model class for the logins table. Represents a single OAuth2 login for some user.
/// </summary>
public class Login
{
    /// <summary>
    /// Identifier for the OAuth2 provider of this login.
    /// </summary>
    public string Provider { get; set; }
    /// <summary>
    /// Identifier for this login with its provider.
    /// </summary>
    public string SubjectId  { get; set; }
    /// <summary>
    /// FK to the User this login is for.
    /// </summary>
    public string UserId { get; set; }
}