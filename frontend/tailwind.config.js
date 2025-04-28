/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        maxWidth: {
            '4xl': '56rem',
        }
      },
    },
    plugins: [],
    corePlugins: {
      // 👇 explicitly enable what you need
      maxWidth: true,
      padding: true,
      backgroundColor: true,
      boxShadow: true,
      borderRadius: true,
      textColor: true,
      margin: true,
      fontSize: true,
      fontWeight: true,
    },
  };
  