// IconPicker — presentational grid for choosing a habit icon (Architecture Doc §5.1.3).
type IconOption = {
  id: string;
  label: string;
  src?: string; // optional image/sprite URL; falls back to first letter of label
};

type IconPickerProps = {
  value?: string;
  onChange: (id: string) => void;
  options: IconOption[];
};

export function IconPicker({ value, onChange, options }: IconPickerProps) {
  return (
    <div role="radiogroup" aria-label="Choose an icon" className="grid grid-cols-5 gap-2">
      {options.map((opt) => {
        const selected = opt.id === value;
        return (
          <button
            key={opt.id}
            type="button"
            role="radio"
            aria-checked={selected}
            aria-label={opt.label}
            onClick={() => onChange(opt.id)}
            className={[
              "flex aspect-square items-center justify-center rounded-xl border text-lg font-semibold transition-colors",
              "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600",
              selected
                ? "border-brand-600 bg-brand-50 text-brand-700"
                : "border-stone-200 bg-white text-stone-500 hover:border-stone-300",
            ].join(" ")}
          >
            {opt.src ? (
              <img src={opt.src} alt="" className="h-6 w-6 object-contain" />
            ) : (
              opt.label.charAt(0).toUpperCase()
            )}
          </button>
        );
      })}
    </div>
  );
}
