/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx,md,mdx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Theme-aware surfaces (resolved by CSS custom properties)
        bg: 'var(--color-bg)',
        'bg-deep': 'var(--color-bg-deep)',
        surface: 'var(--color-surface)',
        'surface-border': 'var(--color-surface-border)',
        // Text
        ink: 'var(--color-ink)',
        'ink-muted': 'var(--color-ink-muted)',
        // Single primary accent
        accent: '#3B82F6',
        'accent-bright': '#0EA5E9',
        // Brand sweeps palette (logo + small accents)
        'brand-green': '#22C55E',
        'brand-gold': '#EAB308',
        // Status / ban-tier colors
        banned: '#EF4444',
        restricted: '#F59E0B',
        atrisk: '#EAB308',
        legal: '#1E2A3A',
      },
      fontFamily: {
        head: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        body: ['"IBM Plex Sans"', 'system-ui', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        h1: ['clamp(2.5rem, 5vw, 4rem)', { lineHeight: '1.05', letterSpacing: '-0.02em', fontWeight: '700' }],
        h2: ['2rem', { lineHeight: '1.15', fontWeight: '600' }],
        h3: ['1.375rem', { lineHeight: '1.25', fontWeight: '500' }],
        body: ['1.0625rem', { lineHeight: '1.75' }],
        meta: ['0.8125rem', { lineHeight: '1.4' }],
      },
      maxWidth: { content: '72rem', prose: '46rem' },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'pulse-soft': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.45' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.5s ease-out both',
        'pulse-soft': 'pulse-soft 2s ease-in-out infinite',
        shimmer: 'shimmer 2.5s linear infinite',
      },
    },
  },
  plugins: [],
};
