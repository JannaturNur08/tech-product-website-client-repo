/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        jost: "'Jost', 'sans-serif'",
        mercellus : "'Marcellus', 'serif'",
        jakarta : "'Plus Jakarta Sans', 'sans-serif'"
       
      },
      colors : {
        primary : "#53624E",
        
      },
      hover : {
        hoverColor : '#0078ff',
      },
      textColor : {
        textColor : "#002b44",
      }
    },
  },
  plugins: [require("daisyui")],
}

