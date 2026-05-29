import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/portfolio-3d/', // Replace 'portfolio-3d' with your actual repo name if it's different
  plugins: [react()],
  optimizeDeps: {
    include: ['three', '@react-three/fiber', '@react-three/drei', 'gsap', 'framer-motion'],
  },
})
