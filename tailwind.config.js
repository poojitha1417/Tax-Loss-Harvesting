/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#0f111a',
        card: '#161925',
        primary: '#3b82f6',
        success: '#10b981',
        danger: '#ef4444',
      }
    },
  },
  plugins: [],
}
