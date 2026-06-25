"use client"

import { useEffect } from "react"

export function useKeyboard(key: string, meta: boolean, callback: () => void) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (meta && !(e.metaKey || e.ctrlKey)) return
      if (e.key.toLowerCase() === key.toLowerCase()) {
        e.preventDefault()
        callback()
      }
    }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [key, meta, callback])
}
