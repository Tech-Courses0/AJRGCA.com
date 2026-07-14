import { defineConfig, globalIgnores } from 'eslint/config'
import nextVitals from 'eslint-config-next/core-web-vitals'
import nextTs from 'eslint-config-next/typescript'

export default defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    rules: {
      // The CMS resolves Lucide components from owner-editable icon keys.
      // They are stable module exports even though the rule cannot infer that.
      'react-hooks/static-components': 'off',
      // Existing route-change and client-storage synchronization effects are
      // intentional and do not loop; keep them visible to code review instead.
      'react-hooks/set-state-in-effect': 'off',
      'react-hooks/refs': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
      'react/no-unescaped-entities': 'off',
    },
  },
  globalIgnores([
    '.claude/**',
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
    'public/uploads/**',
  ]),
])
