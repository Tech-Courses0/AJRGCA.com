import type { Config } from 'tailwindcss'

/**
 * AJRG and Associates — "Royal Minimalist" design system
 * ------------------------------------------------------
 * Palette : Deep Navy, Regal Purple, Gold, Lavender-Grey canvas.
 * Type    : Playfair Display (serif display) + Inter (body).
 *
 * Colours are exposed BOTH as semantic tokens (navy/royal/gold) AND mapped
 * onto the legacy ink/accent/cream/section/border contract that the existing
 * 23 components already consume via `var(--token)` / Tailwind classes — so the
 * whole site re-skins from this one file without per-component edits.
 */
const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './content/**/*.{md,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        // Headings — high-end serif
        serif: ['var(--font-playfair)', 'Playfair Display', 'Georgia', 'serif'],
        display: ['var(--font-playfair)', 'Playfair Display', 'Georgia', 'serif'],
        // Body — clean, high-readability sans
        sans: ['var(--font-inter)', 'Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        /* ── Semantic Royal Minimalist tokens ── */
        navy: {
          DEFAULT: '#221042',
          soft: '#281048',
          muted: '#3A2460',
        },
        royal: {
          DEFAULT: '#301850',
          light: '#683078',
          tint: '#ECE7F3',
        },
        gold: {
          DEFAULT: '#C5A059',
          light: '#F3EAD6',
          dark: '#896A2E', // deepened for WCAG AA on small text/icons; signature gold (DEFAULT) unchanged
        },
        canvas: '#F5F5F7', // cream / lavender-grey background

        /* ── Legacy contract (kept so existing components don't break) ── */
        ink: {
          DEFAULT: '#221042', // deck deep indigo-purple — primary text & dark surfaces
          2: '#3A2460',
          3: '#6A5E83',
          4: '#9E94B0',
        },
        cream: '#F4F2F8',
        accent: {
          DEFAULT: '#C5A059', // gold
          light: '#F3EAD6',
          dark: '#896A2E', // deepened for WCAG AA on small text/icons
        },
        section: '#FFFFFF', // white cards/sections pop on the lavender canvas
        border: {
          DEFAULT: '#E4E2EA',
          dark: '#C9C6D4',
        },
      },
      maxWidth: {
        '8xl': '1280px',
      },
      letterSpacing: {
        widest2: '0.12em',
      },
      borderRadius: {
        card: '0.875rem',
      },
      boxShadow: {
        royal: '0 1px 2px rgba(10,25,47,0.04), 0 12px 32px -12px rgba(10,25,47,0.12)',
        'royal-lg': '0 24px 60px -20px rgba(45,27,78,0.28)',
        gold: '0 8px 30px -10px rgba(197,160,89,0.45)',
      },
      backgroundImage: {
        // Deck purple wash — deep indigo → plum, for hero / dark sections
        'royal-wash': 'linear-gradient(140deg, #190A36 0%, #281048 45%, #3A1A60 80%, #4A2472 100%)',
        // Subtle architectural grid for "structure & clarity" texture
        'grid-faint':
          'linear-gradient(to right, rgba(40,16,72,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(40,16,72,0.05) 1px, transparent 1px)',
      },
      backgroundSize: {
        grid: '44px 44px',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(14px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        fadeUp: 'fadeUp 0.6s cubic-bezier(0.22,1,0.36,1) both',
      },
    },
  },
  plugins: [],
}

export default config
