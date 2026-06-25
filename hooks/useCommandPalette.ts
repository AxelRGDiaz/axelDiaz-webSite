"use client"

// Module-level pub/sub for command palette state
let listeners: Array<(state: boolean) => void> = []
let isOpen = false

function setState(newState: boolean) {
  isOpen = newState
  listeners.forEach((l) => l(newState))
}

export function subscribeCommandPalette(listener: (state: boolean) => void) {
  listeners.push(listener)
  return () => {
    listeners = listeners.filter((l) => l !== listener)
  }
}

export function openCommandPalette() {
  setState(true)
}

export function closeCommandPalette() {
  setState(false)
}

export function getCommandPaletteState() {
  return isOpen
}
