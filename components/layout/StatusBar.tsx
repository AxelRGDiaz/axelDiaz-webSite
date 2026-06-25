"use client"

import { useState, useEffect } from "react"
import { PERSONAL_INFO } from "@/lib/data"
import { useLang } from "@/contexts/LanguageContext"

export function StatusBar() {
  const [time, setTime] = useState("")
  const { t } = useLang()

  useEffect(() => {
    const update = () => {
      setTime(
        new Date().toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        })
      )
    }
    update()
    const interval = setInterval(update, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed bottom-0 left-14 right-0 h-6 flex items-center justify-between px-4 border-t border-black/[0.06] dark:border-white/[0.04] bg-white/80 dark:bg-zinc-950/80 backdrop-blur-xl z-40 text-[10px] text-zinc-500 dark:text-zinc-600 font-mono transition-colors duration-200">
      <div className="flex items-center gap-4">
        <span className="text-indigo-600 dark:text-indigo-500">{PERSONAL_INFO.currentVersion}</span>
        <span className="flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          {t.statusBar.message}
        </span>
      </div>
      <div className="flex items-center gap-4">
        <span>DIAZ OS</span>
        <span>{time}</span>
      </div>
    </div>
  )
}
