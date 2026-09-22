import { humanizeAssetId } from "./editor-options";

interface AssetSelectorProps<T extends string> {
  label: string;
  options: readonly T[];
  value: T;
  onChange: (value: T) => void;
  noneValue?: T;
  noneLabel?: string;
  renderPreview?: (value: T) => React.ReactNode;
}

export function AssetSelector<T extends string>({
  label,
  options,
  value,
  onChange,
  noneValue,
  noneLabel = "None",
  renderPreview,
}: AssetSelectorProps<T>) {
  return (
    <fieldset>
      <legend className="sr-only">{label}</legend>

      <div className="max-h-[22rem] overflow-y-auto pr-1">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {noneValue !== undefined && (
            <AssetButton
              label={noneLabel}
              selected={value === noneValue}
              onClick={() => onChange(noneValue)}
              preview={renderPreview?.(noneValue)}
            />
          )}

          {options.map((option) => (
            <AssetButton
              key={option}
              label={humanizeAssetId(option)}
              selected={value === option}
              onClick={() => onChange(option)}
              preview={renderPreview?.(option)}
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
  preview?: React.ReactNode;
}

function AssetButton({ label, selected, onClick, preview }: AssetButtonProps) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onClick}
      className={[
        "asset-card group relative overflow-hidden rounded-[1.35rem] border p-2 text-left",
        "text-sm font-semibold transition-all duration-200",
        "focus-visible:outline-none focus-visible:ring-2",
        "focus-visible:ring-[#7655bd] focus-visible:ring-offset-2",
        "focus-visible:ring-offset-[#f7f2e9]",
        selected
          ? "border-[#7c5cff] bg-[#f0ebff] text-[#2c2438] shadow-[0_8px_22px_rgba(92,67,158,0.18)]"
          : "border-[#ded5ca] bg-white/80 text-[#554b5f] hover:-translate-y-0.5 hover:border-[#b7a5dd] hover:shadow-md",
      ].join(" ")}
    >
      {preview ? <span className="mb-2 block aspect-square overflow-hidden rounded-2xl bg-[#eee7f5]">{preview}</span> : null}
      <span className="block truncate px-1 pb-1 pr-5">{label}</span>

      {selected && (
        <span className="selection-mark absolute right-3 top-3 grid h-6 w-6 place-items-center rounded-full bg-[#7c5cff] text-xs text-white shadow" aria-hidden="true">
          ✓
        </span>
      )}
    </button>
  );
}
