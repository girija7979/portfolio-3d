import { useRef, useEffect, Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import Scene from './components/Scene'
import Hero from './components/Hero'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Contact from './components/Contact'
import Navbar from './components/Navbar'
import Cursor from './components/Cursor'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  const scrollContainerRef = useRef()

  return (
    <div className="bg-[#050508] min-h-screen text-white font-sans selection:bg-cyan-500/30 selection:text-cyan-300">
      <Cursor />
      <div id="canvas-root">
        <Canvas gl={{ antialias: true, alpha: true }} camera={{ position: [0, 0, 5], fov: 45 }} dpr={[1, 2]}>
          <Suspense fallback={null}>
            <Scene />
          </Suspense>
        </Canvas>
      </div>

      <div id="scroll-container" ref={scrollContainerRef}>
        <Navbar />
        <Hero />
        <Projects />
        <Skills />
        <Contact />
      </div>
    </div>
  )
}