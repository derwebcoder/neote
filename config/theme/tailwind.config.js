/** @type {import('tailwindcss').Config} */
import tailwindPreset from './tailwind.preset.js';

export default {
  content: [
    './src/**/*.html',
    'index.html',
  ],
  presets: [
    tailwindPreset
  ],
  theme: {},
  plugins: [],
}

