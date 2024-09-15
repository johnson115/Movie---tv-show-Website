/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/components/browser movie.js" , 
    "./node_modules/flowbite/dist/flowbite.js"
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('flowbite/plugin')
  ],
}

