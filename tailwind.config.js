/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#050505', surface: '#0a0d0b', 'surface-2': '#0f1512',
        text: '#c9d1d9', muted: '#9aa3ad', neon: '#00ff66', cyan: '#22d3ee',
        blue: '#60a5fa', yellow: '#facc15', magenta: '#e879f9', red: '#f87171',
      },
      fontFamily: {
        mono: ['JetBrains Mono Variable', 'JetBrains Mono', 'Fira Code', 'IBM Plex Mono', 'ui-monospace', 'monospace'],
      },
    },
  },
  plugins: [],
}