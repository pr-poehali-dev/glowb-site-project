
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "glowb-blue": "#A7D3EF",
        "glowb-blue-deep": "#6FAED9",
        "glowb-pink": "#FFD1DC",
        "glowb-white": "#FFFFFF",
        "glowb-gradient-start": "#A7D3EF",
        "glowb-gradient-end": "#D6E8F5",
      },
      fontFamily: {
        'playfair': ['Playfair Display', 'serif'],
        'inter': ['Inter', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 8s ease-in-out infinite',
        'float-slower': 'float 10s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'fade-in': 'fadeIn 0.5s ease-in',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(167, 211, 239, 0.5)' },
          '100%': { boxShadow: '0 0 20px rgba(167, 211, 239, 0.8)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      backgroundImage: {
        'bubble-pattern': "url('https://cdn.poehali.dev/files/6c848bb6-5cc4-4c4d-a5fb-0687f95a0c99.jpg')",
        'star-pattern': "url('https://cdn.poehali.dev/files/1f36aef4-89b8-4798-a8f2-7335a4bcb46f.jpg')",
      },
    },
  },
  plugins: [],
};

export default config;
