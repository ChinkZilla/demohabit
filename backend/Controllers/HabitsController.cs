using backend.Database;
using backend.DTOs;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class HabitsController : ControllerBase
{

	/// <summary>
	/// Get a paginated list  of all habits belonging to the requesting user.
	/// </summary>
	/// <returns><see cref="PaginatedResponse{T}"/> of <see cref="HabitResponse"/>s.</returns>
	[HttpGet]
	public async Task<ActionResult<PaginatedResponse<HabitResponse>>> GetHabitsAsync()
	{
		return Ok();
	}

	/// <summary>
	/// Create a new Habit based on the body <see cref="HabitRequest"/>.
	/// </summary>
	/// <param name="habitRequest">Specifications on how to create the new habit, placed in request body.</param>
	/// <returns>Standard HTTP response. On success, a 201 redirect to the new habit via
	/// a <see cref="CreatedAtActionResult"/>.</returns>
	[HttpPost]
	public async Task<ActionResult> CreateHabitAsync([FromBody] HabitRequest habitRequest)
	{
		return Ok();
	}
	
	/// <summary>
	/// Return the habit of the given ID. Request user must own habit.
	/// </summary>
	/// <param name="habitId">ID of habit to retrieve.</param>
	/// <returns>A <see cref="HabitResponse"/> corresponding to the habit of the given ID, if any exists.</returns>
	[HttpGet("{habitId}")]
	public async Task<ActionResult<HabitResponse>> GetHabitAsync(int habitId)
	{
		return Ok();
	}


	/// <summary>
	/// Get paginated logs across multiple days for a habit. Request user must own habit.
	/// </summary>
	/// <param name="habitId">Habit to retrieve logs for.</param>
	/// <param name="query"><see cref="HabitLogRangeQuery"/> specifying the parameters of the request (pagination,
	/// date range) in the HTTP request query.</param>
	/// <returns><see cref="PaginatedResponse{T}"/> list of <see cref="LogResponse"/>s corresponding to the
	/// date range and habit.</returns>
	[HttpGet("{habitId:int}/logs")]
	public async Task<ActionResult<PaginatedResponse<LogResponse>>> GetHabitLogRangeAsync(int habitId, 
		[FromQuery] HabitLogRangeQuery query)
	{
		return Ok();
	}
	
	/// <summary>
	/// Get the log entry for a habit on a given day. Request user must own habit.
	/// </summary>
	/// <param name="habitId">ID of relevant habit.</param>
	/// <param name="date">Date to get the log entry for.</param>
	/// <returns>A <see cref="LogResponse"/> corresponding to the date + habit. Null if the habit was not logged for
	/// that day.</returns>
	[HttpGet("{habitId:int}/logs/{date}")]
	public async Task<ActionResult<LogResponse>> GetHabitLogAsync(int habitId, DateOnly date)
	{
		return Ok();
	}
	
	/// <summary>
	/// Log a habit for a given day. Request user must own habit.
	/// </summary>
	/// <param name="habitId">Habit ID to log.</param>
	/// <param name="date">Date to log.</param>
	/// <returns>Standard HTTP response. 201 to created log if successful.</returns>
	[HttpPut("{habitId:int}/logs/{date}")]
	public async Task<ActionResult> PutHabitLogAsync(int habitId, DateOnly date)
	{
		return Ok();
	}

	/// <summary>
	/// Delete a specific day's log for a habit. Request user must own habit.
	/// </summary>
	/// <param name="habitId">ID of habit that owns the relevant log.</param>
	/// <param name="date">Date of the log to delete.</param>
	/// <returns>Standard HTTP response.</returns>
	[HttpDelete("{habitId:int}/logs/{date}")]
	public async Task<ActionResult> DeleteHabitLogAsync(int habitId, DateOnly date)
	{
		return Ok();
	}
}