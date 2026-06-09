import { useNavigate } from "react-router-dom";
import type { Habit } from "../utils/DataBaseTypes";
// --- Dayron's original imports (commented out by the design pass) ---
// import { useEffect, useState } from "react";                 // was unused
// import getHabitDatabyID from "../managers/HabitCardManager"; // broken: no default export, unused
// -------------------------------------------------------------------

type HabitCardProps = {
  habit: Habit;
  onLog?: (habitId: number) => void;
};

function HabitCard({ habit, onLog }: HabitCardProps) {
  const navigate = useNavigate();
  const isLogged = habit.status === "logged";

  /* --- Dayron's original markup (kept for reference) ---
  return (
    <div className="habit-card">
      <div>
        <img src={habit.icon} alt={habit.name} />
      </div>
      <h3>{habit.name}</h3>
      <p>{habit.description}</p>
      <p>{habit.status}</p>
       {habit.status !== "logged" && onLog && (
        <button id="log-habit" onClick={() => onLog(habit.id)}>
          Log Habit
        </button>
      )}
    </div>
  );
  --- end original --- */

  // --- Styled version (design pass) ---
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-stone-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md">
      {/* Tappable area → habit detail (FR-04) */}
      <button
        type="button"
        onClick={() => navigate(`/views/HabitSummary/${habit.id}`)}
        aria-label={`View ${habit.name} details`}
        className="flex flex-1 min-w-0 items-center gap-3 text-left rounded-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
      >
        {/* Icon tile (falls back to first letter if no icon) */}
        <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-brand-50">
          {habit.icon ? (
            <img src={habit.icon} alt="" className="h-7 w-7 object-contain" />
          ) : (
            <span className="text-lg font-bold text-brand-700">
              {habit.name.charAt(0).toUpperCase()}
            </span>
          )}
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="truncate text-base font-semibold text-stone-900">{habit.name}</h3>
          {habit.description ? (
            <p className="truncate text-sm text-stone-500">{habit.description}</p>
          ) : null}
        </div>
      </button>

      {/* Action — separate from the navigation area so tapping it doesn't open the detail */}
      {isLogged ? (
        <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-brand-50 px-3 py-1 text-sm font-semibold text-brand-700">
          <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4" aria-hidden="true">
            <path
              fillRule="evenodd"
              d="M16.7 5.3a1 1 0 0 1 0 1.4l-7.5 7.5a1 1 0 0 1-1.4 0L4.3 10.7a1 1 0 1 1 1.4-1.4l2.8 2.8 6.8-6.8a1 1 0 0 1 1.4 0Z"
              clipRule="evenodd"
            />
          </svg>
          Logged
        </span>
      ) : onLog ? (
        <button
          type="button"
          onClick={() => onLog(habit.id)}
          aria-label={`Log ${habit.name}`}
          className="shrink-0 rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
        >
          Log
        </button>
      ) : null}
    </div>
  );
}

export { HabitCard };
// Note: dropped the undefined `HabitList` from the export (it was a build error in the original).
