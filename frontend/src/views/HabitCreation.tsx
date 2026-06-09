import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { IconPicker } from "../components/IconPicker";
import { apiClient } from "../services/ApiClient";

// FR-05: Create a new habit.
// Dayron wiring: ApiClient.createHabit() call + navigate on success.
// Pending: Calvin's POST /api/habits endpoint (Calvin issue #28).

const ICON_OPTIONS = [
  { id: "💧", label: "Water"    }, { id: "📚", label: "Read"     },
  { id: "🏃", label: "Run"      }, { id: "🧘", label: "Meditate" },
  { id: "📝", label: "Journal"  }, { id: "💪", label: "Workout"  },
  { id: "🍎", label: "Eat well" }, { id: "😴", label: "Sleep"    },
  { id: "☀️", label: "Morning"  }, { id: "🌙", label: "Evening"  },
  { id: "🎯", label: "Focus"    }, { id: "🌿", label: "Nature"   },
  { id: "❤️", label: "Health"   }, { id: "🧠", label: "Learn"    },
  { id: "🎵", label: "Music"    }, { id: "💊", label: "Meds"     },
];

const ALL_DAYS = ["Su","Mo","Tu","We","Th","Fr","Sa"] as const;
type Day = typeof ALL_DAYS[number];

// C# DayOfWeek integers: 0=Sunday … 6=Saturday (default .NET JSON serialization)
const DAY_TO_DOW: Record<Day, number> = { Su:0, Mo:1, Tu:2, We:3, Th:4, Fr:5, Sa:6 };

export default function HabitCreation() {
  const navigate = useNavigate();
  const [name,   setName]   = useState("");
  const [desc,   setDesc]   = useState("");
  const [icon,   setIcon]   = useState("⭐");
  const [days,   setDays]   = useState<Set<Day>>(new Set(["Mo","Tu","We","Th","Fr"]));
  const [saving, setSaving] = useState(false);
  const [error,  setError]  = useState<string | null>(null);

  const canSubmit = name.trim().length > 0 && days.size > 0;

  function toggleDay(d: Day) {
    setDays(prev => {
      const next = new Set(prev);
      next.has(d) ? next.delete(d) : next.add(d);
      return next;
    });
  }

  async function handleSubmit() {
    if (!canSubmit || saving) return;
    setSaving(true);
    setError(null);
    try {
      await apiClient.createHabit({
        name:        name.trim(),
        description: desc.trim(),
        iconId:      icon,
        activeDays:  [...days].map(d => DAY_TO_DOW[d]),
      });
      navigate(-1);
    } catch (err) {
      console.error("Failed to create habit:", err);
      setError("Couldn't save — check your connection and try again.");
      // TODO: replace with toast notification once error state design is ready
    } finally {
      setSaving(false);
    }
  }

  const inputCls = "w-full border border-stone-200 rounded-xl px-3.5 py-2.5 text-sm text-stone-900 bg-white placeholder:text-stone-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600";

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
        <h1 className="text-xl font-bold tracking-tight text-stone-900">New Habit</h1>
      </div>

      <div className="flex flex-col gap-5">
        {/* Name */}
        <label className="flex flex-col gap-1.5">
          <span className="text-xs font-bold text-stone-400 uppercase tracking-wider">Name *</span>
          <input
            className={inputCls}
            placeholder="e.g. Drink water"
            value={name}
            onChange={e => setName(e.target.value)}
            maxLength={40}
            autoFocus
          />
          <span className="text-xs text-stone-300 text-right">{name.length}/40</span>
        </label>

        {/* Description */}
        <label className="flex flex-col gap-1.5">
          <span className="text-xs font-bold text-stone-400 uppercase tracking-wider">
            Description <span className="font-normal normal-case">(optional)</span>
          </span>
          <input
            className={inputCls}
            placeholder="e.g. 8 glasses a day"
            value={desc}
            onChange={e => setDesc(e.target.value)}
            maxLength={60}
          />
        </label>

        {/* Icon */}
        <div className="flex flex-col gap-2">
          <span className="text-xs font-bold text-stone-400 uppercase tracking-wider">Icon</span>
          <div className="flex items-center gap-3 mb-2">
            <div className="h-12 w-12 rounded-2xl bg-brand-50 flex items-center justify-center text-2xl shrink-0">
              {icon}
            </div>
            <p className="text-xs text-stone-400">Choose one below</p>
          </div>
          <IconPicker value={icon} onChange={setIcon} options={ICON_OPTIONS} />
        </div>

        {/* Active days */}
        <div className="flex flex-col gap-2">
          <span className="text-xs font-bold text-stone-400 uppercase tracking-wider">Active days</span>
          <div className="flex gap-1.5">
            {ALL_DAYS.map(d => {
              const on = days.has(d);
              return (
                <button
                  key={d}
                  type="button"
                  onClick={() => toggleDay(d)}
                  className={[
                    "flex-1 py-2.5 rounded-xl text-xs font-bold transition-colors",
                    on ? "bg-brand-600 text-white" : "bg-stone-100 text-stone-400 hover:bg-stone-200",
                  ].join(" ")}
                >
                  {d}
                </button>
              );
            })}
          </div>
          {days.size === 0 && (
            <p className="text-xs text-red-400">Select at least one day.</p>
          )}
        </div>
      </div>

      {/* Error */}
      {error && (
        <p className="mt-4 text-sm text-red-500 text-center">{error}</p>
      )}

      {/* Submit */}
      <button
        onClick={handleSubmit}
        disabled={!canSubmit || saving}
        className={[
          "w-full mt-8 py-4 rounded-2xl font-bold text-sm transition-colors",
          canSubmit && !saving
            ? "bg-brand-600 text-white hover:bg-brand-700"
            : "bg-stone-200 text-stone-400 cursor-not-allowed",
        ].join(" ")}
      >
        {saving ? "Creating…" : "Create Habit"}
      </button>

      <div className="h-10" />
    </main>
  );
}
