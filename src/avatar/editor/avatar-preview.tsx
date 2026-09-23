"use client";

import type { RefObject } from "react";

import type { AvatarConfig } from "../types";

import { humanizeAssetId } from "./editor-options";

import { PngAvatar } from "./png-avatar";

export function AvatarPreview({
  config,
  avatarRef,
  motion,
  onMotionChange,
}: {
  config: AvatarConfig;

  avatarRef: RefObject<SVGSVGElement | null>;

  motion: boolean;

  onMotionChange: (motion: boolean) => void;
}) {
  return (
    <div className="lg:sticky lg:top-6">
      <div className="portrait-frame" data-motion={motion}>
        <div className="portrait-toolbar">
          <span className="portrait-label">
            <span className="live-dot" />
            Your character
          </span>

          <button
            type="button"
            className="motion-toggle"
            aria-pressed={motion}
            aria-label="Animate preview"
            title="Pause or play avatar motion"
            onClick={() => onMotionChange(!motion)}
          >
            <span aria-hidden="true">{motion ? "Ⅱ" : "▷"}</span>

            {motion ? "Motion on" : "Motion off"}
          </button>
        </div>

        <div
          className="preview-shell"
          data-motion={motion}
          onPointerMove={(event) => {
            if (!motion || event.pointerType !== "mouse") {
              return;
            }

            const bounds = event.currentTarget.getBoundingClientRect();

            const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 5;

            const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 5;

            event.currentTarget.style.setProperty("--portrait-x", `${x}px`);

            event.currentTarget.style.setProperty("--portrait-y", `${y}px`);
          }}
          onPointerLeave={(event) => {
            event.currentTarget.style.setProperty("--portrait-x", "0px");

            event.currentTarget.style.setProperty("--portrait-y", "0px");
          }}
        >
          <div className="portrait-interaction">
            <div className="portrait-artwork">
              <PngAvatar
                config={config}
                size={1536}
                animate={motion}
                sourceRef={avatarRef}
                alt="Avatar preview"
              />
            </div>
          </div>
        </div>

        <div className="portrait-caption">
          <div>
            <span className="portrait-caption-label">Made by you</span>

            <p>A little character. A lot of you.</p>
          </div>

          <span className="portrait-style">
            {humanizeAssetId(config.hairStyle)}
          </span>
        </div>
      </div>

      <p className="mt-4 text-center text-xs text-[#756b7e]">
        Try something unexpected. Every change is undoable.
      </p>
    </div>
  );
}
