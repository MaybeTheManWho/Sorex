// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
      "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
      "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
      extend: {
        colors: {
          'primary-green': 'rgb(68, 189, 50)',
          'secondary-green': 'rgb(39, 174, 96)',
          'accent-green': 'rgb(85, 239, 196)',
          'dark-green': 'rgb(0, 148, 50)',
          'wood-brown': 'rgb(131, 101, 57)',
          'stone-gray': 'rgb(189, 195, 199)',
        },
      },
    },
    plugins: [],
  }