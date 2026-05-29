import { useState, useEffect } from 'react'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 pointer-events-none ${scrolled ? 'glass-nav py-4' : 'py-6'}`}>
      <div className="max-w-7xl mx-auto px-8 md:px-16 flex items-center justify-between pointer-events-auto">
        <a href="#hero" className="text-xl font-bold font-mono tracking-tighter text-white">
          G<span className="text-cyan-400">.</span>S<span className="text-purple-400">.</span>B
        </a>
        <div className="hidden md:flex gap-8 text-sm font-mono font-medium text-gray-400">
          <a href="#hero" className="hover:text-cyan-400 transition-colors">Home</a>
          <a href="#projects" className="hover:text-cyan-400 transition-colors">Projects</a>
          <a href="#skills" className="hover:text-cyan-400 transition-colors">Skills</a>
          <a href="#contact" className="hover:text-cyan-400 transition-colors">Contact</a>
        </div>
      </div>
    </nav>
  )
}