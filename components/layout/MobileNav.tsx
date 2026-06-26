"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
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

export function MobileNav() {
  const pathname = usePathname()
  const { t } = useLang()

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 h-14 flex items-center justify-around border-t border-black/[0.08] dark:border-white/[0.06] bg-white/95 dark:bg-zinc-950/95 backdrop-blur-xl z-50 transition-colors duration-200">
      {NAV_ITEMS.map((item) => {
        const Icon = ICONS[item.icon]
        const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href))
        const labelKey = NAV_LABEL_KEY[item.id]
        const label = labelKey ? t.nav[labelKey] : item.label

        return (
          <Link
            key={item.id}
            href={item.href}
            className={cn(
              "flex flex-col items-center gap-0.5 px-1 py-1 rounded-lg transition-colors min-w-0 flex-1",
              isActive
                ? "text-indigo-600 dark:text-indigo-400"
                : "text-zinc-400 dark:text-zinc-500"
            )}
          >
            <div className="relative">
              <Icon className="w-5 h-5" />
              {item.badge && (
                <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-indigo-500 text-white text-[8px] font-bold flex items-center justify-center">
                  {item.badge}
                </span>
              )}
            </div>
            <span className="text-[9px] font-medium truncate max-w-full leading-none">{label}</span>
          </Link>
        )
      })}
      <button
        onClick={openCommandPalette}
        className="flex flex-col items-center gap-0.5 px-1 py-1 rounded-lg transition-colors text-zinc-400 dark:text-zinc-500 flex-1"
      >
        <Command className="w-5 h-5" />
        <span className="text-[9px] font-medium leading-none">⌘K</span>
      </button>
    </nav>
  )
}
