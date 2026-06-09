import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Edit, Trash2 } from "lucide-react";
import { StreakBadge } from "../components/StreakBadge";
import { TimeZoneService } from "../services/TimeZoneService";

// FR-04: Detail and history for a single habit.
// Design pass: layout and placeholder complete.
// Dayron: replace placeholder data with useLogsForHabit(habitId) + useHabits lookup.

export default function HabitSummary() {
  const { habitId } = useParams<{ habitId: string }>();
  const navigate    = useNavigate();

  // TODO (Dayron): replace with real hook data
  // const { data: logs }  = useLogsForHabit(Number(habitId));
  // const { habits }      = useHabits(userId);
  // const habit           = habits.find(h => h.id === Number(habitId));
  const isLoading = false; // set to true while fetching

  // Placeholder data — remove when Dayron wires the hooks
  const habit = {
    name:        "Habit",
    icon:        "⭐",
    description: "",
    streak:      0,
    activeDays:  ["Mo","Tu","We","Th","Fr"],
    totalLogged: 0,
  };

  // Last 7 days strip
  const today = TimeZoneService.todayISO();
  const last7 = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(today);
    d.setDate(d.getDate() - (6 - i));
    return d.toISOString().slice(0, 10);
  });
  // TODO: replace empty set with real logged dates from hook
  const loggedDates: Set<string> = new Set();

  function handleEdit()   { console.log("Edit habit", habitId); }
  function handleDelete() {
    if (window.confirm("Delete this habit? This will remove all its logs too.")) {
      console.log("TODO: ApiClient.deleteHabit then navigate back");
      navigate(-1);
    }
  }

  if (isLoading) {
    return (
      <main className="mx-auto max-w-md px-4 py-6">
        <div className="h-8 w-40 animate-pulse rounded-xl bg-stone-100 mb-6" />
        <div className="h-32 animate-pulse rounded-2xl bg-stone-100" />
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-md px-4 py-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => navigate(-1)}
          className="h-9 w-9 rounded-xl bg-stone-100 flex items-center justify-center hover:bg-stone-200 transition-colors shrink-0"
          aria-label="Go back"
        >
          <ArrowLeft size={18} className="text-stone-600" />
        </button>
        <h1 className="text-xl font-bold tracking-tight text-stone-900 flex-1 truncate">{habit.name}</h1>
        <button onClick={handleEdit} className="h-9 w-9 rounded-xl bg-stone-100 flex items-center justify-center hover:bg-stone-200 transition-colors" aria-label="Edit">
          <Edit size={16} className="text-stone-500" />
        </button>
        <button onClick={handleDelete} className="h-9 w-9 rounded-xl bg-red-50 flex items-center justify-center hover:bg-red-100 transition-colors" aria-label="Delete">
          <Trash2 size={16} className="text-red-400" />
        </button>
      </div>

      {/* Habit identity card */}
      <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-5 mb-4 flex items-center gap-4">
        <div className="h-16 w-16 rounded-2xl bg-brand-50 flex items-center justify-center text-3xl shrink-0">
          {habit.icon}
        </div>
        <div className="min-w-0">
          <p className="font-bold text-lg text-stone-900 truncate">{habit.name}</p>
          {habit.description && <p className="text-sm text-stone-500 mt-0.5">{habit.description}</p>}
          <div className="mt-2"><StreakBadge count={habit.streak} /></div>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-4 text-center">
          <p className="text-2xl font-bold text-stone-900">{habit.totalLogged}</p>
          <p className="text-xs text-stone-400 mt-0.5">Total logged</p>
        </div>
        <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-4 text-center">
          <p className="text-2xl font-bold text-stone-900">{habit.activeDays.length}</p>
          <p className="text-xs text-stone-400 mt-0.5">Days per week</p>
        </div>
      </div>

      {/* Active days */}
      <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-4 mb-4">
        <p className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-3">Active days</p>
        <div className="flex gap-1.5">
          {["Su","Mo","Tu","We","Th","Fr","Sa"].map(d => {
            const on = habit.activeDays.includes(d);
            return (
              <div key={d} className={["flex-1 py-2 rounded-xl text-xs font-bold text-center",
                on ? "bg-brand-600 text-white" : "bg-stone-100 text-stone-300"].join(" ")}>
                {d}
              </div>
            );
          })}
        </div>
      </div>

      {/* Last 7 days activity */}
      <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-4">
        <p className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-3">Last 7 days</p>
        <div className="flex gap-2 justify-between">
          {last7.map(iso => {
            const logged = loggedDates.has(iso);
            const label  = new Date(iso + "T00:00:00").toLocaleDateString("en-US", { weekday: "short" }).slice(0,2);
            return (
              <div key={iso} className="flex flex-col items-center gap-1.5">
                <div className={["h-8 w-8 rounded-xl", logged ? "bg-brand-600" : "bg-stone-100"].join(" ")} />
                <span className="text-xs text-stone-400">{label}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="h-20" />
    </main>
  );
}
