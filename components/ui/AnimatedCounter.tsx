'use client'

import clsx from 'clsx'
import { useEffect, useMemo, useRef, useState } from 'react'

interface AnimatedCounterProps {
  value: string
  className?: string
  duration?: number
}

function parseCounterValue(value: string) {
  const match = value.trim().match(/^([^0-9]*)([0-9][0-9,]*)(.*)$/)

  if (!match) {
    return null
  }

  const [, prefix, rawNumber, suffix] = match

  return {
    prefix,
    target: Number(rawNumber.replace(/,/g, '')),
    suffix,
  }
}

export default function AnimatedCounter({ value, className, duration = 1600 }: AnimatedCounterProps) {
  const [count, setCount] = useState(0)
  const [hasAnimated, setHasAnimated] = useState(false)
  const ref = useRef<HTMLSpanElement | null>(null)
  const parsed = useMemo(() => parseCounterValue(value), [value])

  useEffect(() => {
    if (!parsed || hasAnimated) {
      return
    }

    const element = ref.current

    if (!element) {
      return
    }

    let animationFrame = 0

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          return
        }

        const startTime = performance.now()

        const animate = (currentTime: number) => {
          const progress = Math.min((currentTime - startTime) / duration, 1)
          const easedProgress = 1 - Math.pow(1 - progress, 3)

          setCount(Math.round(parsed.target * easedProgress))

          if (progress < 1) {
            animationFrame = window.requestAnimationFrame(animate)
            return
          }

          setHasAnimated(true)
        }

        animationFrame = window.requestAnimationFrame(animate)
        observer.disconnect()
      },
      { threshold: 0.6 }
    )

    observer.observe(element)

    return () => {
      observer.disconnect()
      window.cancelAnimationFrame(animationFrame)
    }
  }, [duration, hasAnimated, parsed])

  if (!parsed) {
    return <span className={className}>{value}</span>
  }

  return (
    <span ref={ref} className={clsx('tabular-nums', className)} aria-label={value}>
      {parsed.prefix}
      {count.toLocaleString('en-US')}
      {parsed.suffix}
    </span>
  )
}