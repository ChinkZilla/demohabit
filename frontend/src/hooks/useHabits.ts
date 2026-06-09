import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "../services/ApiClient";
import { TimeZoneService } from "../services/TimeZoneService";
import type { Habit } from "../utils/DataBaseTypes";

/**
 * useHabits — habits for a given user/day, plus optimistic logging.
 * Implements the Architecture Doc §5.1.4 sequence:
 *   logToday() -> optimistic cache update (<200ms, NFR-01) -> POST -> reconcile/revert.
 */
export function useHabits(userId: number, date: string = TimeZoneService.todayISO()) {
  const qc = useQueryClient();
  const queryKey = ["habits", userId, date];

  const query = useQuery({
    queryKey,
    queryFn: () => apiClient.getHabitsForDate(userId, date),
    enabled: Number.isFinite(userId),
  });

  const logMutation = useMutation({
    mutationFn: (habitId: number) => apiClient.logHabit(habitId, date),
    onMutate: async (habitId: number) => {
      await qc.cancelQueries({ queryKey });
      const previous = qc.getQueryData<Habit[]>(queryKey);
      // Optimistically flip the card to "logged" before the server confirms.
      qc.setQueryData<Habit[]>(queryKey, (old) =>
        old?.map((h) => (h.id === habitId ? { ...h, status: "logged" } : h))
      );
      return { previous };
    },
    onError: (_err, _habitId, context) => {
      // Roll back on failure.
      if (context?.previous) qc.setQueryData(queryKey, context.previous);
    },
    onSettled: () => {
      // Reconcile with the server's truth.
      qc.invalidateQueries({ queryKey });
    },
  });

  return {
    habits: query.data ?? [],
    isLoading: query.isLoading,
    isError: query.isError,
    logToday: (habitId: number) => logMutation.mutate(habitId),
  };
}
