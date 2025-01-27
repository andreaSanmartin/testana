/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Playfair Display', 'serif'],
      },
      colors:  {
        'gold': '#e8c500',
        'custom-coffe': '#a37d23',
        'primary': '#000',
        'background': '#ffffff',
        'title' : '#2b2a2a',
        'letter': '#bf9705'
      },
      fontSize: {
        'tiny': '0.625rem',
      },
      backgroundImage: {
        'logo': "url('/path/to/default-logo.png')",
      },
      boxShadow: {
        'left-bottom': '-10px 10px 20px -5px rgba(191, 151, 0, 0.5)', 
        'left-fade': '-10px 10px 15px -3px rgba(191, 151, 0, 0.5)',
        'right-bottom': '10px 10px 20px -5px rgba(191, 151, 5, 0.5)', 
        'right-fade': '-10px 10px 15px -3px rgba(191, 151, 5, 0.5)',
        'custom-gold': '0 4px 6px -1px rgba(191, 151, 5, 0.7), 0 2px 4px -2px rgba(191, 151, 5, 0.5)', 
      },     
      maxHeight: {
        '120': '45rem', 
      }, 
      width: {
        '9/10': '90%',
      },
      height: {
        '9/10': '90%',
      },
      screens: {
        'custom-lg': '1168px', 
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar')],
}
