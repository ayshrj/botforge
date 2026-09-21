import type { ColorOption } from "./editor-options";

interface ColorSwatchPickerProps {
  label: string;
  value: string;
  colors: readonly ColorOption[];
  onChange: (color: string) => void;
  showCustomColorPicker?: boolean;
}

export function ColorSwatchPicker({
  label,
  value,
  colors,
  onChange,
  showCustomColorPicker = true,
}: ColorSwatchPickerProps) {
  return (
    <fieldset>
      <legend className="sr-only">{label}</legend>

      <div className="flex flex-wrap gap-3">
        {colors.map((color) => {
          const selected = color.value.toLowerCase() === value.toLowerCase();

          return (
            <button
              key={color.id}
              type="button"
              aria-label={`${color.label}${selected ? ", selected" : ""}`}
              aria-pressed={selected}
              title={color.label}
              onClick={() => onChange(color.value)}
              className={[
                "relative h-12 w-12 shrink-0 rounded-full border-2",
                "transition-transform hover:scale-105",
                "focus-visible:outline-none focus-visible:ring-2",
                "focus-visible:ring-white focus-visible:ring-offset-2",
                "focus-visible:ring-offset-neutral-950",
                selected
                  ? "border-white ring-2 ring-white/40"
                  : "border-white/20",
              ].join(" ")}
              style={{ backgroundColor: color.value }}
            >
              {selected && (
                <span
                  aria-hidden="true"
                  className="absolute inset-0 grid place-items-center text-base font-bold text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]"
                >
                  ✓
                </span>
              )}
            </button>
          );
        })}
      </div>

      {showCustomColorPicker && (
        <div className="mt-6 flex items-center justify-between gap-4 rounded-xl border border-white/10 bg-white/[0.04] p-4">
          <div>
            <p className="text-sm font-medium text-white">Custom color</p>
            <p className="mt-0.5 font-mono text-xs uppercase text-neutral-400">
              {value}
            </p>
          </div>

          <label className="relative h-11 w-16 cursor-pointer overflow-hidden rounded-lg border border-white/20">
            <span className="sr-only">Choose custom {label.toLowerCase()}</span>

            <input
              type="color"
              value={normalizeHexColor(value)}
              onChange={(event) => onChange(event.target.value)}
              className="absolute -inset-2 h-16 w-20 cursor-pointer border-0 bg-transparent p-0"
            />
          </label>
        </div>
      )}
    </fieldset>
  );
}

function normalizeHexColor(color: string): string {
  return /^#[0-9a-f]{6}$/i.test(color) ? color : "#000000";
}
