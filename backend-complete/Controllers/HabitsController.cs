using backend.DTOs;
using backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class HabitsController : ControllerBase
{
    private readonly IHabitService _habits;

    // TODO: replace with real user ID from auth middleware once OAuth is implemented.
    private const int DevUserId = 1;

    public HabitsController(IHabitService habits)
    {
        _habits = habits;
    }

    // GET /api/Habits — list all habits for current user
    [HttpGet]
    public async Task<ActionResult<PaginatedResponse<HabitResponse>>> GetHabitsAsync()
    {
        var habits = await _habits.GetAllHabitsForUserAsync(DevUserId);
        var items  = habits.Select(h => new HabitResponse
        {
            Id          = h.Id,
            Name        = h.Name,
            Description = h.Description,
            IconId      = h.IconId,
            ActiveDays  = h.ActiveDays,
        }).ToList();

        return Ok(new PaginatedResponse<HabitResponse>(items, 1, items.Count, items.Count));
    }

    // POST /api/Habits — create a new habit
    [HttpPost]
    public async Task<ActionResult> CreateHabitAsync([FromBody] HabitRequest req)
    {
        if (string.IsNullOrWhiteSpace(req.Name))
            return BadRequest("Name is required.");

        var habit = await _habits.AddHabitAsync(
            DevUserId,
            req.Name!,
            req.Description ?? "",
            req.IconId      ?? "⭐",
            req.ActiveDays  ?? new List<DayOfWeek>()
        );

        return CreatedAtAction(nameof(GetHabitAsync), new { habitId = habit.Id },
            new HabitResponse
            {
                Id          = habit.Id,
                Name        = habit.Name,
                Description = habit.Description,
                IconId      = habit.IconId,
                ActiveDays  = habit.ActiveDays,
            });
    }

    // GET /api/Habits/{habitId} — get a single habit
    [HttpGet("{habitId:int}")]
    public async Task<ActionResult<HabitResponse>> GetHabitAsync(int habitId)
    {
        try
        {
            var h = await _habits.GetHabitAsync(habitId);
            return Ok(new HabitResponse
            {
                Id          = h.Id,
                Name        = h.Name,
                Description = h.Description,
                IconId      = h.IconId,
                ActiveDays  = h.ActiveDays,
            });
        }
        catch (KeyNotFoundException) { return NotFound(); }
    }

    // GET /api/Habits/{habitId}/logs — get logs in a date range
    [HttpGet("{habitId:int}/logs")]
    public async Task<ActionResult<PaginatedResponse<LogResponse>>> GetHabitLogRangeAsync(
        int habitId, [FromQuery] HabitLogRangeQuery query)
    {
        var from = query.From ?? DateOnly.FromDateTime(DateTime.Today.AddDays(-30));
        var to   = query.To   ?? DateOnly.FromDateTime(DateTime.Today);

        var logs  = await _habits.GetHabitLogsAsync(habitId, from, to);
        var items = logs.Select(l => new LogResponse { HabitId = l.HabitId, Date = l.Date }).ToList();

        return Ok(new PaginatedResponse<LogResponse>(items, 1, items.Count, items.Count));
    }

    // GET /api/Habits/{habitId}/logs/{date} — get log for a specific date
    [HttpGet("{habitId:int}/logs/{date}")]
    public async Task<ActionResult<LogResponse>> GetHabitLogAsync(int habitId, DateOnly date)
    {
        var log = await _habits.GetHabitLogForDateAsync(habitId, date);
        if (log is null) return NotFound();
        return Ok(new LogResponse { HabitId = log.HabitId, Date = log.Date });
    }

    // PUT /api/Habits/{habitId}/logs/{date} — log a habit
    [HttpPut("{habitId:int}/logs/{date}")]
    public async Task<ActionResult> PutHabitLogAsync(int habitId, DateOnly date)
    {
        await _habits.LogHabitAsync(habitId, date);
        return Ok();
    }

    // DELETE /api/Habits/{habitId}/logs/{date} — un-log a habit (ISS-05)
    [HttpDelete("{habitId:int}/logs/{date}")]
    public async Task<ActionResult> DeleteHabitLogAsync(int habitId, DateOnly date)
    {
        await _habits.UnlogHabitAsync(habitId, date);
        return Ok();
    }
}
