/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors : {
        'pale-spring-bud': '#ccd5aeff',
        'pale-spring-bud-2': '#e9edc9ff',
        'cornsilk': '#fefae0ff',
        'papaya-whip': '#faedcdff',
        'fawn': '#d4a373ff',
        'nyellow' : '#fdfd96',
        'npeach' : '#FFDAC1',
        'nblue' : '#BFD9D6',
        'nviolet' : '#E0BBE4',
        'ngreen' : '#B5EAD7',
        
      },
      fontFamily: {
        vietnam : ['Be Vietnam Pro', 'sans-serif'],
        sofia: ['Sofia Pro', 'sans-serif'],
        apple: ['apple', 'sans-serif'],
      
      }
    },
  },
  plugins: [],
}
