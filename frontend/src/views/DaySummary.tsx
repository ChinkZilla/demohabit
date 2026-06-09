import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import type { Habit } from "../utils/DataBaseTypes";
import { getHabitDataByUserIDandDate, logHabit } from "../managers/HabitCardManager";
import { HabitCard } from "../components/HabitCard";
import { useSession } from "../hooks/useSession";

// NOTE: This view previously took { userID, date } as props.
// Now it reads `date` from the URL param (:date) and userId from useSession,
// enabling deep links: /views/DaySummary/2026-06-03 (Architecture Doc §5.1.2).
// Dayron: swap getHabitDataByUserIDandDate → useHabits(userId, date) when ready.

export default function DaySummary() {
  const { date = "" }  = useParams<{ date: string }>();
  const navigate       = useNavigate();
  const { user }       = useSession();
  const userId         = String(user?.userID ?? 1);
  const [habits, setHabits] = useState<Habit[]>([]);
  const [loading, setLoading] = useState(true);

  // Format for display: "Wednesday, June 3"
  const displayDate = date
    ? new Date(date + "T00:00:00").toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })
    : "";

  async function handleLogHabit(habitID: number) {
    await logHabit(habitID);
    setHabits(current =>
      current.map(h => h.id === habitID ? { ...h, status: "logged" } : h)
    );
  }

  useEffect(() => {
    if (!date) return;
    setLoading(true);
    async function fetchHabits() {
      try {
        // Dayron's original fetch (legacy format MM/DD/YYYY):
        const [y,m,d] = date.split("-");
        const legacyDate = `${parseInt(m)}/${parseInt(d)}/${y}`;
        const habitData: Habit[] = await getHabitDataByUserIDandDate(userId, legacyDate);
        setHabits(habitData);
      } catch (error) {
        console.error("Failed to fetch habits:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchHabits();
  }, [userId, date]);

  /* --- Dayron's original return (kept for reference) ---
  return (
    <section>
      <div>
        <h2>Today's Habits</h2>
        <p>Date: {dateStr}</p>
        <p>Logged: {habits.filter(h => h.status === "logged").length}</p>
        <HabitSection habits={habits} logged={true} />
        <p>Not Logged:</p>
        <HabitSection habits={habits} logged={false} onLog={handleLogHabit} />
      </div>
    </section>
  );
  --- end original --- */

  const logged    = habits.filter(h => h.status === "logged");
  const notLogged = habits.filter(h => h.status !== "logged");
  const pct       = habits.length ? Math.round((logged.length / habits.length) * 100) : 0;
  const allDone   = habits.length > 0 && notLogged.length === 0;

  return (
    <main className="mx-auto max-w-md px-4 py-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-5">
        <button
          onClick={() => navigate(-1)}
          className="h-9 w-9 rounded-xl bg-stone-100 flex items-center justify-center hover:bg-stone-200 transition-colors shrink-0"
          aria-label="Go back"
        >
          <ArrowLeft size={18} className="text-stone-600" />
        </button>
        <div>
          <h1 className="text-xl font-bold tracking-tight text-stone-900">{displayDate || "Day Summary"}</h1>
          <p className="text-xs text-stone-400">
            {habits.length > 0 ? `${logged.length} of ${habits.length} logged` : ""}
          </p>
        </div>
      </div>

      {/* Progress */}
      {habits.length > 0 && (
        <div className="flex items-center gap-3 bg-brand-50 rounded-2xl px-4 py-3 mb-5">
          <div className="flex-1 h-2 bg-brand-100 rounded-full overflow-hidden">
            <div className="h-full bg-brand-600 rounded-full transition-all duration-500" style={{ width: `${pct}%` }} />
          </div>
          <span className="text-xs font-bold text-brand-700 shrink-0">{pct}%</span>
        </div>
      )}

      {loading ? (
        <ul className="space-y-3">
          {[0,1,2].map(i => <li key={i} className="h-20 animate-pulse rounded-2xl bg-stone-100" />)}
        </ul>
      ) : allDone ? (
        <div className="rounded-2xl bg-brand-50 border border-brand-100 p-8 text-center">
          <p className="text-3xl mb-2">🎉</p>
          <p className="font-bold text-brand-700">All habits logged!</p>
          <p className="text-sm text-brand-600 mt-1">Great work today.</p>
        </div>
      ) : (
        <>
          {/* Not yet logged */}
          {notLogged.length > 0 && (
            <section className="mb-5">
              <h2 className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-3">To do</h2>
              <ul className="space-y-3">
                {notLogged.map(h => <li key={h.id}><HabitCard habit={h} onLog={handleLogHabit} /></li>)}
              </ul>
            </section>
          )}

          {/* Already logged */}
          {logged.length > 0 && (
            <section>
              <h2 className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-3">Done</h2>
              <ul className="space-y-3">
                {logged.map(h => <li key={h.id}><HabitCard habit={h} /></li>)}
              </ul>
            </section>
          )}
        </>
      )}

      <div className="h-20" />
    </main>
  );
}
