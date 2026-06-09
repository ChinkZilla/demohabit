import type { Habit, HabitLog, User } from "../utils/DataBaseTypes";

// Integration point: set VITE_API_BASE_URL in a .env file to override.
// Default port 5166 matches Calvin's backend launchSettings.json.
const BASE_URL =
  ((import.meta as any).env?.VITE_API_BASE_URL as string) ?? "http://localhost:5166";

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    // Send the HttpOnly session cookie rather than a JS-readable token
    // (matches the threat model: S-1 / I-4).
    credentials: "include",
    headers: { "Content-Type": "application/json", ...(init?.headers ?? {}) },
    ...init,
  });

  if (!res.ok) {
    let message = res.statusText;
    try {
      const body = await res.json();
      message = body?.message ?? message;
    } catch {
      /* non-JSON error body */
    }
    throw new Error(`API ${res.status}: ${message}`);
  }
  if (res.status === 204) return undefined as T;
  return (await res.json()) as T;
}

// ─── Provisional response types ───────────────────────────────────────────────
// These reflect Calvin's DB models (Habit.cs, LogEntry.cs).
// Update once Calvin fills in HabitResponse and LogResponse DTOs (Calvin #28).
// activeDays: C# DayOfWeek integers — 0=Sunday, 1=Monday … 6=Saturday.

export type HabitSummary = {
  id:          number;
  name:        string;
  description: string;
  iconId:      string;   // string, not int — matches Habit.IconId in DB model
  activeDays:  number[];
};

export type LogSummary = {
  date: string; // ISO format "YYYY-MM-DD"
};

export type CreateHabitInput = {
  name:        string;
  description: string;
  iconId:      string;
  activeDays:  number[]; // DayOfWeek integers: 0=Sun … 6=Sat
};

// ─── ApiClient ────────────────────────────────────────────────────────────────
// Single REST wrapper for the frontend (Architecture Doc §5.1.3).
// All data access goes through here so auth + error handling live in one place.

export const apiClient = {

  // ── User ──────────────────────────────────────────────────────────────────

  // GET /api/user — returns the current authenticated user
  getCurrentUser: () =>
    request<User>("/api/user"),

  // POST /api/user — create a new user (called on first login)
  createUser: (email: string) =>
    request<User>("/api/user", {
      method: "POST",
      body:   JSON.stringify({ email }),
    }),

  // DELETE /api/user — hard-delete account + all data (FR-06-B)
  deleteAccount: () =>
    request<void>("/api/user", { method: "DELETE" }),

  // ── Habits ────────────────────────────────────────────────────────────────

  // GET /api/habits — list all habits for the current user
  // Pending: Calvin's GET /api/Habits endpoint (Calvin #28 — GetUserHabitsAsync)
  getHabitsForUser: (_userId: number) =>
    request<HabitSummary[]>("/api/habits"),

  // GET /api/habits/{habitId} — get a single habit
  getHabit: (habitId: number) =>
    request<HabitSummary>(`/api/habits/${habitId}`),

  // POST /api/habits — create a new habit (FR-05)
  // Pending: Calvin's POST /api/Habits endpoint (Calvin #28 — AddHabitAsync)
  createHabit: (data: CreateHabitInput) =>
    request<HabitSummary>("/api/habits", {
      method: "POST",
      body:   JSON.stringify(data),
    }),

  // ── Logs ──────────────────────────────────────────────────────────────────

  // GET /api/habits/{habitId}/logs?from=YYYY-MM-DD&to=YYYY-MM-DD
  // Fetches all log entries for a habit within a date range (FR-02 calendar).
  getHabitLogsRange: (habitId: number, from: string, to: string) =>
    request<LogSummary[]>(`/api/habits/${habitId}/logs?from=${from}&to=${to}`),

  // GET /api/habits/{habitId}/logs/{date}
  // Gets the log entry for a habit on a specific date (FR-03 day summary).
  getHabitLogForDate: (habitId: number, date: string) =>
    request<LogSummary | null>(`/api/habits/${habitId}/logs/${date}`),

  // PUT /api/habits/{habitId}/logs/{date}
  // Logs a habit for a given date (FR-01 one-tap log).
  logHabit: (habitId: number, date: string) =>
    request<void>(`/api/habits/${habitId}/logs/${date}`, { method: "PUT" }),

  // DELETE /api/habits/{habitId}/logs/{date}
  // Removes the log for a habit on a given date (ISS-05 un-log, now resolved).
  unlogHabit: (habitId: number, date: string) =>
    request<void>(`/api/habits/${habitId}/logs/${date}`, { method: "DELETE" }),

};

export type ApiClient = typeof apiClient;
