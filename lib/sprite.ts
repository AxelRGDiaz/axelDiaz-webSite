// Personaje de 12×14 píxeles: k = tinta, d = oscuro, l = medio, w = claro
export const SPRITE_MAP = [
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

export const SPRITE_RECTS = SPRITE_MAP.flatMap((row, y) =>
  row.split("").flatMap((ch, x) => (COLORS[ch] ? [{ x, y, fill: COLORS[ch] }] : []))
)

// SVG del personaje como texto, para usarlo fuera de React (imagen para compartir)
export function spriteSvg(size: number) {
  const rects = SPRITE_RECTS.map((r) => `<rect x="${r.x}" y="${r.y}" width="1" height="1" fill="${r.fill}"/>`).join("")
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${12 * size}" height="${SPRITE_MAP.length * size}" viewBox="0 0 12 ${SPRITE_MAP.length}" shape-rendering="crispEdges">${rects}</svg>`
}
