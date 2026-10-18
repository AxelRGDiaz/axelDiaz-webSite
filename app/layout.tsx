import type { Metadata, Viewport } from "next"
import { Press_Start_2P, VT323 } from "next/font/google"
import "./globals.css"
import { LanguageProvider } from "@/contexts/LanguageContext"
import { TopBar } from "@/components/game/TopBar"
import { Footer } from "@/components/game/Footer"
import { PERSONAL_INFO, SITE_URL } from "@/lib/data"

const pressStart = Press_Start_2P({
  weight: "400",
  variable: "--font-press-start",
  subsets: ["latin"],
})

const vt323 = VT323({
  weight: "400",
  variable: "--font-vt323",
  subsets: ["latin"],
})

const description =
  "Axel Díaz (Axel Guerrero Díaz), desarrollador full stack en Colima, México. Ruby on Rails, Vue 3 y PostgreSQL/MySQL. Creador de Plantelia."

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${PERSONAL_INFO.name} — Desarrollador full stack`,
    template: `%s | ${PERSONAL_INFO.name}`,
  },
  description,
  alternates: {
    canonical: "/",
  },
  keywords: [
    "Desarrollador full stack",
    "Full Stack Developer",
    "Ruby on Rails",
    "Vue 3",
    "PostgreSQL",
    "Sidekiq",
    "Colima",
    "México",
    "Axel Guerrero Díaz",
    "Axel Díaz",
  ],
  authors: [{ name: PERSONAL_INFO.name, url: SITE_URL }],
  creator: PERSONAL_INFO.name,
  openGraph: {
    type: "website",
    locale: "es_MX",
    alternateLocale: ["en_US"],
    url: SITE_URL,
    title: `${PERSONAL_INFO.name} — Desarrollador full stack`,
    description,
    siteName: PERSONAL_INFO.name,
  },
  twitter: {
    card: "summary_large_image",
    title: `${PERSONAL_INFO.name} — Desarrollador full stack`,
    description,
  },
  robots: {
    index: true,
    follow: true,
  },
}

export const viewport: Viewport = {
  themeColor: "#0f380f",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className={`${pressStart.variable} ${vt323.variable}`}>
      <body className="min-h-screen antialiased">
        <LanguageProvider>
          <TopBar />
          <main>{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  )
}
