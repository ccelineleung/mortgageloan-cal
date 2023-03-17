/** @type {import('tailwindcss').Config} */
module.exports = {
  // content: ['./dist/*.html'],
  content: ['./client/src/**/*,{html,js,jsx,ts,tsx}'],
  purge: ['./client/src/**/*.html', './client/src/**/*.{js, jsx, ts, tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
};
