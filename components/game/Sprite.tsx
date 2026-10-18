// Personaje de 12×14 píxeles: k = tinta, d = oscuro, l = medio, w = claro
const MAP = [
  "....kkkk....",
  "...kddddk...",
  "..kddddddk..",
  "..kwkwwkwk..",
  "..kwwwwwwk..",
  "...kwkkwk...",
  "....kwwk....",
  "..kkllllkk..",
  ".kllllllllk.",
  ".kllkkkkllk.",
  "kkkkddddkkkk",
  "kddddddddddk",
  "kkkkkkkkkkkk",
  ".kk......kk.",
]

const COLORS: Record<string, string> = {
  k: "#0f380f",
  d: "#306230",
  l: "#8bac0f",
  w: "#dce3c0",
}

const RECTS = MAP.flatMap((row, y) =>
  row.split("").flatMap((ch, x) => (COLORS[ch] ? [{ x, y, fill: COLORS[ch] }] : []))
)

export function Sprite({ label, size = 12 }: { label: string; size?: number }) {
  return (
    <svg
      role="img"
      aria-label={label}
      width={12 * size}
      height={MAP.length * size}
      viewBox={`0 0 12 ${MAP.length}`}
      shapeRendering="crispEdges"
      className="shrink-0"
    >
      {RECTS.map((r) => (
        <rect key={`${r.x}-${r.y}`} x={r.x} y={r.y} width={1} height={1} fill={r.fill} />
      ))}
    </svg>
  )
}
