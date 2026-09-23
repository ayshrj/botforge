import type { CSSProperties } from "react";

import {
  EYE_ANIMATIONS,
  MOVEMENT_ANIMATIONS,
  toggleAvatarAnimation,
} from "../animation/registry";

import type {
  AvatarAnimationDefinition,
  AvatarAnimationId,
} from "../animation/types";

interface AnimationSelectorProps {
  value: readonly AvatarAnimationId[];
  onChange: (value: AvatarAnimationId[]) => void;
}

export function AnimationSelector({ value, onChange }: AnimationSelectorProps) {
  const clearAnimations = () => {
    onChange([]);
  };

  const toggle = (id: AvatarAnimationId) => {
    onChange(toggleAvatarAnimation(value, id));
  };

  return (
    <fieldset>
      <legend className="sr-only">Avatar animations</legend>

      <div className="mb-7">
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.14em] text-[#8a7c94]">
          Playback
        </p>

        <button
          type="button"
          aria-pressed={value.length === 0}
          onClick={clearAnimations}
          className={[
            "asset-card relative w-full rounded-[1.35rem] border p-4 text-left",
            "transition-all duration-200",
            "focus-visible:outline-none focus-visible:ring-2",
            "focus-visible:ring-[#7655bd] focus-visible:ring-offset-2",
            "focus-visible:ring-offset-[#f7f2e9]",
            value.length === 0
              ? "border-[#7c5cff] bg-[#f0ebff] text-[#2c2438] shadow-[0_8px_22px_rgba(92,67,158,0.18)]"
              : "border-[#ded5ca] bg-white/80 text-[#554b5f] hover:-translate-y-0.5 hover:border-[#b7a5dd] hover:shadow-md",
          ].join(" ")}
        >
          <div className="flex items-start gap-3">
            <span
              className={[
                "grid h-10 w-10 shrink-0 place-items-center rounded-full text-lg",
                value.length === 0
                  ? "bg-[#7c5cff] text-white"
                  : "bg-[#eee7f5] text-[#7655bd]",
              ].join(" ")}
              aria-hidden="true"
            >
              ●
            </span>

            <div className="min-w-0">
              <span className="block text-sm font-bold">Still</span>

              <span className="mt-1 block text-xs leading-5 text-[#817487]">
                Disable all automatic avatar animations.
              </span>
            </div>
          </div>

          {value.length === 0 && (
            <span
              className="selection-mark absolute right-3 top-3 grid h-6 w-6 place-items-center rounded-full bg-[#7c5cff] text-xs text-white shadow"
              aria-hidden="true"
            >
              ✓
            </span>
          )}
        </button>
      </div>

      <AnimationGroup
        title="Eyes"
        description="Choose one eye animation. Selecting another replaces the current eye effect."
        animations={EYE_ANIMATIONS}
        selected={value}
        onToggle={toggle}
        staggerOffset={1}
      />

      <div className="mt-8">
        <AnimationGroup
          title="Movement"
          description="Combine as many movement animations as you like."
          animations={MOVEMENT_ANIMATIONS}
          selected={value}
          onToggle={toggle}
          staggerOffset={EYE_ANIMATIONS.length + 1}
        />
      </div>

      <div className="mt-6 rounded-2xl border border-[#ded5ca] bg-white/55 px-4 py-3">
        <p className="text-xs leading-5 text-[#756b7e]">
          <strong className="font-bold text-[#50445c]">{value.length}</strong>{" "}
          {value.length === 1 ? "animation" : "animations"} active. The Motion
          control above the preview can temporarily pause them without changing
          your selection.
        </p>
      </div>
    </fieldset>
  );
}

function AnimationGroup({
  title,
  description,
  animations,
  selected,
  onToggle,
  staggerOffset,
}: {
  title: string;
  description: string;
  animations: readonly AvatarAnimationDefinition[];
  selected: readonly AvatarAnimationId[];
  onToggle: (id: AvatarAnimationId) => void;
  staggerOffset: number;
}) {
  return (
    <div>
      <div className="mb-3">
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#8a7c94]">
          {title}
        </p>

        <p className="mt-1 text-xs leading-5 text-[#817487]">{description}</p>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {animations.map((animation, index) => (
          <AnimationCard
            key={animation.id}
            animation={animation}
            selected={selected.includes(animation.id)}
            onClick={() => onToggle(animation.id)}
            stagger={staggerOffset + index}
          />
        ))}
      </div>
    </div>
  );
}

function AnimationCard({
  animation,
  selected,
  onClick,
  stagger,
}: {
  animation: AvatarAnimationDefinition;
  selected: boolean;
  onClick: () => void;
  stagger: number;
}) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onClick}
      style={
        {
          "--stagger": stagger,
        } as CSSProperties
      }
      className={[
        "asset-card group relative min-h-36 overflow-hidden rounded-[1.35rem] border p-4 text-left",
        "transition-all duration-200",
        "focus-visible:outline-none focus-visible:ring-2",
        "focus-visible:ring-[#7655bd] focus-visible:ring-offset-2",
        "focus-visible:ring-offset-[#f7f2e9]",
        selected
          ? "border-[#7c5cff] bg-[#f0ebff] text-[#2c2438] shadow-[0_8px_22px_rgba(92,67,158,0.18)]"
          : "border-[#ded5ca] bg-white/80 text-[#554b5f] hover:-translate-y-0.5 hover:border-[#b7a5dd] hover:shadow-md",
      ].join(" ")}
    >
      <span
        className={[
          "mb-3 grid h-10 w-10 place-items-center rounded-full text-lg",
          selected ? "bg-[#7c5cff] text-white" : "bg-[#eee7f5] text-[#7655bd]",
        ].join(" ")}
        aria-hidden="true"
      >
        {animation.iconLucide ? (
          <animation.iconLucide className="h-4 w-4" />
        ) : (
          animation.icon
        )}
      </span>

      <span className="block pr-6 text-sm font-bold">{animation.label}</span>

      <span className="mt-1.5 block text-xs leading-5 text-[#817487]">
        {animation.description}
      </span>

      {selected && (
        <span
          className="selection-mark absolute right-3 top-3 grid h-6 w-6 place-items-center rounded-full bg-[#7c5cff] text-xs text-white shadow"
          aria-hidden="true"
        >
          ✓
        </span>
      )}
    </button>
  );
}
