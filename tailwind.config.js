/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./*.html", "./js/**/*.js"], // ajusta conforme sua estrutura
    theme: {
      extend: {},
    },
    plugins: [
      require('tailwind-scrollbar'),
    ],
  }