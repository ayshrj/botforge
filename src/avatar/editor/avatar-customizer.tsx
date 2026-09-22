"use client";

import NextImage from "next/image";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

import {
  avatarEditorAssetRegistry,
  BotAvatar,
  type AvatarConfig,
} from "./avatar-editor-adapter";
import { AssetSelector } from "./asset-selector";
import { downloadPng } from "./avatar-export";
import { loadAvatarConfig, saveAvatarConfig, serializeAvatarConfig } from "./avatar-storage";
import { CategoryNav } from "./category-nav";
import { ColorSwatchPicker } from "./color-swatch-picker";
import {
  accentColorOptions,
  accessoryOptions,
  backgroundColorOptions,
  createDefaultAvatarConfig,
  editorCategories,
  earOptions,
  faceOptions,
  facialHairOptions,
  glassesOptions,
  hairColorOptions,
  hairOptions,
  headwearOptions,
  poseOptions,
  skinColorOptions,
  type EditorCategoryId,
} from "./editor-options";

// The preview can occupy more than 512 CSS pixels on desktop and needs enough
// density for high-DPI displays. PNG encoding itself is lossless.
const PREVIEW_RASTER_SIZE = 1536;

function svgToPngDataUrl(
  svg: SVGSVGElement,
  width: number,
  height: number,
): Promise<string> {
  const source = new XMLSerializer().serializeToString(svg);
  const url = URL.createObjectURL(
    new Blob([source], { type: "image/svg+xml;charset=utf-8" }),
  );

  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => {
      try {
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const context = canvas.getContext("2d");
        if (!context) throw new Error("Canvas is unavailable.");
        context.drawImage(image, 0, 0, width, height);
        resolve(canvas.toDataURL("image/png"));
      } catch (error) {
        reject(error);
      } finally {
        URL.revokeObjectURL(url);
      }
    };
    image.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Could not rasterize the avatar."));
    };
    image.src = url;
  });
}

interface AvatarCustomizerProps {
  initialConfig?: AvatarConfig;
  showCustomColorPicker?: boolean;
  onConfigChange?: (config: AvatarConfig) => void;
}

interface HistoryState {
  past: AvatarConfig[];
  present: AvatarConfig;
  future: AvatarConfig[];
}

export function AvatarCustomizer({
  initialConfig,
  showCustomColorPicker = true,
  onConfigChange,
}: AvatarCustomizerProps) {
  const [history, setHistory] = useState<HistoryState>(() => ({
    past: [],
    present: initialConfig ?? createDefaultAvatarConfig(),
    future: [],
  }));
  const [activeCategory, setActiveCategory] = useState<EditorCategoryId>("face");
  const [exportOpen, setExportOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const avatarRef = useRef<SVGSVGElement>(null);
  const hydrated = useRef(Boolean(initialConfig));
  const config = history.present;

  const announce = useCallback((message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(null), 2200);
  }, []);

  const commit = useCallback((next: AvatarConfig) => {
    setHistory((current) => ({
      past: [...current.past.slice(-39), current.present],
      present: next,
      future: [],
    }));
    onConfigChange?.(next);
  }, [onConfigChange]);

  const updateConfig = useCallback(<K extends keyof AvatarConfig>(
    key: K,
    value: AvatarConfig[K],
  ) => {
    commit({ ...config, [key]: value });
  }, [commit, config]);

  const undo = useCallback(() => {
    setHistory((current) => {
      const previous = current.past.at(-1);
      if (!previous) return current;
      onConfigChange?.(previous);
      return {
        past: current.past.slice(0, -1),
        present: previous,
        future: [current.present, ...current.future],
      };
    });
  }, [onConfigChange]);

  const redo = useCallback(() => {
    setHistory((current) => {
      const next = current.future[0];
      if (!next) return current;
      onConfigChange?.(next);
      return {
        past: [...current.past, current.present],
        present: next,
        future: current.future.slice(1),
      };
    });
  }, [onConfigChange]);

  useEffect(() => {
    if (initialConfig || hydrated.current) return;
    const saved = loadAvatarConfig();
    const timer = window.setTimeout(() => {
      hydrated.current = true;
      if (!saved) return;
      setHistory({ past: [], present: saved, future: [] });
      onConfigChange?.(saved);
    }, 0);
    return () => window.clearTimeout(timer);
  }, [initialConfig, onConfigChange]);

  useEffect(() => {
    if (!hydrated.current && !initialConfig) return;
    saveAvatarConfig(config);
  }, [config, initialConfig]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!(event.metaKey || event.ctrlKey) || event.key.toLowerCase() !== "z") return;
      event.preventDefault();
      if (event.shiftKey) redo(); else undo();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [redo, undo]);

  const resetAvatar = () => {
    commit(createDefaultAvatarConfig());
    announce("Avatar reset");
  };

  const randomize = () => {
    const pick = <T,>(values: readonly T[]): T => values[Math.floor(Math.random() * values.length)];
    commit({
      ...config,
      headPose: pick(poseOptions).id,
      background: pick(backgroundColorOptions).value,
      faceShape: pick(faceOptions),
      skinColor: pick(skinColorOptions).value,
      hairStyle: pick(["hair-none" as const, ...hairOptions]),
      hairColor: pick(hairColorOptions).value,
      glasses: pick(["glasses-none" as const, ...glassesOptions]),
      glassesColor: pick(accentColorOptions).value,
      facialHair: pick(["facial-hair-none" as const, ...facialHairOptions]),
      facialHairColor: pick(hairColorOptions).value,
      headwear: pick(["headwear-none" as const, ...headwearOptions]),
      headwearColor: pick(accentColorOptions).value,
      ears: pick(earOptions),
      accessory: pick(["accessory-none" as const, ...accessoryOptions]),
      accessoryColor: pick(accentColorOptions).value,
    });
    announce("Fresh bot forged");
  };

  const copyConfig = async () => {
    try {
      await navigator.clipboard.writeText(serializeAvatarConfig(config));
      announce("Config copied");
    } catch {
      announce("Clipboard access is unavailable");
    }
  };

  const exportAvatar = async (format: number) => {
    if (!avatarRef.current) return;
    setExportOpen(false);
    try {
      await downloadPng(avatarRef.current, format);
      announce(`${format}px PNG downloaded`);
    } catch {
      announce("Export failed — please try again");
    }
  };

  return (
    <section className="mx-auto w-full max-w-[1440px]" aria-label="BotForge avatar customizer">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2" aria-label="Editing history">
          <ActionButton label="Undo" icon="↶" onClick={undo} disabled={!history.past.length} />
          <ActionButton label="Redo" icon="↷" onClick={redo} disabled={!history.future.length} />
        </div>
        <div className="flex flex-wrap items-center justify-end gap-2">
          <ActionButton label="Reset" icon="↺" onClick={resetAvatar} />
          <ActionButton label="Randomize" icon="✦" onClick={randomize} featured />
          <ActionButton label="Copy config" icon="{}" onClick={copyConfig} />
          <div className="relative">
            <ActionButton label="Export" icon="↓" onClick={() => setExportOpen((open) => !open)} />
            {exportOpen && (
              <div className="absolute right-0 z-30 mt-2 w-52 overflow-hidden rounded-2xl border border-[#ddd2c7] bg-white p-1.5 shadow-2xl">
                {[512, 1024, 2048].map((size) => (
                  <ExportButton key={size} label={`PNG · ${size} × ${size}`} onClick={() => exportAvatar(size)} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="grid items-start gap-5 lg:grid-cols-[minmax(0,1.08fr)_minmax(420px,0.92fr)]">
        <AvatarPreview config={config} avatarRef={avatarRef} />
        <div className="min-w-0 overflow-hidden rounded-[2rem] border border-[#ded5ca] bg-[#f7f2e9]/95 shadow-[0_26px_70px_rgba(60,42,76,0.12)] backdrop-blur">
          <div className="px-5 pb-4 pt-5 sm:px-6">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#8a6fc4]">Workshop</p>
            <h2 className="mt-1 text-xl font-bold tracking-tight text-[#30263d]">Build your bot</h2>
          </div>
          <CategoryNav categories={editorCategories} activeCategory={activeCategory} onChange={setActiveCategory} />
          <div id={`avatar-editor-panel-${activeCategory}`} role="tabpanel" aria-labelledby={`avatar-editor-tab-${activeCategory}`} className="min-h-[31rem] p-5 sm:p-6">
            <EditorPanel
              category={activeCategory}
              config={config}
              updateConfig={updateConfig}
              showCustomColorPicker={showCustomColorPicker}
            />
          </div>
        </div>
      </div>

      <div aria-live="polite" className="pointer-events-none fixed inset-x-0 bottom-6 z-50 flex justify-center">
        {toast && <div className="rounded-full bg-[#30263d] px-5 py-2.5 text-sm font-semibold text-white shadow-xl">{toast}</div>}
      </div>
    </section>
  );
}

function AvatarPreview({ config, avatarRef }: { config: AvatarConfig; avatarRef: React.RefObject<SVGSVGElement | null> }) {
  const [pngDataUrl, setPngDataUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!avatarRef.current) return;
    let cancelled = false;

    svgToPngDataUrl(
      avatarRef.current,
      PREVIEW_RASTER_SIZE,
      PREVIEW_RASTER_SIZE,
    )
      .then((dataUrl) => {
        if (!cancelled) setPngDataUrl(dataUrl);
      })
      .catch(() => {
        if (!cancelled) setPngDataUrl(null);
      });

    return () => {
      cancelled = true;
    };
  }, [config, avatarRef]);

  return (
    <div className="lg:sticky lg:top-6">
      <div className="overflow-hidden rounded-[2rem] border border-white/70 bg-white/50 p-3 shadow-[0_30px_80px_rgba(71,50,91,0.16)] backdrop-blur sm:p-4">
        <div className="preview-shell relative aspect-square overflow-hidden rounded-[1.6rem]">
          <div className="absolute left-5 top-5 z-10 rounded-full bg-white/75 px-3 py-1.5 text-xs font-bold text-[#564665] shadow-sm backdrop-blur">Live preview</div>
          {pngDataUrl ? (
            <NextImage
              src={pngDataUrl}
              alt="Avatar preview"
              fill
              unoptimized
              sizes="(max-width: 1024px) 100vw, 54vw"
              className="avatar-float object-contain"
            />
          ) : (
            <div className="grid h-full w-full place-items-center text-sm font-semibold text-[#564665]">
              Preparing preview…
            </div>
          )}
          <div className="pointer-events-none absolute h-px w-px overflow-hidden opacity-0" aria-hidden="true">
            <BotAvatar
              ref={avatarRef}
              config={config}
              registry={avatarEditorAssetRegistry}
            />
          </div>
        </div>
      </div>
      <p className="mt-3 text-center text-xs font-medium text-[#81778a]">Every BotForge avatar stays deterministic and export-ready.</p>
    </div>
  );
}

type UpdateConfig = <K extends keyof AvatarConfig>(key: K, value: AvatarConfig[K]) => void;

function EditorPanel({ category, config, updateConfig, showCustomColorPicker }: {
  category: EditorCategoryId;
  config: AvatarConfig;
  updateConfig: UpdateConfig;
  showCustomColorPicker: boolean;
}) {
  const previewFor = <K extends keyof AvatarConfig>(key: K) => {
    function AvatarOptionPreview(value: string) {
      return (
        <BotAvatar
          config={{ ...config, [key]: value }}
          registry={avatarEditorAssetRegistry}
          className="h-full w-full"
          aria-hidden="true"
        />
      );
    }

    return AvatarOptionPreview;
  };

  const asset = <K extends keyof AvatarConfig>(
    key: K,
    label: string,
    options: readonly AvatarConfig[K][],
    noneValue?: AvatarConfig[K],
  ) => (
    <AssetSelector
      label={label}
      options={options}
      value={config[key]}
      onChange={(value) => updateConfig(key, value)}
      noneValue={noneValue}
      renderPreview={previewFor(key)}
    />
  );

  const color = (key: keyof AvatarConfig, label: string, colors = accentColorOptions) => (
    <ColorSwatchPicker
      label={label}
      colors={colors}
      value={config[key]}
      onChange={(value) => updateConfig(key, value)}
      showCustomColorPicker={showCustomColorPicker}
    />
  );

  switch (category) {
    case "pose":
      return <PanelSection title="Strike a pose" description="Choose an upright stance or a playful lean.">
        <AssetSelector label="Head pose" options={poseOptions.map((pose) => pose.id)} value={config.headPose} onChange={(value) => updateConfig("headPose", value)} renderPreview={previewFor("headPose")} />
      </PanelSection>;
    case "face":
      return <PanelSection title="Face shape" description="All features adapt to each silhouette.">{asset("faceShape", "Face shape", faceOptions)}</PanelSection>;
    case "skin":
      return <PanelSection title="Skin tone" description="Pick a palette color or create your own.">{color("skinColor", "Skin color", skinColorOptions)}</PanelSection>;
    case "hair":
      return <PanelSection title="Hair style" description="Go polished, playful, or proudly bald.">{asset("hairStyle", "Hair style", hairOptions, "hair-none")}</PanelSection>;
    case "hairColor":
      return <PanelSection title="Hair color" description="Recolor every compatible hairstyle.">{color("hairColor", "Hair color", hairColorOptions)}</PanelSection>;
    case "glasses":
      return <PanelSection title="Glasses" description="Frames stay aligned with both capsule eyes.">
        {asset("glasses", "Glasses", glassesOptions, "glasses-none")}
        <Subsection title="Frame color">{color("glassesColor", "Glasses color")}</Subsection>
      </PanelSection>;
    case "facialHair":
      return <PanelSection title="Facial hair" description="Beards and moustaches follow the active face.">
        {asset("facialHair", "Facial hair", facialHairOptions, "facial-hair-none")}
        <Subsection title="Facial hair color">{color("facialHairColor", "Facial hair color", hairColorOptions)}</Subsection>
      </PanelSection>;
    case "headwear":
      return <PanelSection title="Headwear" description="Hats and headphones compose cleanly with hair.">
        {asset("headwear", "Headwear", headwearOptions, "headwear-none")}
        <Subsection title="Headwear color">{color("headwearColor", "Headwear color")}</Subsection>
      </PanelSection>;
    case "ears":
      return <PanelSection title="Ears" description="Choose human, animal, or fantasy ears.">{asset("ears", "Ears", earOptions)}</PanelSection>;
    case "accessories":
      return <PanelSection title="Accessories" description="Add a finishing detail to your bot.">
        {asset("accessory", "Accessory", accessoryOptions, "accessory-none")}
        <Subsection title="Accessory color">{color("accessoryColor", "Accessory color")}</Subsection>
      </PanelSection>;
    case "background":
      return <PanelSection title="Backdrop" description="Set the stage with a palette color or your own.">{color("background", "Background color", backgroundColorOptions)}</PanelSection>;
  }
}

function PanelSection({ title, description, children }: { title: string; description: string; children: ReactNode }) {
  return <div>
    <div className="mb-5">
      <h3 className="text-lg font-bold text-[#30263d]">{title}</h3>
      <p className="mt-1 max-w-xl text-sm leading-6 text-[#756b7e]">{description}</p>
    </div>
    {children}
  </div>;
}

function Subsection({ title, children }: { title: string; children: ReactNode }) {
  return <div className="mt-7 border-t border-[#ded5ca] pt-6">
    <h4 className="mb-4 text-sm font-bold text-[#50445c]">{title}</h4>
    {children}
  </div>;
}

function ActionButton({ label, icon, onClick, disabled, featured }: {
  label: string;
  icon: string;
  onClick: () => void;
  disabled?: boolean;
  featured?: boolean;
}) {
  return <button type="button" onClick={onClick} disabled={disabled} className={`action-button ${featured ? "action-button-featured" : ""}`}>
    <span aria-hidden="true">{icon}</span><span>{label}</span>
  </button>;
}

function ExportButton({ label, onClick }: { label: string; onClick: () => void }) {
  return <button type="button" onClick={onClick} className="block w-full rounded-xl px-3 py-2.5 text-left text-sm font-semibold text-[#50445c] hover:bg-[#f0ebff] hover:text-[#30263d]">{label}</button>;
}
