/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            '--tw-prose-bullets': theme('colors.indigo[900]'),
            '--tw-prose-hr': theme('colors.indigo[900]'),
            '--tw-prose-quote-borders:': theme('colors.indigo[900]')
          },
        },
      }),

    },
  },
  safelist: [
    //TODO remove these
   'focus:border-green-600',
   'focus:ring-green-600',
   'hover:bg-green-700',
   'border-green-600',
   'text-green-600',
   'hover:bg-green-700',
   'bg-green-700',
   'bg-green-600',
   'text-green-900',
   'bg-green-900'
  ],
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}
