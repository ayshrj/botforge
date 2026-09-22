"use client";

import { useState } from "react";
import { HAIR_STYLE_GROUPS, hairStyleGroups, type HairStyleGroup } from "../assets/hair/style-groups";
import type { AvatarConfig } from "../types";
import { AssetSelector } from "./asset-selector";
import { ColorSwatchPicker } from "./color-swatch-picker";
import { hairColorOptions, hairOptions } from "./editor-options";
import { PngAvatar } from "./png-avatar";

interface HairPanelProps {
  config: AvatarConfig;
  onHairChange: (id: AvatarConfig["hairStyle"]) => void;
  onColorChange: (color: string) => void;
  showCustomColorPicker: boolean;
}

export function HairPanel({ config, onHairChange, onColorChange, showCustomColorPicker }: HairPanelProps) {
  const [group, setGroup] = useState<HairStyleGroup>("All");
  const options = hairOptions.filter((id) =>
    group === "All" || (id !== "hair-none" && hairStyleGroups[id] === group),
  );

  return <div className="hair-panel">
    <div className="mb-5 flex items-start justify-between gap-3">
      <div>
        <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.18em] text-[#876cae]">The hair studio</p>
        <h3 className="text-xl font-bold text-[#30263d]">Find your signature cut.</h3>
        <p className="mt-1 text-sm leading-6 text-[#756b7e]">Sculpted shapes, soft layers, a little attitude.</p>
      </div>
      <span className="shrink-0 whitespace-nowrap rounded-full bg-[#eae2f3] px-3 py-1.5 text-xs font-bold text-[#7655a2]">{hairOptions.length} cuts</span>
    </div>
    <div className="hair-filters" aria-label="Filter hairstyles">
      {HAIR_STYLE_GROUPS.map((item) => <button key={item} type="button"
        aria-pressed={group === item} onClick={() => setGroup(item)}>{item}</button>)}
    </div>
    <AssetSelector label="Hair style" options={options} value={config.hairStyle}
      onChange={onHairChange} noneValue="hair-none"
      renderPreview={(hairStyle) => <PngAvatar config={{ ...config, hairStyle }} />} />
    <div className="mt-6 border-t border-[#ded5ca] pt-5">
      <h4 className="mb-3 text-sm font-bold text-[#50445c]">Make it your color</h4>
      <ColorSwatchPicker label="Hair color" colors={hairColorOptions} value={config.hairColor}
        onChange={onColorChange} showCustomColorPicker={showCustomColorPicker} />
    </div>
  </div>;
}
