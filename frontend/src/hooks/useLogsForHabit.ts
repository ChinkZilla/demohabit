import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../services/ApiClient";

// useLogsForHabit — full log history for one habit (Architecture Doc §5.1.3).
export function useLogsForHabit(habitId: number) {
  return useQuery({
    queryKey: ["logs", "habit", habitId],
    queryFn: () => apiClient.getLogsForHabit(habitId),
    enabled: Number.isFinite(habitId),
  });
}
