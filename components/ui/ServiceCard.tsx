'use client'

import { useRouter } from 'next/navigation'
import { ArrowRight } from 'lucide-react'
import type { Service } from '@/types'
import { getIcon } from '@/lib/icons'

import HoverScale from './HoverScale'

interface ServiceCardProps {
  service: Service
}

export default function ServiceCard({ service }: ServiceCardProps) {
  const router = useRouter()
  const Icon = getIcon(service.icon)

  return (
    <HoverScale>
      <button
        onClick={() => router.push('/services')}
        aria-label={`${service.title} — view services`}
        className="relative w-full h-full group bg-white p-7 text-left border-none cursor-pointer overflow-hidden transition-all duration-[320ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-[var(--ink)] hover:shadow-[var(--elev-2)] focus:outline-none"
      >
        {/* discovered liquid-gold edge on hover */}
        <span className="gold-reveal absolute top-0 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-500" />
        <span className="flex items-center justify-center w-11 h-11 rounded-lg bg-[var(--accent-light)] text-[var(--accent-dark)] mb-5 group-hover:bg-white/10 group-hover:text-[var(--accent-light)] transition-colors duration-300">
          <Icon size={20} strokeWidth={1.6} aria-hidden="true" />
        </span>
        <h3 className="font-syne font-bold text-[0.95rem] text-[var(--ink)] group-hover:text-white transition-colors duration-300 mb-2">
          {service.title}
        </h3>
        <p className="text-[0.8rem] text-[var(--ink-3)] group-hover:text-white/70 leading-relaxed transition-colors duration-300">
          {service.shortDesc}
        </p>
        <span className="flex items-center gap-1 text-[var(--accent-light)] text-sm mt-4 font-semibold opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
          <ArrowRight size={15} aria-hidden="true" />
        </span>
      </button>
    </HoverScale>
  )
}
