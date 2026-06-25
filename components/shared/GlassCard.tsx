"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface GlassCardProps {
  children: React.ReactNode
  className?: string
  hover?: boolean
  delay?: number
}

export function GlassCard({ children, className, hover = false, delay = 0 }: GlassCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay, ease: [0.16, 1, 0.3, 1] }}
      whileHover={hover ? { y: -2, transition: { duration: 0.2 } } : undefined}
      className={cn(
        "rounded-xl border border-black/[0.07] dark:border-white/[0.06] bg-white/80 dark:bg-white/[0.03] backdrop-blur-sm shadow-sm dark:shadow-none",
        hover && "cursor-pointer hover:border-black/[0.12] dark:hover:border-white/[0.1] hover:bg-white dark:hover:bg-white/[0.05] transition-colors",
        className
      )}
    >
      {children}
    </motion.div>
  )
}
