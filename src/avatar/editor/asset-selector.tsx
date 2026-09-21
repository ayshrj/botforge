import { humanizeAssetId } from "./editor-options";

interface AssetSelectorProps<T extends string> {
  label: string;
  options: readonly T[];
  value: T | null;
  onChange: (value: T | null) => void;
  allowNone?: boolean;
  noneLabel?: string;
}

export function AssetSelector<T extends string>({
  label,
  options,
  value,
  onChange,
  allowNone = false,
  noneLabel = "None",
}: AssetSelectorProps<T>) {
  return (
    <fieldset>
      <legend className="sr-only">{label}</legend>

      <div className="max-h-[22rem] overflow-y-auto pr-1">
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {allowNone && (
            <AssetButton
              label={noneLabel}
              selected={value === null}
              onClick={() => onChange(null)}
            />
          )}

          {options.map((option) => (
            <AssetButton
              key={option}
              label={humanizeAssetId(option)}
              selected={value === option}
              onClick={() => onChange(option)}
            />
          ))}
        </div>
      </div>
    </fieldset>
  );
}

interface AssetButtonProps {
  label: string;
  selected: boolean;
  onClick: () => void;
}

function AssetButton({ label, selected, onClick }: AssetButtonProps) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onClick}
      className={[
        "relative min-h-16 rounded-xl border px-3 py-3",
        "text-left text-sm font-medium",
        "transition-colors",
        "focus-visible:outline-none focus-visible:ring-2",
        "focus-visible:ring-white focus-visible:ring-offset-2",
        "focus-visible:ring-offset-neutral-950",
        selected
          ? "border-white bg-white text-neutral-950"
          : "border-white/10 bg-white/[0.04] text-neutral-200 hover:border-white/30 hover:bg-white/[0.08]",
      ].join(" ")}
    >
      <span className="block pr-5">{label}</span>

      {selected && (
        <span className="absolute right-2.5 top-2.5" aria-hidden="true">
          ✓
        </span>
      )}
    </button>
  );
}
