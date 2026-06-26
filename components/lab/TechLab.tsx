"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, ChevronRight } from "lucide-react"
import { TECHNOLOGIES } from "@/lib/data"
import { type Technology } from "@/types"
import { useLang } from "@/contexts/LanguageContext"
import { useIsMobile } from "@/hooks/useIsMobile"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"

const LEVEL_BAR: Record<string, { bar: string; width: string }> = {
  expert: { bar: "bg-emerald-400", width: "w-full" },
  advanced: { bar: "bg-indigo-400", width: "w-4/5" },
  intermediate: { bar: "bg-amber-400", width: "w-3/5" },
  learning: { bar: "bg-zinc-400", width: "w-2/5" },
}

const LEVEL_COLOR: Record<string, string> = {
  expert: "text-emerald-600 dark:text-emerald-400",
  advanced: "text-indigo-600 dark:text-indigo-400",
  intermediate: "text-amber-600 dark:text-amber-400",
  learning: "text-zinc-500",
}

const CATEGORY_ICON: Record<string, string> = {
  framework: "⚡",
  language: "{}",
  database: "🗄",
  cloud: "☁",
  tool: "🔧",
  other: "◈",
}

export function TechLab() {
  const [selectedCat, setSelectedCat] = useState("__all__")
  const [selectedTech, setSelectedTech] = useState<Technology | null>(null)
  const { t } = useLang()
  const isMobile = useIsMobile()

  const handleTechClick = (tech: Technology) => {
    setSelectedTech(selectedTech?.name === tech.name ? null : tech)
  }

  const CATEGORIES = ["__all__", "framework", "language", "database", "tool", "other"]

  const filtered = TECHNOLOGIES.filter((tech) => selectedCat === "__all__" || tech.category === selectedCat)

  const grouped = TECHNOLOGIES.reduce((acc, tech) => {
    if (!acc[tech.category]) acc[tech.category] = []
    acc[tech.category].push(tech)
    return acc
  }, {} as Record<string, Technology[]>)

  return (
    <>
    <Sheet open={isMobile && !!selectedTech} onOpenChange={(open) => { if (!open) setSelectedTech(null) }}>
      <SheetContent side="bottom" className="max-h-[80vh] overflow-y-auto p-0" showCloseButton={false}>
        {selectedTech && <TechDetail tech={selectedTech} onClose={() => setSelectedTech(null)} />}
      </SheetContent>
    </Sheet>
    <div className="flex h-[calc(100vh-6rem)]">
      <div className={cn("flex flex-col flex-1 min-w-0", selectedTech && "lg:flex-none lg:w-[460px]")}>
        {/* Header */}
        <div className="px-6 py-5 border-b border-black/[0.07] dark:border-white/[0.06]">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">{t.lab.title}</h1>
              <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-0.5">{t.lab.subtitle}</p>
            </div>
            <div className="px-2 py-1 rounded-md bg-black/[0.04] dark:bg-white/[0.04] border border-black/[0.07] dark:border-white/[0.06] text-[10px] font-mono text-zinc-400 dark:text-zinc-500">
              {TECHNOLOGIES.length} {t.lab.modules}
            </div>
          </div>
          <div className="flex gap-1.5 overflow-x-auto scrollbar-hide">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCat(cat)}
                className={cn(
                  "flex-shrink-0 px-3 py-1 rounded-full text-xs font-medium transition-colors",
                  selectedCat === cat
                    ? "bg-indigo-600 text-white"
                    : "bg-black/[0.04] dark:bg-white/[0.04] text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 border border-black/[0.07] dark:border-white/[0.06]"
                )}
              >
                {cat === "__all__" ? t.lab.all : t.lab.categories[cat as keyof typeof t.lab.categories] ?? cat}
              </button>
            ))}
          </div>
        </div>

        {/* Tech grid */}
        <div className="flex-1 overflow-y-auto">
          {selectedCat === "__all__" ? (
            <div className="px-6 py-6 space-y-8">
              {Object.entries(grouped).map(([cat, techs]) => (
                <div key={cat}>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-base">{CATEGORY_ICON[cat]}</span>
                    <h2 className="text-[10px] uppercase tracking-widest text-zinc-400 dark:text-zinc-600 font-semibold">
                      {t.lab.categories[cat as keyof typeof t.lab.categories] ?? cat}
                    </h2>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {techs.map((tech) => (
                      <TechModule key={tech.name} tech={tech} isSelected={selectedTech?.name === tech.name} onClick={() => handleTechClick(tech)} levelLabel={t.lab.levels[tech.level]} levelColor={LEVEL_COLOR[tech.level]} levelBar={LEVEL_BAR[tech.level]} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 p-6">
              {filtered.map((tech) => (
                <TechModule key={tech.name} tech={tech} isSelected={selectedTech?.name === tech.name} onClick={() => handleTechClick(tech)} levelLabel={t.lab.levels[tech.level]} levelColor={LEVEL_COLOR[tech.level]} levelBar={LEVEL_BAR[tech.level]} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Detail panel — desktop only */}
      <AnimatePresence>
        {selectedTech && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="hidden lg:flex flex-col flex-1 border-l border-black/[0.07] dark:border-white/[0.06] overflow-y-auto"
          >
            <TechDetail tech={selectedTech} onClose={() => setSelectedTech(null)} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
    </>
  )
}

function TechModule({ tech, isSelected, onClick, levelLabel, levelColor, levelBar }: {
  tech: Technology; isSelected: boolean; onClick: () => void
  levelLabel: string; levelColor: string; levelBar: { bar: string; width: string }
}) {
  const { t } = useLang()
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={cn(
        "text-left p-3 rounded-xl border transition-all",
        isSelected
          ? "border-indigo-500/40 bg-indigo-500/[0.06]"
          : "border-black/[0.07] dark:border-white/[0.06] bg-white/60 dark:bg-white/[0.02] hover:border-black/[0.12] dark:hover:border-white/[0.12] hover:bg-white dark:hover:bg-white/[0.04]"
      )}
    >
      <div className="text-sm font-medium text-zinc-700 dark:text-zinc-200 mb-2 truncate">{tech.name}</div>
      <div className="flex items-center justify-between mb-1.5">
        <span className={cn("text-[10px] font-mono", levelColor)}>{levelLabel}</span>
        <span className="text-[10px] text-zinc-400 dark:text-zinc-600">{tech.yearsOfExperience}{t.lab.detail.years}</span>
      </div>
      <div className="h-1 w-full rounded-full bg-black/[0.06] dark:bg-white/[0.06] overflow-hidden">
        <div className={cn("h-full rounded-full", levelBar.bar, levelBar.width)} />
      </div>
    </motion.button>
  )
}

function TechDetail({ tech, onClose }: { tech: Technology; onClose: () => void }) {
  const { t } = useLang()
  const levelLabel = t.lab.levels[tech.level]
  const levelColor = LEVEL_COLOR[tech.level]
  const levelBar = LEVEL_BAR[tech.level]
  const catLabel = t.lab.categories[tech.category as keyof typeof t.lab.categories] ?? tech.category

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between px-6 py-4 border-b border-black/[0.07] dark:border-white/[0.06]">
        <div>
          <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">{tech.name}</h2>
          <div className="text-[10px] text-zinc-400 dark:text-zinc-600 font-mono mt-0.5">
            {catLabel} · {tech.yearsOfExperience} {t.lab.detail.years}
          </div>
        </div>
        <button onClick={onClose} className="w-7 h-7 rounded-md flex items-center justify-center text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 hover:bg-black/[0.06] dark:hover:bg-white/[0.06] transition-colors">
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
      <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
        <div className="p-4 rounded-xl bg-black/[0.03] dark:bg-white/[0.02] border border-black/[0.06] dark:border-white/[0.06]">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs text-zinc-500">{t.lab.detail.proficiency}</span>
            <span className={cn("text-sm font-semibold font-mono", levelColor)}>{levelLabel}</span>
          </div>
          <div className="h-1.5 w-full rounded-full bg-black/[0.06] dark:bg-white/[0.06] overflow-hidden">
            <div className={cn("h-full rounded-full", levelBar.bar, levelBar.width)} />
          </div>
        </div>
        <div>
          <h3 className="text-[10px] uppercase tracking-wider text-zinc-400 dark:text-zinc-600 mb-2">{t.lab.detail.about}</h3>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">{tech.description}</p>
        </div>
        <div>
          <h3 className="text-[10px] uppercase tracking-wider text-zinc-400 dark:text-zinc-600 mb-3">{t.lab.detail.useCases}</h3>
          <div className="space-y-1.5">
            {tech.useCases.map((uc) => (
              <div key={uc} className="flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400">
                <ChevronRight className="w-3 h-3 text-zinc-300 dark:text-zinc-600 flex-shrink-0" />
                {uc}
              </div>
            ))}
          </div>
        </div>
        {tech.projects && tech.projects.length > 0 && (
          <div>
            <h3 className="text-[10px] uppercase tracking-wider text-zinc-400 dark:text-zinc-600 mb-3">{t.lab.detail.usedIn}</h3>
            <div className="flex flex-wrap gap-2">
              {tech.projects.map((p) => (
                <span key={p} className="text-xs px-2.5 py-1 rounded-lg bg-black/[0.04] dark:bg-white/[0.04] border border-black/[0.08] dark:border-white/[0.08] text-zinc-500 dark:text-zinc-400 font-mono">{p}</span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
