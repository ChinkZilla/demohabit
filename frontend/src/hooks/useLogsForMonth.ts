import { useQuery, useQueries } from "@tanstack/react-query";
import { apiClient } from "../services/ApiClient";

// useLogsForMonth — feeds the Calendar view's fullyLogged and partial day sets.
// Wires to two Calvin endpoints:
//   GET /api/habits            (pending Calvin #28 — GetUserHabitsAsync)
//   GET /api/habits/{id}/logs  (scaffolded — GetHabitLogRangeAsync)
//
// Assumes Calvin serializes C# DayOfWeek as integers (0=Sun, 1=Mon … 6=Sat).
// That is the default .NET JSON serializer behavior.
//
// month is 0-indexed to match JS Date convention (January = 0).

type HabitSummary = { id: number; activeDays: number[] };
type LogEntry     = { date: string };

function pad(n: number) { return String(n).padStart(2, "0"); }
function isoDate(year: number, month: number, day: number) {
  return `${year}-${pad(month + 1)}-${pad(day)}`;
}

export function useLogsForMonth(userId: number, year: number, month: number) {
  const from = isoDate(year, month, 1);
  const to   = isoDate(year, month, new Date(year, month + 1, 0).getDate());

  // Step 1 — get all habits for this user (id + activeDays)
  const { data: habits = [], isLoading: habitsLoading } = useQuery<HabitSummary[]>({
    queryKey: ["habits", "user", userId],
    queryFn:  () => apiClient.getHabitsForUser(userId),
    enabled:  !!userId,
  });

  // Step 2 — fetch each habit's logs for the month in parallel
  const logQueries = useQueries({
    queries: habits.map(h => ({
      queryKey: ["habit-logs-month", h.id, year, month],
      queryFn:  () => apiClient.getHabitLogsRange(h.id, from, to),
      enabled:  habits.length > 0,
    })),
  });

  const isLoading = habitsLoading || logQueries.some(q => q.isLoading);

  const fullyLogged = new Set<string>();
  const partial     = new Set<string>();

  if (!isLoading && habits.length > 0) {
    const totalDays = new Date(year, month + 1, 0).getDate();

    // Build date → Set<habitId> map from all log results
    const loggedByDate = new Map<string, Set<number>>();
    logQueries.forEach((q, i) => {
      const habitId = habits[i].id;
      const logs    = (q.data ?? []) as LogEntry[];
      logs.forEach(({ date }) => {
        if (!loggedByDate.has(date)) loggedByDate.set(date, new Set());
        loggedByDate.get(date)!.add(habitId);
      });
    });

    // Classify each calendar day
    for (let d = 1; d <= totalDays; d++) {
      const iso       = isoDate(year, month, d);
      const dayOfWeek = new Date(`${iso}T00:00:00`).getDay(); // 0=Sun … 6=Sat

      const activeToday = habits.filter(h => h.activeDays.includes(dayOfWeek));
      if (activeToday.length === 0) continue;

      const loggedOnDay = loggedByDate.get(iso) ?? new Set<number>();
      const loggedCount = activeToday.filter(h => loggedOnDay.has(h.id)).length;

      if (loggedCount === activeToday.length) fullyLogged.add(iso);
      else if (loggedCount > 0)               partial.add(iso);
    }
  }

  return { fullyLogged, partial, isLoading };
}
