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
        primary : "#002B44",
        
      },
      hover : {
        hoverColor : '#0078ff',
      },
      textColor : {
        textColor : "#002B44",
      }
    },
  },
  plugins: [require("daisyui")],
}

