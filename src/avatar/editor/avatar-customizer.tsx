"use client";

import { useState } from "react";

import {
  avatarEditorAssetRegistry,
  BotAvatar,
  type AvatarConfig,
} from "./avatar-editor-adapter";

import {
  accessoryOptions,
  createDefaultAvatarConfig,
  editorCategories,
  earOptions,
  faceOptions,
  facialHairOptions,
  glassesOptions,
  hairColorOptions,
  hairOptions,
  headwearOptions,
  skinColorOptions,
  type EditorCategoryId,
} from "./editor-options";

import { AssetSelector } from "./asset-selector";
import { CategoryNav } from "./category-nav";
import { ColorSwatchPicker } from "./color-swatch-picker";

interface AvatarCustomizerProps {
  initialConfig?: AvatarConfig;
  showCustomColorPicker?: boolean;
  onConfigChange?: (config: AvatarConfig) => void;
}

export function AvatarCustomizer({
  initialConfig,
  showCustomColorPicker = true,
  onConfigChange,
}: AvatarCustomizerProps) {
  const [config, setConfig] = useState<AvatarConfig>(
    () => initialConfig ?? createDefaultAvatarConfig(),
  );

  const [activeCategory, setActiveCategory] =
    useState<EditorCategoryId>("face");

  const updateConfig = <K extends keyof AvatarConfig>(
    key: K,
    value: AvatarConfig[K],
  ) => {
    setConfig((current) => {
      const next = {
        ...current,
        [key]: value,
      };

      onConfigChange?.(next);
      return next;
    });
  };

  const resetAvatar = () => {
    const next = initialConfig ?? createDefaultAvatarConfig();

    setConfig(next);
    onConfigChange?.(next);
  };

  return (
    <section
      className="mx-auto w-full max-w-7xl"
      aria-label="BotForge avatar customizer"
    >
      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(380px,520px)]">
        <AvatarPreview config={config} />

        <div className="min-w-0 overflow-hidden rounded-2xl border border-white/10 bg-neutral-900 shadow-2xl">
          <div className="flex items-center justify-between gap-4 px-4 py-4 sm:px-5">
            <div>
              <h1 className="text-lg font-semibold text-white">
                Customize avatar
              </h1>
              <p className="mt-1 text-sm text-neutral-400">
                Choose a category and update the preview instantly.
              </p>
            </div>

            <button
              type="button"
              onClick={resetAvatar}
              className={[
                "shrink-0 rounded-lg border border-white/10",
                "px-3 py-2 text-sm font-medium text-neutral-300",
                "hover:bg-white/10 hover:text-white",
                "focus-visible:outline-none focus-visible:ring-2",
                "focus-visible:ring-white focus-visible:ring-offset-2",
                "focus-visible:ring-offset-neutral-950",
              ].join(" ")}
            >
              Reset
            </button>
          </div>

          <CategoryNav
            categories={editorCategories}
            activeCategory={activeCategory}
            onChange={setActiveCategory}
          />

          <div
            id={`avatar-editor-panel-${activeCategory}`}
            role="tabpanel"
            aria-labelledby={`avatar-editor-tab-${activeCategory}`}
            className="min-h-[25rem] p-4 sm:p-5"
          >
            <EditorPanel
              category={activeCategory}
              config={config}
              updateConfig={updateConfig}
              showCustomColorPicker={showCustomColorPicker}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

interface AvatarPreviewProps {
  config: AvatarConfig;
}

function AvatarPreview({ config }: AvatarPreviewProps) {
  return (
    <div className="lg:sticky lg:top-6 lg:self-start">
      <div className="overflow-hidden rounded-2xl border border-white/10 bg-neutral-900 shadow-2xl">
        <div className="flex items-center justify-between border-b border-white/10 px-4 py-3 sm:px-5">
          <div>
            <h2 className="text-sm font-semibold text-white">Live preview</h2>
            <p className="text-xs text-neutral-400">512 × 512 SVG</p>
          </div>

          <span
            className="h-2.5 w-2.5 rounded-full bg-emerald-400"
            aria-label="Preview is live"
            title="Live preview"
          />
        </div>

        <div className="grid place-items-center p-3 sm:p-5 lg:p-7">
          <div className="aspect-square w-full max-w-[620px] overflow-hidden rounded-xl bg-[#181819]">
            <BotAvatar
              config={config}
              registry={avatarEditorAssetRegistry}
              className="block h-full w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

type UpdateConfig = <K extends keyof AvatarConfig>(
  key: K,
  value: AvatarConfig[K],
) => void;

interface EditorPanelProps {
  category: EditorCategoryId;
  config: AvatarConfig;
  updateConfig: UpdateConfig;
  showCustomColorPicker: boolean;
}

function EditorPanel({
  category,
  config,
  updateConfig,
  showCustomColorPicker,
}: EditorPanelProps) {
  switch (category) {
    case "face":
      return (
        <PanelSection
          title="Face"
          description="Choose the overall face silhouette."
        >
          <AssetSelector
            label="Face shape"
            options={faceOptions}
            value={config.faceShape}
            onChange={(value) => {
              if (value !== null) {
                updateConfig("faceShape", value);
              }
            }}
          />
        </PanelSection>
      );

    case "skin":
      return (
        <PanelSection
          title="Skin"
          description="Choose a preset or use any custom color."
        >
          <ColorSwatchPicker
            label="Skin color"
            colors={skinColorOptions}
            value={config.skinColor}
            onChange={(value) => updateConfig("skinColor", value)}
            showCustomColorPicker={showCustomColorPicker}
          />
        </PanelSection>
      );

    case "hair":
      return (
        <PanelSection
          title="Hair"
          description="Hair-front and hair-back layers are managed by the selected hairstyle asset."
        >
          <AssetSelector
            label="Hairstyle"
            options={hairOptions}
            value={config.hairStyle}
            onChange={(value) => {
              if (value !== null) {
                updateConfig("hairStyle", value);
              }
            }}
          />
        </PanelSection>
      );

    case "hairColor":
      return (
        <PanelSection
          title="Hair Color"
          description="The selected color is passed to recolorable hair assets."
        >
          <ColorSwatchPicker
            label="Hair color"
            colors={hairColorOptions}
            value={config.hairColor}
            onChange={(value) => updateConfig("hairColor", value)}
            showCustomColorPicker={showCustomColorPicker}
          />
        </PanelSection>
      );

    case "glasses":
      return (
        <PanelSection
          title="Glasses"
          description="Frames preserve full visibility of both capsule eyes."
        >
          <AssetSelector
            label="Glasses"
            options={glassesOptions}
            value={config.glasses}
            onChange={(value) =>
              updateConfig("glasses", value as AvatarConfig["glasses"])
            }
            allowNone
          />
        </PanelSection>
      );

    case "facialHair":
      return (
        <PanelSection
          title="Facial Hair"
          description="Facial-hair assets stay independent of the mouthless face design."
        >
          <AssetSelector
            label="Facial hair"
            options={facialHairOptions}
            value={config.facialHair}
            onChange={(value) =>
              updateConfig("facialHair", value as AvatarConfig["facialHair"])
            }
            allowNone
          />
        </PanelSection>
      );

    case "headwear":
      return (
        <PanelSection
          title="Headwear"
          description="Headwear is composed above the appropriate hair layers by the renderer."
        >
          <AssetSelector
            label="Headwear"
            options={headwearOptions}
            value={config.headwear}
            onChange={(value) =>
              updateConfig("headwear", value as AvatarConfig["headwear"])
            }
            allowNone
          />
        </PanelSection>
      );

    case "ears":
      return (
        <PanelSection
          title="Ears"
          description="Choose an ear shape using the shared BotForge anchor system."
        >
          <AssetSelector
            label="Ears"
            options={earOptions}
            value={config.ears}
            onChange={(value) => {
              if (value !== null) {
                updateConfig("ears", value);
              }
            }}
          />
        </PanelSection>
      );

    case "accessories":
      return (
        <PanelSection
          title="Accessories"
          description="Add one foreground or anchored accessory."
        >
          <AssetSelector
            label="Accessory"
            options={accessoryOptions}
            value={config.accessory}
            onChange={(value) =>
              updateConfig("accessory", value as AvatarConfig["accessory"])
            }
            allowNone
          />
        </PanelSection>
      );

    default:
      return null;
  }
}

interface PanelSectionProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

function PanelSection({ title, description, children }: PanelSectionProps) {
  return (
    <div>
      <div className="mb-5">
        <h2 className="text-base font-semibold text-white">{title}</h2>
        <p className="mt-1 max-w-xl text-sm leading-6 text-neutral-400">
          {description}
        </p>
      </div>

      {children}
    </div>
  );
}
