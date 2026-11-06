/** @type {import('tailwindcss').Config} */

// Warna dibaca dari variabel CSS (didefinisikan di src/index.css),
// jadi satu class seperti `bg-slate-900` otomatis berubah saat tema berganti.
// Format "r g b" + <alpha-value> membuat modifier opacity (bg-slate-900/40) tetap jalan.
const v = (name) => `rgb(var(--${name}) / <alpha-value>)`;

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        slate: {
          50: v('slate-50'),
          100: v('slate-100'),
          200: v('slate-200'),
          300: v('slate-300'),
          400: v('slate-400'),
          500: v('slate-500'),
          600: v('slate-600'),
          700: v('slate-700'),
          800: v('slate-800'),
          900: v('slate-900'),
          950: v('slate-950'),
        },
        // Aksen yang harus lebih gelap di latar terang agar tetap terbaca
        green: { 300: v('green-300'), 400: v('green-400') },
        red: { 300: v('red-300'), 400: v('red-400') },
        yellow: { 300: v('yellow-300'), 400: v('yellow-400') },
        orange: { 400: v('orange-400') },
      },
    },
  },
  plugins: [],
}
