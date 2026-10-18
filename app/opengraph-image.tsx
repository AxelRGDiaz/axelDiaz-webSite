import { ImageResponse } from "next/og"
import { join } from "node:path"
import { readFile } from "node:fs/promises"
import { PERSONAL_INFO } from "@/lib/data"
import { spriteSvg } from "@/lib/sprite"

export const alt = `${PERSONAL_INFO.name} — Desarrollador full stack`
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

// Imagen que aparece al compartir el enlace (LinkedIn, WhatsApp, etc.)
export default async function OpengraphImage() {
  const [pixel, screen] = await Promise.all([
    readFile(join(process.cwd(), "assets/fonts/PressStart2P-Regular.ttf")),
    readFile(join(process.cwd(), "assets/fonts/VT323-Regular.ttf")),
  ])
  const sprite = `data:image/svg+xml;base64,${Buffer.from(spriteSvg(20)).toString("base64")}`
  const [first, ...rest] = PERSONAL_INFO.name.toUpperCase().split(" ")

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          padding: 40,
          background: "#0f380f",
        }}
      >
        <div
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            gap: 56,
            padding: "0 64px",
            background: "#c4cfa1",
            border: "8px solid #306230",
            color: "#0f380f",
          }}
        >
          <img src={sprite} width={240} height={280} alt="" />
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <div style={{ fontFamily: "Pixel", fontSize: 18, color: "#306230" }}>1 JUGADOR · COLIMA, MX</div>
            <div style={{ display: "flex", flexDirection: "column", fontFamily: "Pixel", fontSize: 50, lineHeight: 1.35 }}>
              <span>{first}</span>
              <span>{rest.join(" ")}</span>
            </div>
            <div style={{ fontFamily: "Screen", fontSize: 44 }}>Desarrollador full stack · Rails + Vue</div>
            <div style={{ fontFamily: "Pixel", fontSize: 20 }}>▶ PRESIONA START</div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Pixel", data: pixel, style: "normal", weight: 400 },
        { name: "Screen", data: screen, style: "normal", weight: 400 },
      ],
    }
  )
}
