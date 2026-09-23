"use client";

import NextImage from "next/image";

import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type RefObject,
} from "react";

import {
  getSelectedEyeAnimation,
  getSelectedMovementAnimations,
} from "../animation/registry";

import type { AvatarEyeSequence } from "../animation/types";

import { BotAvatar } from "../bot-avatar";

import type { AvatarConfig } from "../types";

import { rasterizeAvatar, type AvatarFrameVariant } from "./avatar-raster";

interface PngAvatarProps {
  config: AvatarConfig;
  size?: number;

  /**
   * Master playback switch.
   *
   * The actual selected effects are stored in
   * config.animations.
   */
  animate?: boolean;

  alt?: string;

  sourceRef?: RefObject<SVGSVGElement | null>;
}

interface RasterFrame {
  name: AvatarFrameVariant;
  src: string;
}

/**
 * Visible avatar renderer used by the editor.
 *
 * BotAvatar remains the canonical static SVG source.
 * PngAvatar layers presentation animation over rasterized
 * versions of that source.
 */
export function PngAvatar({
  config,
  size = 320,
  animate = false,
  alt = "",
  sourceRef,
}: PngAvatarProps) {
  const localRef = useRef<SVGSVGElement>(null);

  const svgRef = sourceRef ?? localRef;

  const [frames, setFrames] = useState<RasterFrame[]>([]);

  const [error, setError] = useState(false);

  const configKey = JSON.stringify(config);

  const eyeAnimation = animate
    ? getSelectedEyeAnimation(config.animations)
    : null;

  const movementAnimations = animate
    ? getSelectedMovementAnimations(config.animations)
    : [];

  const eyeSequence = eyeAnimation?.eyeSequence ?? null;

  useEffect(() => {
    if (!svgRef.current) {
      return;
    }

    const source = svgRef.current;

    const controller = new AbortController();

    const urls: string[] = [];

    const frameNames = getEyeFrames(eyeSequence);

    async function render() {
      try {
        const nextFrames: RasterFrame[] = [];

        for (const name of frameNames) {
          const blob = await rasterizeAvatar(
            source,
            size,
            name,
            controller.signal,
          );

          if (controller.signal.aborted) {
            return;
          }

          const url = URL.createObjectURL(blob);

          urls.push(url);

          const image = new Image();

          image.src = url;

          await image.decode();

          nextFrames.push({
            name,
            src: url,
          });
        }

        if (!controller.signal.aborted) {
          setFrames(nextFrames);

          setError(false);
        }
      } catch {
        if (!controller.signal.aborted) {
          setError(true);
        }
      }
    }

    void render();

    return () => {
      controller.abort();

      urls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [configKey, eyeSequence, size, svgRef]);

  const primaryFrame =
    frames.find((frame) => frame.name === "open") ?? frames[0];

  const overlayFrames = frames.filter((frame) => frame.name !== "open");

  let artwork: ReactNode = null;

  if (primaryFrame) {
    artwork = (
      <span
        key={primaryFrame.src}
        className={alt ? "png-avatar-appearance" : "png-avatar-still"}
      >
        <NextImage
          src={primaryFrame.src}
          alt={alt}
          width={size}
          height={size}
          unoptimized
          className="png-avatar-image"
          draggable={false}
        />

        {overlayFrames.map((frame) => (
          <NextImage
            key={frame.name}
            src={frame.src}
            alt=""
            aria-hidden="true"
            width={size}
            height={size}
            unoptimized
            draggable={false}
            className={frameClassName(frame.name)}
          />
        ))}
      </span>
    );

    /**
     * Every movement animation gets its own DOM wrapper.
     *
     * This is deliberate:
     * CSS transform animations cannot safely share the same
     * element because each animation would overwrite transform.
     *
     * Separate wrappers let Breathe + Float + Sway all operate
     * at the same time.
     */
    for (let index = movementAnimations.length - 1; index >= 0; index -= 1) {
      const animation = movementAnimations[index];

      artwork = (
        <span
          key={animation.id}
          className={`avatar-motion-layer ${animation.movementClassName}`}
        >
          {artwork}
        </span>
      );
    }
  }

  return (
    <span
      className="png-avatar"
      data-animated={animate && config.animations.length > 0}
      data-raster-ready={frames.length > 0}
    >
      {artwork}

      {!frames.length && (
        <span className="png-avatar-placeholder" aria-hidden={!alt}>
          {error ? "Preview unavailable" : alt ? "Preparing preview…" : ""}
        </span>
      )}

      {error && frames.length > 0 && alt && (
        <span className="png-avatar-error" role="status">
          Preview could not update
        </span>
      )}

      <span className="avatar-source" aria-hidden="true">
        <BotAvatar ref={svgRef} config={config} />
      </span>
    </span>
  );
}

function getEyeFrames(
  sequence: AvatarEyeSequence | null,
): readonly AvatarFrameVariant[] {
  switch (sequence) {
    case "blink":
      return ["open", "blink-half", "blink-closed"];

    case "wink-left":
      return ["open", "wink-left-half", "wink-left-closed"];

    case "wink-right":
      return ["open", "wink-right-half", "wink-right-closed"];

    case null:
      return ["open"];
  }
}

function frameClassName(frame: AvatarFrameVariant): string {
  switch (frame) {
    case "blink-half":
      return "png-avatar-frame blink-half";

    case "blink-closed":
      return "png-avatar-frame blink-closed";

    case "wink-left-half":
    case "wink-right-half":
      return "png-avatar-frame wink-half";

    case "wink-left-closed":
    case "wink-right-closed":
      return "png-avatar-frame wink-closed";

    case "open":
      return "png-avatar-frame";
  }
}
