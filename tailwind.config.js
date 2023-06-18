/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './index.html'],
  theme: {
    extend: {}
  },
  'editor.quickSuggestions': {
    strings: true
  },
  'tailwindCSS.includeLanguages': {
    plaintext: 'html',
    javascript: 'javascriptreact'
  },
  plugins: [require('@tailwindcss/forms')]
  //desactivate preflight

  // prefix: 'tw-',
  // plugins: [require('daisyui')]
};
