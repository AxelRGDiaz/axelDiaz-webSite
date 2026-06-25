"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import {
  LayoutDashboard,
  FolderOpen,
  GitBranch,
  FlaskConical,
  FileText,
  MessageSquare,
  Command,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { NAV_ITEMS } from "@/lib/data"
import { openCommandPalette } from "@/hooks/useCommandPalette"
import { useLang } from "@/contexts/LanguageContext"

const ICONS: Record<string, React.ElementType> = {
  LayoutDashboard,
  FolderOpen,
  GitBranch,
  FlaskConical,
  FileText,
  MessageSquare,
}

const NAV_LABEL_KEY: Record<string, keyof typeof import("@/lib/i18n").translations.en.nav> = {
  dashboard: "dashboard",
  projects: "projects",
  career: "career",
  lab: "lab",
  cv: "cv",
  contact: "contact",
}

export function Sidebar() {
  const pathname = usePathname()
  const { t } = useLang()

  return (
    <aside className="fixed left-0 top-0 h-full w-14 flex flex-col items-center py-4 gap-2 border-r border-black/[0.08] dark:border-white/[0.06] bg-white/90 dark:bg-zinc-950/80 backdrop-blur-xl z-50 transition-colors duration-200">
      {/* Logo */}
      <div className="mb-4">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold select-none">
          AD
        </div>
      </div>

      {/* Nav Items */}
      <nav className="flex flex-col gap-1 flex-1">
        {NAV_ITEMS.map((item) => {
          const Icon = ICONS[item.icon]
          const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href))
          const labelKey = NAV_LABEL_KEY[item.id]
          const label = labelKey ? t.nav[labelKey] : item.label

          return (
            <div key={item.id} className="group relative">
              <Link href={item.href}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={cn(
                    "relative w-9 h-9 rounded-lg flex items-center justify-center transition-colors cursor-pointer",
                    isActive
                      ? "bg-black/10 dark:bg-white/10 text-zinc-900 dark:text-white"
                      : "text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-black/[0.06] dark:hover:bg-white/[0.06]"
                  )}
                >
                  {isActive && (
                    <motion.div
                      layoutId="sidebar-active"
                      className="absolute inset-0 rounded-lg bg-black/10 dark:bg-white/10"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                    />
                  )}
                  <Icon className="w-4 h-4 relative z-10" />
                  {item.badge && (
                    <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-indigo-500 text-white text-[8px] font-bold flex items-center justify-center">
                      {item.badge}
                    </span>
                  )}
                </motion.div>
              </Link>
              {/* Tooltip */}
              <div className="pointer-events-none absolute left-full ml-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-150 z-50">
                <div className="bg-zinc-900 dark:bg-zinc-800 border border-white/10 text-white text-xs px-2.5 py-1.5 rounded-lg whitespace-nowrap shadow-xl">
                  {label}
                </div>
              </div>
            </div>
          )
        })}
      </nav>

      {/* Bottom actions */}
      <div className="flex flex-col gap-1">
        <div className="group relative">
          <button
            onClick={openCommandPalette}
            className="w-9 h-9 rounded-lg flex items-center justify-center text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-black/[0.06] dark:hover:bg-white/[0.06] transition-colors"
          >
            <Command className="w-4 h-4" />
          </button>
          <div className="pointer-events-none absolute left-full ml-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-150 z-50">
            <div className="bg-zinc-900 dark:bg-zinc-800 border border-white/10 text-white text-xs px-2.5 py-1.5 rounded-lg whitespace-nowrap shadow-xl flex items-center gap-1.5">
              Command Palette <span className="opacity-50 font-mono">⌘K</span>
            </div>
          </div>
        </div>

        {/* Available indicator */}
        <div className="w-9 h-9 flex items-center justify-center">
          <div className="relative">
            <div className="w-2 h-2 rounded-full bg-emerald-400">
              <div className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-60" />
            </div>
          </div>
        </div>
      </div>
    </aside>
  )
}
