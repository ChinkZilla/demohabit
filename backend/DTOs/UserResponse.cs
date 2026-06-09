using backend.Database;

namespace backend.DTOs;

/// <summary>
/// DTO for a <see cref="User"/>.
/// </summary>
public record UserResponse
{
	/// <summary>
	/// ID of the <see cref="User"/>.
	/// </summary>
	public required int Id { get; init; }
	/// <summary>
	/// The user's associated email.
	/// </summary>
	public required string Email { get; init; }

	/// <summary>
	/// Link to get the logins for the current user. Implemented a bit ugly as of now by RESTful standards.
	/// </summary>
	public string LoginsLink => "/api/user/logins";
}