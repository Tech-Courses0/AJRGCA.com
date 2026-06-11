'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { ReactNode } from 'react'
import clsx from 'clsx'

interface FadeInProps {
  children: ReactNode
  delay?: number
  className?: string
  direction?: 'up' | 'down' | 'left' | 'right' | 'none'
  fullWidth?: boolean
}

export default function FadeIn({ children, delay = 0, className, direction = 'up', fullWidth = false }: FadeInProps) {
  const reduceMotion = useReducedMotion()

  const directions = {
    up: { y: 28, x: 0 },
    down: { y: -28, x: 0 },
    left: { x: 28, y: 0 },
    right: { x: -28, y: 0 },
    none: { x: 0, y: 0 },
  }

  // Respect prefers-reduced-motion: render in place, no transform, instant.
  // framer-motion is JS-driven, so the global CSS reduced-motion reset can't reach it —
  // this is the only place the preference is honoured for these reveals.
  if (reduceMotion) {
    return <div className={clsx(className, fullWidth && 'w-full')}>{children}</div>
  }

  return (
    <motion.div
      initial={{ opacity: 0, ...directions[direction] }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.62, delay, ease: [0.16, 1, 0.3, 1] }}
      className={clsx(className, fullWidth && 'w-full')}
    >
      {children}
    </motion.div>
  )
}
