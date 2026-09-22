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

      <div className="grid grid-cols-4 gap-3 sm:grid-cols-6">
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
                "color-swatch relative aspect-square w-full rounded-2xl border-2",
                "transition-all hover:-translate-y-0.5 hover:shadow-md",
                "focus-visible:outline-none focus-visible:ring-2",
                "focus-visible:ring-white focus-visible:ring-offset-2",
                "focus-visible:ring-[#7c5cff] focus-visible:ring-offset-[#f7f2e9]",
                selected
                  ? "border-[#30263d] ring-2 ring-[#7c5cff]/30"
                  : "border-white shadow-sm",
              ].join(" ")}
              style={{ backgroundColor: color.value }}
            >
              {selected && (
                <span
                  aria-hidden="true"
                  className="selection-mark absolute inset-0 grid place-items-center text-base font-bold text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]"
                >
                  ✓
                </span>
              )}
            </button>
          );
        })}
      </div>

      {showCustomColorPicker && (
        <div className="mt-5 flex items-center justify-between gap-4 rounded-2xl border border-[#ded5ca] bg-white/70 p-4">
          <div>
            <p className="text-sm font-semibold text-[#30263d]">Make it yours</p>
            <p className="mt-0.5 font-mono text-xs uppercase text-[#81778a]">
              {value}
            </p>
          </div>

          <label className="relative h-11 w-16 cursor-pointer overflow-hidden rounded-xl border-2 border-white shadow-md">
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
