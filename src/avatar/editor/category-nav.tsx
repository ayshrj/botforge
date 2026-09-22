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
  const moveFocus = (currentIndex: number, direction: number) => {
    const next = categories[(currentIndex + direction + categories.length) % categories.length];
    onChange(next.id);
    requestAnimationFrame(() => document.getElementById(`avatar-editor-tab-${next.id}`)?.focus());
  };

  return (
    <div
      className="scrollbar-none overflow-x-auto border-b border-[#e5ddd3] bg-white/40"
      role="tablist"
      aria-label="Avatar customization categories"
    >
      <div className="flex min-w-max gap-1.5 p-2.5">
        {categories.map((category, index) => {
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
              onKeyDown={(event) => {
                if (event.key === "ArrowRight") { event.preventDefault(); moveFocus(index, 1); }
                if (event.key === "ArrowLeft") { event.preventDefault(); moveFocus(index, -1); }
              }}
              className={[
                "rounded-2xl px-3 py-2 text-xs font-semibold transition-all sm:text-sm",
                "focus-visible:outline-none focus-visible:ring-2",
                "focus-visible:ring-white focus-visible:ring-offset-2",
                "focus-visible:ring-[#7c5cff] focus-visible:ring-offset-[#f7f2e9]",
                selected
                  ? "bg-[#30263d] text-white shadow-md"
                  : "text-[#746a7d] hover:bg-white hover:text-[#30263d]",
              ].join(" ")}
            >
              <span className="mr-1.5" aria-hidden="true">{category.icon}</span>{category.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
