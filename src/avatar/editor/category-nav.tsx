import type { EditorCategory, EditorCategoryId } from "./editor-options";

interface CategoryNavProps {
  categories: readonly EditorCategory[];
  activeCategory: EditorCategoryId;
  onChange: (category: EditorCategoryId) => void;
}

export function CategoryNav({
  categories,
  activeCategory,
  onChange,
}: CategoryNavProps) {
  return (
    <div
      className="overflow-x-auto border-b border-white/10"
      role="tablist"
      aria-label="Avatar customization categories"
    >
      <div className="flex min-w-max gap-1 p-2">
        {categories.map((category) => {
          const selected = category.id === activeCategory;

          return (
            <button
              key={category.id}
              id={`avatar-editor-tab-${category.id}`}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-controls={`avatar-editor-panel-${category.id}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => onChange(category.id)}
              className={[
                "rounded-lg px-4 py-2.5 text-sm font-medium",
                "transition-colors",
                "focus-visible:outline-none focus-visible:ring-2",
                "focus-visible:ring-white focus-visible:ring-offset-2",
                "focus-visible:ring-offset-neutral-950",
                selected
                  ? "bg-white text-neutral-950"
                  : "text-neutral-300 hover:bg-white/10 hover:text-white",
              ].join(" ")}
            >
              {category.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
