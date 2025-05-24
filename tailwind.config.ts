import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // 王者荣耀风格配色
        primary: {
          gold: '#FFD700',
          'gold-dark': '#FFA500',
          'gold-light': '#FFED4A',
        },
        secondary: {
          blue: '#1a237e',
          'blue-light': '#3f51b5',
          red: '#d32f2f',
          'red-light': '#f44336',
        },
        background: {
          dark: '#0d1421',
          'dark-light': '#1a2332',
          card: '#2d3748',
        },
        text: {
          light: '#f7fafc',
          muted: '#a0aec0',
        }
      },
      backgroundImage: {
        'gradient-gold': 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
        'gradient-blue': 'linear-gradient(135deg, #1a237e 0%, #3f51b5 100%)',
        'gradient-dark': 'linear-gradient(135deg, #0d1421 0%, #1a2332 100%)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 0 20px rgba(255, 215, 0, 0.3)',
        'glow-blue': '0 0 20px rgba(26, 35, 126, 0.3)',
        'glow-red': '0 0 20px rgba(211, 47, 47, 0.3)',
      },
      animation: {
        'pulse-glow': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
export default config 