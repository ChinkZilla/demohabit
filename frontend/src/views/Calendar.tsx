import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { TimeZoneService } from "../services/TimeZoneService";
import { useLogsForMonth } from "../hooks/useLogsForMonth";
import { useSession } from "../hooks/useSession";

// FR-02: Calendar showing a month grid of habit activity.
// Data wiring complete — useLogsForMonth drops into fullyLogged/partial.
// Pending: Calvin's GET /api/habits (list all) + GET /api/habits/{id}/logs
// endpoints to be implemented (Calvin issue #28). Until then the calendar
// renders with empty sets (all days uncolored), which is correct fallback.

const DAY_LABELS = ["Su","Mo","Tu","We","Th","Fr","Sa"];

function isoDate(year: number, month: number, day: number) {
  return `${year}-${String(month + 1).padStart(2,"0")}-${String(day).padStart(2,"0")}`;
}
function firstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}
function daysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

export default function Calendar() {
  const navigate     = useNavigate();
  const { user }     = useSession();
  const userId       = user?.userID ?? 1;
  const todayISO     = TimeZoneService.todayISO();
  const todayParts   = todayISO.split("-").map(Number);

  const [year,  setYear]  = useState(todayParts[0]);
  const [month, setMonth] = useState(todayParts[1] - 1); // 0-indexed

  // Real data — wired to useLogsForMonth
  const { fullyLogged, partial, isLoading } = useLogsForMonth(userId, year, month);

  const monthLabel = new Date(year, month, 1).toLocaleDateString("en-US", { month: "long", year: "numeric" });
  const totalDays  = daysInMonth(year, month);
  const startDay   = firstDayOfMonth(year, month);
  const cells      = Array.from({ length: 42 }, (_, i) => {
    const d = i - startDay + 1;
    return d >= 1 && d <= totalDays ? d : null;
  });

  function prevMonth() {
    if (month === 0) { setYear(y => y - 1); setMonth(11); }
    else setMonth(m => m - 1);
  }
  function nextMonth() {
    if (month === 11) { setYear(y => y + 1); setMonth(0); }
    else setMonth(m => m + 1);
  }

  return (
    <main className="mx-auto max-w-md px-4 py-6">
      {/* Month navigation */}
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-2xl font-bold tracking-tight text-stone-900">Calendar</h1>
        <div className="flex items-center gap-1">
          <button onClick={prevMonth} className="h-9 w-9 rounded-xl bg-stone-100 flex items-center justify-center hover:bg-stone-200 transition-colors" aria-label="Previous month">
            <ChevronLeft size={18} className="text-stone-600" />
          </button>
          <span className="text-sm font-semibold text-stone-600 px-2 min-w-[120px] text-center">{monthLabel}</span>
          <button onClick={nextMonth} className="h-9 w-9 rounded-xl bg-stone-100 flex items-center justify-center hover:bg-stone-200 transition-colors" aria-label="Next month">
            <ChevronRight size={18} className="text-stone-600" />
          </button>
        </div>
      </div>

      {/* Day-of-week headers */}
      <div className="grid grid-cols-7 gap-1 mb-1">
        {DAY_LABELS.map(d => (
          <div key={d} className="text-center text-xs font-bold text-stone-400 py-1">{d}</div>
        ))}
      </div>

      {/* Day grid */}
      <div className="grid grid-cols-7 gap-1">
        {cells.map((d, i) => {
          if (!d) return <div key={i} />;
          const iso     = isoDate(year, month, d);
          const isToday = iso === todayISO;
          const isLog   = fullyLogged.has(iso);
          const isPart  = partial.has(iso);
          const isFuture = iso > todayISO;

          return (
            <button
              key={i}
              onClick={() => navigate(`/views/DaySummary/${iso}`)}
              disabled={isLoading}
              className={[
                "h-10 rounded-xl flex items-center justify-center text-sm font-semibold transition-colors",
                isLog    ? "bg-brand-600 text-white"
                : isPart   ? "bg-brand-100 text-brand-700"
                : isToday  ? "ring-2 ring-brand-600 text-brand-700"
                : isFuture ? "text-stone-300"
                : "text-stone-600 hover:bg-stone-100",
                isLoading ? "opacity-50" : "",
              ].join(" ")}
              aria-label={iso}
            >
              {d}
            </button>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex gap-4 mt-5">
        {[
          { bg: "bg-brand-600", label: "All done"  },
          { bg: "bg-brand-100", label: "Partial"   },
          { bg: "ring-2 ring-brand-600 bg-white", label: "Today" },
        ].map(({ bg, label }) => (
          <div key={label} className="flex items-center gap-1.5">
            <div className={`h-3 w-3 rounded-sm ${bg}`} />
            <span className="text-xs text-stone-400">{label}</span>
          </div>
        ))}
      </div>

      <div className="h-20" />
    </main>
  );
}
