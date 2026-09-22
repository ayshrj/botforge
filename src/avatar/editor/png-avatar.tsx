"use client";

import NextImage from "next/image";
import { useEffect, useRef, useState, type RefObject } from "react";
import { BotAvatar } from "../bot-avatar";
import type { AvatarConfig } from "../types";
import { rasterizeAvatar, type BlinkFrame } from "./avatar-raster";

interface PngAvatarProps {
  config: AvatarConfig;
  size?: number;
  animate?: boolean;
  alt?: string;
  sourceRef?: RefObject<SVGSVGElement | null>;
}

/** One renderer for both hero and thumbnails; only PNG images are visible. */
export function PngAvatar({
  config,
  size = 320,
  animate = false,
  alt = "",
  sourceRef,
}: PngAvatarProps) {
  const localRef = useRef<SVGSVGElement>(null);
  const svgRef = sourceRef ?? localRef;
  const [frames, setFrames] = useState<string[]>([]);
  const [error, setError] = useState(false);
  // Equal configs often arrive as new objects when a category or toast changes.
  // Use their values so that those renders do not rasterize the catalog again.
  const configKey = JSON.stringify(config);

  useEffect(() => {
    if (!svgRef.current) return;
    const source = svgRef.current;
    const controller = new AbortController();
    const urls: string[] = [];
    const frameNames: BlinkFrame[] = animate ? ["open", "half", "closed"] : ["open"];

    async function render() {
      try {
        for (const name of frameNames) {
          const blob = await rasterizeAvatar(source, size, name, controller.signal);
          if (controller.signal.aborted) return;
          const url = URL.createObjectURL(blob);
          urls.push(url);
          // Decode before swapping all frames together to avoid flashes.
          const image = new Image();
          image.src = url;
          await image.decode();
        }
        if (!controller.signal.aborted) {
          setFrames([...urls]);
          setError(false);
        }
      } catch {
        if (!controller.signal.aborted) setError(true);
      }
    }
    void render();
    return () => {
      controller.abort();
      urls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [configKey, size, animate, svgRef]);

  return (
    <span className="png-avatar" data-animated={animate} data-raster-ready={frames.length > 0}>
      {frames.length > 0 && <span key={frames[0]} className={alt ? "png-avatar-appearance" : "png-avatar-still"}>
        <NextImage
          src={frames[0]} alt={alt} width={size} height={size}
          unoptimized className="png-avatar-image" draggable={false}
        />
      {animate && frames.slice(1).map((src, index) => (
        <NextImage
          key={index} src={src} alt="" aria-hidden="true" width={size} height={size}
          unoptimized draggable={false}
          className={index === 0 ? "png-avatar-frame blink-half" : "png-avatar-frame blink-closed"}
        />
      ))}
      </span>}
      {!frames.length && <span className="png-avatar-placeholder" aria-hidden={!alt}>
        {error ? "Preview unavailable" : alt ? "Preparing preview…" : ""}
      </span>}
      {error && frames.length > 0 && alt && <span className="png-avatar-error" role="status">Preview could not update</span>}
      <span className="avatar-source" aria-hidden="true">
        <BotAvatar ref={svgRef} config={config} />
      </span>
    </span>
  );
}
