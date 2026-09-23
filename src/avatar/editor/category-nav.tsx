import { useLayoutEffect, useRef, useState } from "react";
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
  const trackRef = useRef<HTMLDivElement>(null);
  const [indicator, setIndicator] = useState({ left: 0, top: 0, width: 0, height: 0, ready: false });

  useLayoutEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const place = () => {
      const selected = track.querySelector<HTMLElement>('[aria-selected="true"]');
      if (!selected) return;
      setIndicator({
        left: selected.offsetLeft,
        top: selected.offsetTop,
        width: selected.offsetWidth,
        height: selected.offsetHeight,
        ready: true,
      });
    };

    place();
    const observer = new ResizeObserver(place);
    observer.observe(track);
    return () => observer.disconnect();
  }, [activeCategory, categories]);

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
      <div ref={trackRef} className="relative flex min-w-max gap-1.5 p-2.5">
        <span
          aria-hidden="true"
          className="category-tab-indicator"
          data-ready={indicator.ready}
          style={{
            width: indicator.width,
            height: indicator.height,
            transform: `translate(${indicator.left}px, ${indicator.top}px)`,
          }}
        />
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
                "category-tab relative z-10 rounded-2xl px-3 py-2 text-xs font-semibold transition-colors sm:text-sm",
                "focus-visible:outline-none focus-visible:ring-2",
                "focus-visible:ring-white focus-visible:ring-offset-2",
                "focus-visible:ring-[#7c5cff] focus-visible:ring-offset-[#f7f2e9]",
                selected
                  ? "text-white"
                  : "text-[#746a7d] hover:bg-white/80 hover:text-[#30263d]",
              ].join(" ")}
            >
              <span className="category-tab-icon mr-1.5 inline-block" aria-hidden="true">{category.icon}</span>{category.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
