"use client"

import { useState, useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import {
  LayoutDashboard, FolderOpen, GitBranch, FlaskConical,
  FileText, MessageSquare, Search, ArrowRight, Hash,
} from "lucide-react"
import {
  subscribeCommandPalette, closeCommandPalette,
  openCommandPalette,
} from "@/hooks/useCommandPalette"
import { useKeyboard } from "@/hooks/useKeyboard"
import { useLang } from "@/contexts/LanguageContext"
import { cn } from "@/lib/utils"

export function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [selectedIndex, setSelectedIndex] = useState(0)
  const router = useRouter()
  const { t } = useLang()

  const COMMANDS = [
    { id: "nav-home", label: t.command.items.dashboard, category: t.command.categories.navigation, icon: LayoutDashboard, href: "/" },
    { id: "nav-projects", label: t.command.items.projects, category: t.command.categories.navigation, icon: FolderOpen, href: "/projects" },
    { id: "nav-career", label: t.command.items.career, category: t.command.categories.navigation, icon: GitBranch, href: "/career" },
    { id: "nav-lab", label: t.command.items.lab, category: t.command.categories.navigation, icon: FlaskConical, href: "/lab" },
    { id: "nav-cv", label: t.command.items.cv, category: t.command.categories.navigation, icon: FileText, href: "/cv" },
    { id: "nav-contact", label: t.command.items.contact, category: t.command.categories.navigation, icon: MessageSquare, href: "/contact" },
    { id: "action-cv", label: t.command.items.downloadCv, category: t.command.categories.actions, icon: FileText, href: "/cv.pdf" },
    { id: "action-github", label: t.command.items.github, category: t.command.categories.actions, icon: Hash, href: "https://github.com/axelrgdiaz" },
  ]

  useEffect(() => {
    const unsubscribe = subscribeCommandPalette((state) => {
      setIsOpen(state)
      if (state) setQuery("")
    })
    return unsubscribe
  }, [])

  useKeyboard("k", true, openCommandPalette)
  useKeyboard("Escape", false, closeCommandPalette)

  const filtered = COMMANDS.filter((c) =>
    c.label.toLowerCase().includes(query.toLowerCase()) ||
    c.category.toLowerCase().includes(query.toLowerCase())
  )

  const handleSelect = useCallback((href: string) => {
    closeCommandPalette()
    if (href.startsWith("http") || href.endsWith(".pdf")) {
      window.open(href, "_blank")
    } else {
      router.push(href)
    }
  }, [router])

  useEffect(() => { setSelectedIndex(0) }, [query])

  useEffect(() => {
    if (!isOpen) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") { e.preventDefault(); setSelectedIndex((i) => Math.min(i + 1, filtered.length - 1)) }
      else if (e.key === "ArrowUp") { e.preventDefault(); setSelectedIndex((i) => Math.max(i - 1, 0)) }
      else if (e.key === "Enter") { e.preventDefault(); if (filtered[selectedIndex]) handleSelect(filtered[selectedIndex].href) }
    }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [isOpen, filtered, selectedIndex, handleSelect])

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100]">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCommandPalette}
            className="absolute inset-0 bg-black/40 dark:bg-black/60 backdrop-blur-sm"
          />
          <div className="relative flex items-start justify-center pt-[20vh] px-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-xl bg-white/95 dark:bg-zinc-900/95 border border-black/[0.08] dark:border-white/10 rounded-2xl shadow-2xl overflow-hidden"
            >
              {/* Search input */}
              <div className="flex items-center gap-3 px-4 py-3.5 border-b border-black/[0.06] dark:border-white/[0.06]">
                <Search className="w-4 h-4 text-zinc-400 flex-shrink-0" />
                <input
                  autoFocus
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={t.command.placeholder}
                  className="flex-1 bg-transparent text-sm text-zinc-800 dark:text-zinc-200 placeholder:text-zinc-400 dark:placeholder:text-zinc-500 outline-none"
                />
                <kbd className="text-[10px] text-zinc-400 dark:text-zinc-600 font-mono bg-black/[0.04] dark:bg-white/[0.04] border border-black/[0.08] dark:border-white/[0.08] rounded px-1.5 py-0.5">
                  ESC
                </kbd>
              </div>

              {/* Results */}
              <div className="max-h-80 overflow-y-auto">
                {filtered.length === 0 ? (
                  <div className="py-12 text-center text-zinc-400 dark:text-zinc-500 text-sm">
                    {t.command.noResults} &ldquo;{query}&rdquo;
                  </div>
                ) : (
                  <div className="p-2">
                    {filtered.map((cmd, i) => {
                      const Icon = cmd.icon
                      return (
                        <button
                          key={cmd.id}
                          onClick={() => handleSelect(cmd.href)}
                          onMouseEnter={() => setSelectedIndex(i)}
                          className={cn(
                            "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-colors",
                            i === selectedIndex
                              ? "bg-black/[0.06] dark:bg-white/[0.08] text-zinc-900 dark:text-zinc-100"
                              : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200"
                          )}
                        >
                          <Icon className="w-4 h-4 flex-shrink-0" />
                          <span className="flex-1 text-sm">{cmd.label}</span>
                          <span className="text-[10px] text-zinc-400 dark:text-zinc-600">{cmd.category}</span>
                          {i === selectedIndex && <ArrowRight className="w-3 h-3 text-zinc-400 dark:text-zinc-500" />}
                        </button>
                      )
                    })}
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="px-4 py-2 border-t border-black/[0.06] dark:border-white/[0.06] flex items-center gap-4 text-[10px] text-zinc-400 dark:text-zinc-600">
                <span className="flex items-center gap-1"><kbd className="font-mono">↑↓</kbd> {t.command.navigate}</span>
                <span className="flex items-center gap-1"><kbd className="font-mono">↵</kbd> {t.command.select}</span>
                <span className="flex items-center gap-1"><kbd className="font-mono">ESC</kbd> {t.command.close}</span>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  )
}
