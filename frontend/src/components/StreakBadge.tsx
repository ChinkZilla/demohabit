// StreakBadge (UI-4) — presentational streak indicator.
type StreakBadgeProps = {
  count: number;
  className?: string;
};

export function StreakBadge({ count, className = "" }: StreakBadgeProps) {
  const active = count > 0;
  return (
    <span
      aria-label={`${count} day streak`}
      className={[
        "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold",
        active ? "bg-orange-50 text-orange-600" : "bg-stone-100 text-stone-400",
        className,
      ].join(" ")}
    >
      <svg viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5" aria-hidden="true">
        <path d="M10 2c.5 2.6-1 3.6-2 4.6C6.6 8 6 9.2 6 10.6a4 4 0 1 0 7.8-1.4c-.4-1-1.2-1.9-1.5-2.9C12 4.6 11.2 3.1 10 2Z" />
      </svg>
      {count}
    </span>
  );
}
