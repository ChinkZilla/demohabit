namespace backend.DTOs;

/// <summary>
/// Represents a paginated response of items. Self-explanatory.
/// </summary>
/// <param name="Items">Contents of this page.</param>
/// <param name="Page">Current page of the total this response reflects.</param>
/// <param name="PageSize">How many items per page.</param>
/// <param name="TotalCount">Total number of items across all pages.</param>
/// <typeparam name="T">The DTO response type being held in this page.</typeparam>
public record PaginatedResponse<T>(
	IEnumerable<T> Items,
	int Page,
	int PageSize,
	int TotalCount
)
{
	/// <summary>
	/// Maximum allowed page size for any paginated query.
	/// </summary>
	public const int MaxPageSize = 100;

	/// <summary>
	/// Clamp a requested page size to the allowed range [1, <see cref="MaxPageSize"/>].
	/// </summary>
	public static int ClampPageSize(int requested) => Math.Clamp(requested, 1, MaxPageSize);
}