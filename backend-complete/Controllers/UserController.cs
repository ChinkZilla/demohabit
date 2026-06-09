using backend.DTOs;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UserController : ControllerBase
{
    // Hardcoded dev user — replaces OAuth for the demo.
    // TODO: swap for real auth middleware once OAuth is implemented.
    private static readonly UserResponse DevUser = new()
    {
        Id    = 1,
        Email = "demo@habittracker.app",
    };

    // GET /api/User — returns the current user
    [HttpGet]
    public ActionResult<UserResponse> GetCurrentUserAsync() => Ok(DevUser);

    // PUT /api/User/email — stub (not needed for demo)
    [HttpPut("email")]
    public ActionResult SetUserEmailAsync([FromBody] string email) => Ok();

    // DELETE /api/User — stub (not needed for demo)
    [HttpDelete]
    public ActionResult DeleteUserAsync() => Ok();

    // OAuth stubs — skipped for demo per team decision
    [HttpGet("login")]          public ActionResult LoginAsync()         => Ok();
    [HttpGet("login/callback")] public ActionResult LoginCallbackAsync() => Ok();
    [HttpPost("logout")]        public ActionResult LogoutAsync()        => Ok();
}
