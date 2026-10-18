import { SPRITE_MAP, SPRITE_RECTS } from "@/lib/sprite"

export function Sprite({ label, size = 12 }: { label: string; size?: number }) {
  return (
    <svg
      role="img"
      aria-label={label}
      width={12 * size}
      height={SPRITE_MAP.length * size}
      viewBox={`0 0 12 ${SPRITE_MAP.length}`}
      shapeRendering="crispEdges"
      className="shrink-0"
    >
      {SPRITE_RECTS.map((r) => (
        <rect key={`${r.x}-${r.y}`} x={r.x} y={r.y} width={1} height={1} fill={r.fill} />
      ))}
    </svg>
  )
}
