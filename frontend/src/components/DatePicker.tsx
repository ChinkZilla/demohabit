// DatePicker — presentational date selector emitting an ISO (YYYY-MM-DD) string.
// (Architecture Doc §5.1.3. Time-zone handling lives in TimeZoneService.)
type DatePickerProps = {
  value?: string;
  onChange: (isoDate: string) => void;
  label?: string;
};

const todayISO = () => {
  const now = new Date();
  const local = new Date(now.getTime() - now.getTimezoneOffset() * 60_000);
  return local.toISOString().slice(0, 10);
};

export function DatePicker({ value = todayISO(), onChange, label = "Date" }: DatePickerProps) {
  return (
    <label className="flex flex-col gap-1">
      <span className="text-xs font-semibold text-stone-500">{label}</span>
      <input
        type="date"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="rounded-lg border border-stone-200 bg-white px-3 py-2 text-sm text-stone-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
      />
    </label>
  );
}
