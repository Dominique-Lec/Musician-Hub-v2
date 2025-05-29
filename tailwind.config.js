/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: 'rgb(var(--color-primary) / <alpha-value>)',
        'primary-light': 'rgb(var(--color-primary-light) / <alpha-value>)',
        'primary-dark': 'rgb(var(--color-primary-dark) / <alpha-value>)',
        
        secondary: 'rgb(var(--color-secondary) / <alpha-value>)',
        'secondary-light': 'rgb(var(--color-secondary-light) / <alpha-value>)',
        'secondary-dark': 'rgb(var(--color-secondary-dark) / <alpha-value>)',
        
        accent: 'rgb(var(--color-accent) / <alpha-value>)',
        'accent-light': 'rgb(var(--color-accent-light) / <alpha-value>)',
        'accent-dark': 'rgb(var(--color-accent-dark) / <alpha-value>)',
        
        dark: 'rgb(var(--color-dark) / <alpha-value>)',
        'dark-lighter': 'rgb(var(--color-dark-lighter) / <alpha-value>)',
        
        light: 'rgb(var(--color-light) / <alpha-value>)',
        'light-darker': 'rgb(var(--color-light-darker) / <alpha-value>)',
        
        // Text colors for better readability
        'text-dark': 'rgb(var(--color-text-dark) / <alpha-value>)',
        'text-light': 'rgb(var(--color-text-light) / <alpha-value>)',
        'text-muted-dark': 'rgb(var(--color-text-muted-dark) / <alpha-value>)',
        'text-muted-light': 'rgb(var(--color-text-muted-light) / <alpha-value>)',
      },
      boxShadow: {
        'inner-light': 'inset 0 2px 4px 0 rgba(255, 255, 255, 0.05)',
        'glow-primary': '0 0 15px rgba(var(--color-primary), 0.5)',
        'glow-secondary': '0 0 15px rgba(var(--color-secondary), 0.5)',
        'glow-accent': '0 0 15px rgba(var(--color-accent), 0.5)',
      },
      animation: {
        'bounce-slow': 'bounce 3s infinite',
        'float': 'float 6s ease-in-out infinite',
        'pulse-subtle': 'pulse-subtle 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fadeUp': 'fadeUp 0.5s ease forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'pulse-subtle': {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.8 },
        },
        fadeUp: {
          from: { opacity: 0, transform: 'translateY(20px)' },
          to: { opacity: 1, transform: 'translateY(0)' },
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-spotify': 'linear-gradient(to bottom, rgba(var(--color-primary), 0.2), rgba(var(--color-dark), 1))',
      }
    },
  },
  plugins: [
    function({ addVariant }) {
      addVariant('light', '.light &');
      addVariant('dark', '.dark &');
    },
  ],
}
