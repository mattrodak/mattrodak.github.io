import forms from '@tailwindcss/forms'
import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  plugins: [forms],
  safelist: [
    '.ReactModal__Body--open',
    '.ReactModal__Overlay',
    '.ReactModal__Overlay--after-open',
    '.ReactModal__Overlay--before-close',
  ],
} satisfies Config
