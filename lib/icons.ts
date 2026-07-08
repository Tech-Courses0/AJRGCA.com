import {
  TrendingUp, BookOpen, ShieldCheck, FileText, Building2, Package,
  Gavel, Lightbulb, Scale, Users, Rocket, Briefcase, Ship,
  Landmark, Globe, CheckCircle2, UserCheck, ClipboardList, CalendarCheck,
  Clock, Award, Star, MapPin, Handshake, Lock, Sparkles, BadgeCheck,
  Circle, type LucideIcon,
} from 'lucide-react'

/**
 * String-key → Lucide component map — the single curated icon set for the
 * whole site. Data files (server) and editable content store only the *string
 * key* so they stay serializable across the RSC → client boundary; cards and
 * the editor's IconField resolve the key to a component via this map.
 *
 * Keep keys stable — they're referenced in data/ and in saved content.
 */
export const iconMap = {
  'trending-up': TrendingUp,
  'book-open': BookOpen,
  'shield-check': ShieldCheck,
  'file-text': FileText,
  'building': Building2,
  'package': Package,
  'gavel': Gavel,
  'lightbulb': Lightbulb,
  'scale': Scale,
  'users': Users,
  'rocket': Rocket,
  'briefcase': Briefcase,
  'ship': Ship,
  'landmark': Landmark,
  'globe': Globe,
  'check-circle': CheckCircle2,
  'user-check': UserCheck,
  'clipboard-list': ClipboardList,
  'calendar-check': CalendarCheck,
  'clock': Clock,
  'award': Award,
  'star': Star,
  'map-pin': MapPin,
  'handshake': Handshake,
  'lock': Lock,
  'sparkles': Sparkles,
  'badge-check': BadgeCheck,
} satisfies Record<string, LucideIcon>

export type IconKey = keyof typeof iconMap

/** Rendered when an item has no icon key yet, or a stale/unknown one. */
export const FALLBACK_ICON: LucideIcon = Circle

/** Every pickable key, in map order — the IconField grid iterates this. */
export const ICON_KEYS = Object.keys(iconMap) as IconKey[]

/** Tolerant resolver: unknown or missing keys fall back instead of crashing.
 *  Accepts a plain string so callers holding un-narrowed content can pass it. */
export function getIcon(key?: string | null): LucideIcon {
  return (key && iconMap[key as IconKey]) || FALLBACK_ICON
}
