import type { HeadwearProps } from "./types";
export function HeadwearHeadphones({ primaryColor = "currentColor", secondaryColor, accentColor, anchors }: HeadwearProps) {
  if (!anchors) return null;
  const { left, right } = anchors.ears;
  return <g data-asset-id="headwear-headphones">
    <path d={`M ${left.x} ${left.y} C ${left.x-12} ${anchors.headTop.center.y-65}, ${right.x+12} ${anchors.headTop.center.y-65}, ${right.x} ${right.y}`}
      fill="none" stroke={primaryColor} strokeWidth="18" />
    {[left, right].map((p,i) => <g key={i}>
      <rect x={p.x-21} y={p.y-39} width="42" height="84" rx="20" fill={primaryColor} />
      <rect x={p.x-12} y={p.y-28} width="24" height="62" rx="12" fill={secondaryColor} />
      <circle cx={p.x} cy={p.y+2} r="5" fill={accentColor} />
    </g>)}
  </g>;
}
