import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

function Typewriter() {
  const roles = [
    'Python Full Stack Developer',
    'AI & Agentic Systems Specialist',
    'CrewAI Pipeline Architect',
    'LangChain RAG Engineer',
    'Django REST API Builder',
  ]
  const [idx,  setIdx]  = useState(0)
  const [text, setText] = useState('')
  const [phase,setPhase]= useState('typing')

  useEffect(() => {
    const full = roles[idx]
    let t
    if (phase === 'typing') {
      if (text.length < full.length) t = setTimeout(() => setText(full.slice(0, text.length+1)), 52)
      else t = setTimeout(() => setPhase('wait'), 1900)
    } else if (phase === 'wait') {
      t = setTimeout(() => setPhase('erase'), 350)
    } else {
      if (text.length > 0) t = setTimeout(() => setText(text.slice(0,-1)), 26)
      else { setIdx(i => (i+1) % roles.length); setPhase('typing') }
    }
    return () => clearTimeout(t)
  }, [text, phase, idx])

  return (
    <span style={{ color:'var(--accent-cyan)', fontFamily:'JetBrains Mono, monospace', fontSize:'.9rem', fontWeight:500, letterSpacing:'.04em' }}>
      {text}
      <motion.span animate={{ opacity:[1,0] }} transition={{ duration:.55, repeat:Infinity }}
        style={{ display:'inline-block', width:2, height:'1em', background:'var(--accent-cyan)', marginLeft:3, verticalAlign:'middle', borderRadius:1 }} />
    </span>
  )
}

function Photo() {
  const ref  = useRef()
  const mx   = useMotionValue(0)
  const my   = useMotionValue(0)
  const cfg  = { stiffness:100, damping:30 }
  const rX   = useSpring(useTransform(my, [-.5,.5],[8,-8]), cfg)
  const rY   = useSpring(useTransform(mx, [-.5,.5],[-8, 8]), cfg)

  const onMove = e => {
    const r = ref.current?.getBoundingClientRect()
    if (!r) return
    mx.set((e.clientX - r.left) / r.width  - .5)
    my.set((e.clientY - r.top)  / r.height - .5)
  }
  const onLeave = () => { mx.set(0); my.set(0) }

  return (
    <div style={{ position:'relative', width:480, height:570, maxWidth:'100%' }}>
      {/* Outer elegant ring */}
      <motion.div 
        animate={{ rotate:360 }} 
        transition={{ duration:26, repeat:Infinity, ease:'linear' }}
        style={{
          position:'absolute', 
          top:'50%', left:'50%', 
          x: "-50%", y: "-50%", // Framer Motion native properties for translation
          width:440, height:440,
          border:'1px solid rgba(0,229,255,0.4)',
          clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
        }} 
      />

      {/* Counter-spin dashed hex ring */}
      <motion.div 
        animate={{ rotate:-360 }} 
        transition={{ duration:36, repeat:Infinity, ease:'linear' }}
        style={{
          position:'absolute',
          top:'50%', left:'50%', 
          x: "-50%", y: "-50%",
          width:380, height:380,
          border:'1px dashed rgba(247,37,133,0.4)',
          clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
        }} 
      />

      {/* Floating tech dots around ring */}
      {[
        { label:'Python',  angle:  0, color:'#00e5ff' },
        { label:'Django',  angle: 72, color:'#7c3aed' },
        { label:'AI/ML',   angle:144, color:'#f72585' },
        { label:'RAG',     angle:216, color:'#ffd60a' },
        { label:'CrewAI',  angle:288, color:'#00e5ff' },
      ].map(({ label, angle, color }) => {
        const rad = (angle * Math.PI) / 180
        const r   = 220
        const x   = 240 + r * Math.cos(rad) - 28
        const y   = 285 + r * Math.sin(rad) - 12
        return (
          <motion.div key={label}
            animate={{ y:[0,-5,0] }}
            transition={{ duration:3+angle*.005, repeat:Infinity, ease:'easeInOut', delay:angle*.008 }}
            style={{ position:'absolute', left:x, top:y, zIndex:20, pointerEvents:'none' }}>
            <span style={{
              padding:'4px 10px', borderRadius:999, fontSize:9,
              fontFamily:'JetBrains Mono,monospace', fontWeight:700,
              letterSpacing:'.14em', textTransform:'uppercase',
              color, background:`${color}12`, border:`1px solid ${color}45`,
              backdropFilter:'blur(10px)', whiteSpace:'nowrap',
              boxShadow:`0 0 12px ${color}20`,
            }}>{label}</span>
          </motion.div>
        )
      })}

      {/* 3-D tilt photo */}
      <motion.div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave}
        style={{ 
          rotateX:rX, rotateY:rY, 
          transformStyle:'preserve-3d', perspective:1000,
          position:'absolute', 
          top:'50%', left:'50%', 
          x: "-50%", y: "-50%", // Proper translation
          zIndex:10, pointerEvents:'auto' 
        }}>

        {/* Glow halo */}
        <div style={{
          position:'absolute', inset:-32, borderRadius:'50%', zIndex:0,
          background:'radial-gradient(circle at 50% 55%, rgba(0,229,255,.18) 0%, rgba(124,58,237,.1) 45%, transparent 70%)',
          filter:'blur(20px)',
        }} />

        {/* Hexagon photo */}
        <div style={{
          width:320, height:320,
          clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
          position:'relative', zIndex:1,
          padding: 2, 
          background: 'linear-gradient(135deg, rgba(0,229,255,0.6), rgba(124,58,237,0.6))',
        }}>
          <div style={{
            width: '100%', height: '100%',
            clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
            position: 'relative'
          }}>
            <img src="/girija.jpg" alt="Girija Sankar Biswal"
              style={{ width:'100%', height:'100%', objectFit:'cover', objectPosition:'center 8%',
                filter:'brightness(1.06) contrast(1.06) saturate(1.1)', display:'block' }}
              draggable={false} />
            <div style={{
              position:'absolute', inset:0, pointerEvents:'none',
              background:'linear-gradient(135deg,rgba(0,229,255,.05),transparent 55%,rgba(124,58,237,.07))',
              mixBlendMode:'screen',
            }} />
          </div>
        </div>

        {/* "Open to work" pill */}
        <motion.div animate={{ y:[0,-5,0] }} transition={{ duration:2.8, repeat:Infinity, ease:'easeInOut' }}
          style={{ position:'absolute', bottom:-16, left:'50%', x:"-50%", zIndex:30, whiteSpace:'nowrap' }}>
          <div style={{
            display:'flex', alignItems:'center', gap:6, padding:'7px 18px', borderRadius:999,
            fontSize:11, fontFamily:'JetBrains Mono,monospace', fontWeight:700,
            color:'var(--accent-cyan)', background:'rgba(5,5,12,.94)',
            border:'1px solid rgba(0,229,255,.45)', backdropFilter:'blur(14px)',
            boxShadow:'0 0 28px rgba(0,229,255,.18)',
          }}>
            <span style={{ width:7, height:7, borderRadius:'50%', background:'var(--accent-cyan)',
              boxShadow:'0 0 8px var(--accent-cyan)', animation:'pulse 1.5s infinite' }} />
            Open to work
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center pt-20" style={{ pointerEvents:'none' }}>
      <div className="w-full px-8 md:px-16 lg:px-24 xl:px-32 flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-10">
        
        <div className="flex-1 max-w-2xl" style={{ pointerEvents: 'auto' }}>
          
          <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.8 }}>
            <Typewriter />
          </motion.div>
          
          <motion.h1 
            initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.8, delay:0.2 }}
            className="text-5xl md:text-7xl font-bold mt-6 mb-8 tracking-tight">
            Girija <span className="gradient-text">Sankar</span><br />Biswal
          </motion.h1>
          
          <motion.p 
            initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.8, delay:0.4 }}
            className="text-lg text-gray-400 mb-10 max-w-lg leading-relaxed">
            I engineer intelligent automated systems and scalable full-stack applications. Bridging the gap between bleeding-edge AI logic and robust backend architecture.
          </motion.p>
          
          <motion.div 
            initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.8, delay:0.6 }}
            className="flex flex-wrap gap-6 font-mono text-sm">
            
            <a href="#projects" className="px-8 py-4 rounded-xl font-bold transition-all duration-300 bg-white text-black hover:scale-105 inline-block"
               onClick={e => { e.preventDefault(); document.getElementById('projects')?.scrollIntoView({behavior:'smooth'}) }}>
              Explore Work
            </a>
            
            <a href="#contact" className="px-8 py-4 rounded-xl font-bold transition-all duration-300 border border-white/10 text-white hover:bg-white/5 hover:scale-105 inline-block"
               onClick={e => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({behavior:'smooth'}) }}>
              Contact Me
            </a>
            
          </motion.div>
        </div>

        <motion.div initial={{ opacity:0, scale:0.9 }} animate={{ opacity:1, scale:1 }} transition={{ duration:1, delay:0.4 }}
          className="flex-shrink-0" style={{ pointerEvents:'auto' }}>
          <Photo />
        </motion.div>
        
      </div>
    </section>
  )
}