"use client"

import { usePathname } from "next/navigation"
import { Sun, Moon, Search, ChevronRight } from "lucide-react"
import { useTheme } from "@/hooks/useTheme"
import { openCommandPalette } from "@/hooks/useCommandPalette"
import { useLang } from "@/contexts/LanguageContext"
import { PERSONAL_INFO } from "@/lib/data"
import { cn } from "@/lib/utils"

export function TopBar() {
  const pathname = usePathname()
  const { isDark, toggle } = useTheme()
  const { t, lang, toggleLang } = useLang()

  const BREADCRUMBS: Record<string, string[]> = {
    "/": [t.topbar.root, t.nav.dashboard],
    "/projects": [t.topbar.root, t.nav.projects],
    "/career": [t.topbar.root, t.nav.career],
    "/lab": [t.topbar.root, t.nav.lab],
    "/cv": [t.topbar.root, t.nav.cv],
    "/contact": [t.topbar.root, t.nav.contact],
  }

  const basePath = "/" + pathname.split("/")[1]
  const crumbs = BREADCRUMBS[basePath] ?? [t.topbar.root, "—"]

  return (
    <header className="fixed top-0 left-14 right-0 h-10 flex items-center justify-between px-4 border-b border-black/[0.08] dark:border-white/[0.06] bg-white/80 dark:bg-zinc-950/60 backdrop-blur-xl z-40 transition-colors duration-200">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-1.5 text-xs">
        {crumbs.map((crumb, i) => (
          <span key={crumb} className="flex items-center gap-1.5">
            {i > 0 && <ChevronRight className="w-3 h-3 text-zinc-400 dark:text-zinc-600" />}
            <span
              className={cn(
                i === crumbs.length - 1
                  ? "text-zinc-800 dark:text-zinc-200 font-medium"
                  : "text-zinc-400 dark:text-zinc-500"
              )}
            >
              {crumb}
            </span>
          </span>
        ))}
      </div>

      {/* Right actions */}
      <div className="flex items-center gap-2">
        {/* Search */}
        <button
          onClick={openCommandPalette}
          className="flex items-center gap-2 px-2.5 py-1 rounded-md border border-black/[0.08] dark:border-white/[0.08] bg-black/[0.03] dark:bg-white/[0.04] text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 hover:border-black/[0.14] dark:hover:border-white/[0.12] transition-all text-xs"
        >
          <Search className="w-3 h-3" />
          <span className="hidden sm:block">{t.topbar.search}</span>
          <kbd className="hidden sm:flex items-center gap-0.5 text-[10px] bg-black/[0.04] dark:bg-white/[0.06] rounded px-1 font-mono">
            ⌘K
          </kbd>
        </button>

        {/* Language toggle */}
        <button
          onClick={toggleLang}
          className="flex items-center gap-1 px-2 py-1 rounded-md border border-black/[0.08] dark:border-white/[0.08] bg-black/[0.03] dark:bg-white/[0.04] text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-200 transition-all text-[11px] font-mono font-medium"
          title={lang === "en" ? "Switch to Spanish" : "Cambiar a Inglés"}
        >
          <span className={cn("transition-opacity", lang === "en" ? "opacity-100" : "opacity-40")}>EN</span>
          <span className="text-zinc-300 dark:text-zinc-700">/</span>
          <span className={cn("transition-opacity", lang === "es" ? "opacity-100" : "opacity-40")}>ES</span>
        </button>

        {/* Theme toggle */}
        <button
          onClick={toggle}
          className="w-7 h-7 rounded-md flex items-center justify-center text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-black/[0.06] dark:hover:bg-white/[0.06] transition-colors"
          title={isDark ? "Switch to light mode" : "Switch to dark mode"}
        >
          {isDark ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
        </button>

        {/* Version badge */}
        <div className="hidden sm:flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400 text-[10px] font-mono">
          {PERSONAL_INFO.currentVersion}
        </div>
      </div>
    </header>
  )
}
