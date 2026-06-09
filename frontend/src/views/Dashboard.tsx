import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";
import { useHabits } from "../hooks/useHabits";
import { useSession } from "../hooks/useSession";
import { HabitCard } from "../components/HabitCard";

export default function Dashboard() {
  const navigate = useNavigate();
  const { user } = useSession();
  const userId   = user?.userID ?? 1;
  const { habits, isLoading, logToday } = useHabits(userId);

  const logged = habits.filter(h => h.status === "logged").length;
  const pct    = habits.length ? Math.round((logged / habits.length) * 100) : 0;
  const today  = new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" });

  return (
    <main className="mx-auto max-w-md px-4 py-6">
      <header className="mb-5">
        <h1 className="text-2xl font-bold tracking-tight text-stone-900">Today</h1>
        <p className="mt-0.5 text-sm text-stone-500">{today}</p>
      </header>

      {/* Progress bar */}
      <div className="flex items-center gap-3 bg-brand-50 rounded-2xl px-4 py-3 mb-5">
        <div className="flex-1 h-2 bg-brand-100 rounded-full overflow-hidden">
          <div className="h-full bg-brand-600 rounded-full transition-all duration-500" style={{ width: `${pct}%` }} />
        </div>
        <span className="text-xs font-bold text-brand-700 shrink-0">{logged}/{habits.length}</span>
      </div>

      {/* Habit list */}
      {isLoading ? (
        <ul className="space-y-3">
          {[0,1,2,3].map(i => <li key={i} className="h-20 animate-pulse rounded-2xl bg-stone-100" />)}
        </ul>
      ) : habits.length === 0 ? (
        <div className="rounded-2xl border-2 border-dashed border-stone-300 p-10 text-center text-sm text-stone-400">
          No habits yet — tap + to add your first one
        </div>
      ) : (
        <ul className="space-y-3">
          {habits.map(h => (
            <li key={h.id}>
              <HabitCard habit={h} onLog={logToday} />
            </li>
          ))}
        </ul>
      )}

      {/* FAB — opens HabitCreation (FR-05) */}
      <button
        onClick={() => navigate("/views/HabitCreation")}
        aria-label="Add habit"
        className="fixed bottom-20 right-4 z-10 h-14 w-14 rounded-full bg-brand-600 text-white shadow-lg flex items-center justify-center hover:bg-brand-700 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
      >
        <Plus size={26} strokeWidth={2.5} />
      </button>
    </main>
  );
}
