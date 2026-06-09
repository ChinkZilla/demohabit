using backend.Database;

namespace backend.Services;

public interface IUserService
{
    /// <summary>
    /// Get the <c>User</c> of the given ID.
    /// </summary>
    /// <param name="userId">ID of user.</param>
    /// <returns>User object with given ID.</returns>
    public Task<User> GetUserAsync(int userId);

    /// <summary>
    /// <see cref="GetUserAsync(int)"/> But searches by subjectID instead of userId.
    /// </summary>
    /// <param name="subjectId">OAuth provider subject ID of user.</param>
    /// <returns>The matching <see cref="User"/>.</returns>
    public Task<User> GetUserAsync(string subjectId);
    
    
    /// <summary>
    /// Delete a user.
    /// </summary>
    /// <param name="userId">ID of user to delete.</param>
    /// <returns>Task representing async progress.</returns>
    public Task DeleteUserAsync(int userId);
    
    /// <summary>
    /// Update a user's email.
    /// </summary>
    /// <param name="userId">ID of user to update.</param>
    /// <param name="email">New email of user. If null, left unchanged.</param>
    /// <returns>Updated User object.</returns>
    public Task<User> SetUserEmailAsync(int userId, string? email);
}