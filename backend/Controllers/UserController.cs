using backend.Database;
using backend.DTOs;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

// /id/logins GET, POST
// /id/ GET (get current request user)

[ApiController]
[Route("api/[controller]")]
public class UserController : ControllerBase
{

    /// <summary>
    /// Get the user of the session indicated by the signed auth cookie included with the request.
    /// </summary>
    /// <returns><see cref="UserResponse"/> corresponding to current user if the requesting client is attached
    /// to one.</returns>
    [HttpGet]
    public async Task<ActionResult<UserResponse>> GetCurrentUserAsync()
    {
        return Ok();
    }

    /// <summary>
    /// Set the current request's user's email.
    /// </summary>
    /// <param name="email">Email to set the user's email to. Specified in request body.</param>
    /// <returns>Standard HTTP response, pointing at user if successful.</returns>
    [HttpPut("email")]
    public async Task<ActionResult> SetUserEmailAsync([FromBody] string email)
    {
        return Ok();
    }

    /// <summary>
    /// Permanently and fully delete the request's current attached user.
    /// </summary>
    /// <returns>Standard HTTP response.</returns>
    [HttpDelete]
    public async Task<ActionResult> DeleteUserAsync()
    {
        return Ok();
    }

    
    /// <summary>
    /// Begin the OAuth login process. 
    /// </summary>
    /// <returns>Standard HTTP response redirecting to OAuth provider, with correlation cookie holding state and PKCE
    /// for use in the rest of the login process.</returns>
    [HttpGet("login")]
    public async Task<ActionResult> LoginAsync()
    {
        return Ok();
    }

    /// <summary>
    /// Handle the callback step of the OAuth process. OAuth provider (the user is sent to this via /login) redirects
    /// here. Validates correlation cookie. Create a new user if none exists for this OAuth flow. 
    /// Issues signed auth cookie to identify user session.
    /// </summary>
    /// <returns>Standard HTTP response, with signed auth cookie for session.</returns>
    [HttpGet("login/callback")]
    public async Task<ActionResult> LoginCallbackAsync()
    {
        return Ok();
    }

    /// <summary>
    /// Log out of the current user account.
    /// </summary>
    /// <returns>Standard HTTP response.</returns>
    [HttpPost("logout")]
    public async Task<ActionResult> LogoutAsync()
    {
        return Ok();
    }
    
}