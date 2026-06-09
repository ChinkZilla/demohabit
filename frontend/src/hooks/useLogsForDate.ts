import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../services/ApiClient";

// useLogsForDate — logs for one calendar day (Architecture Doc §5.1.3).
export function useLogsForDate(userId: number, date: string) {
  return useQuery({
    queryKey: ["logs", "date", userId, date],
    queryFn: () => apiClient.getLogsForDate(userId, date),
    enabled: Number.isFinite(userId) && !!date,
  });
}
