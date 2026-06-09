using System.ComponentModel.DataAnnotations;

namespace backend.DTOs;

/// <summary>
/// Queries used in the HTTP endpoints to retrieve a habit's logs.
/// </summary>
public record HabitLogRangeQuery
{
	// Beginning of optional date range to look for logs within. 
	public DateOnly? From { get; init; }
	// End of optional date range.
	public DateOnly? To { get; init; }
	
	[Range(1, int.MaxValue)]
	public int Page { get; init; } = 1;
	[Range(1, 365)]
	public int PageSize { get; init; } = 20;
	
}