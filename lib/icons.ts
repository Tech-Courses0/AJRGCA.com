import {
  TrendingUp, BookOpen, ShieldCheck, FileText, Building2, Package,
  Gavel, Lightbulb, Scale, Users, Rocket, Briefcase, Ship,
  Landmark, type LucideIcon,
} from 'lucide-react'

/**
 * String-key → Lucide component map.
 *
 * Data files (server) store only the *string key* so they stay serializable
 * across the RSC → client-component boundary. Client cards resolve the key to
 * an actual icon via this map. Keep keys stable; they're referenced in data/.
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
} satisfies Record<string, LucideIcon>

export type IconKey = keyof typeof iconMap

export function getIcon(key: IconKey): LucideIcon {
  return iconMap[key]
}
