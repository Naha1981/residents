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
        metallic: {
          900: '#111827',
          800: '#1F2937',
        }
      },
      backgroundImage: {
        'metallic-gradient': 'linear-gradient(to bottom, rgb(17, 24, 39), rgb(31, 41, 55))',
        'light-gradient': 'linear-gradient(to bottom, rgb(249, 250, 251), rgb(243, 244, 246))',
      },
    },
  },
  plugins: [],
}