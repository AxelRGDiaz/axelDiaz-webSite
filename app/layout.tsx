import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { OSShell } from "@/components/layout/OSShell"
import { PERSONAL_INFO } from "@/lib/data"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  metadataBase: new URL("https://axeldiaz.dev"),
  title: {
    default: `${PERSONAL_INFO.name} — ${PERSONAL_INFO.title}`,
    template: `%s | ${PERSONAL_INFO.name}`,
  },
  description: PERSONAL_INFO.bio,
  keywords: [
    "Full Stack Developer",
    "Ruby on Rails",
    "React",
    "Node.js",
    "TypeScript",
    "AWS",
    "Software Engineer",
    "México",
    "Axel Díaz",
  ],
  authors: [{ name: PERSONAL_INFO.name, url: "https://axeldiaz.dev" }],
  creator: PERSONAL_INFO.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://axeldiaz.dev",
    title: `${PERSONAL_INFO.name} — ${PERSONAL_INFO.title}`,
    description: PERSONAL_INFO.bio,
    siteName: "DIAZ OS",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${PERSONAL_INFO.name} — ${PERSONAL_INFO.title}`,
    description: PERSONAL_INFO.bio,
    images: ["/og-image.png"],
    creator: "@axeldiaz",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#09090b" />
        <script
          dangerouslySetInnerHTML={{
            __html: `try{const t=localStorage.getItem('diaz-os-theme')||(window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');document.documentElement.classList.toggle('dark',t==='dark')}catch(e){}`,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased bg-zinc-50 dark:bg-zinc-950`}
      >
        <OSShell>{children}</OSShell>
      </body>
    </html>
  )
}
