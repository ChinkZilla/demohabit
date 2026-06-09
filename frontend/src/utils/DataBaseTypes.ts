// DataBaseTypes.ts — shared frontend types, aligned to Calvin's database models.
// Last updated: design pass (Allen) — reconciled icon/iconId, added activeDays (Issue #22).

// Matches Calvin's backend/Database/Habit.cs
// NOTE: `status` is NOT a backend field — derive it on the frontend by checking
// whether a LogEntry exists for that habit + today's date.
export type Habit = {
  id:          number;
  name:        string;
  iconId:      string;      // was `icon` — Calvin's model uses iconId (an ID, not a URL)
  description: string;
  activeDays:  string[];    // e.g. ["Monday","Wednesday","Friday"] — new, from Calvin's model
};

// Matches Calvin's backend/Database/LogEntry.cs
// NOTE: `activeDay` removed — Calvin's LogEntry only has habitId + date.
export type HabitLog = {
  habitId: number;          // was habitID (casing fixed to match Calvin)
  date:    string;          // ISO format: "YYYY-MM-DD"
};

// Matches Calvin's backend/Database/User.cs
export type User = {
  userID:   number;
  email:    string;
  picture?: string;
};

// Matches Calvin's backend/Database/Login.cs
export type LogIn = {
  provider:   string;
  subject_id: string;
  user_id:    number;
};
