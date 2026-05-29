import { useRef, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

const PROJECTS = [
  {
    id:1, num:'01',
    title:'Full-Stack Car Rental Portal',
    cat:'Full Stack Web',
    desc:'Dynamic car rental platform with intelligent filtering, optimised UI/UX, and high-performance database query handling built for real-world scalability.',
    tech:['Python','HTML','CSS','JavaScript','MySQL'],
    tags:['Dynamic Filtering','DB Optimisation','Responsive UI'],
    cursor:'RENTAL'
  },
  {
    id:2, num:'02',
    title:'AI Agent Automation System',
    cat:'AI & Agentic Systems',
    desc:'3-agent CrewAI pipeline automating enterprise workflows — Jira ticket generation to GitHub PR creation with human-in-the-loop scoring.',
    tech:['Python','CrewAI','GitHub API','Jira API','LLMs'],
    tags:['3-Agent Pipeline','HITL Scoring','Auto PR'],
    cursor:'AUTOMATION'
  },
  {
    id:3, num:'03',
    title:'MCP-Powered Agentic RAG',
    cat:'AI Infrastructure',
    desc:'Production-grade RAG system leveraging Model Context Protocol for reduced latency and superior accuracy on unstructured enterprise data.',
    tech:['Python','LangChain','Vector DB','MCP','RAG'],
    tags:['Low Latency','High Accuracy','MCP'],
    cursor:'RAG'
  },
  {
    id:4, num:'04',
    title:'E-commerce Web Application',
    cat:'Full Stack Platform',
    desc:'Feature-rich e-commerce platform on Django + React with REST API architecture, SQLite persistence, and built-in behaviour analytics.',
    tech:['Django','ReactJS','REST APIs','SQLite','Analytics'],
    tags:['REST API','Analytics','Full Stack'],
    cursor:'APP'
  },
]

function ProjectArt({ id }) {
  if (id === 1) return (
    <div className="relative w-12 h-12 flex items-center justify-center" style={{ perspective: '200px' }}>
      <motion.div
        animate={{ rotateY: 360 }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        className="relative w-full h-full"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {[0, 1, 2].map((i) => (
          <motion.div key={i}
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.3, ease: "easeInOut" }}
            style={{
              position: 'absolute', width: 24, height: 24,
              border: '1px solid rgba(0, 229, 255, 0.5)',
              background: 'rgba(0, 229, 255, 0.1)',
              top: 12, left: 12,
              transform: `rotateX(60deg) rotateZ(45deg) translateZ(${i * 8 - 8}px)`,
              boxShadow: i === 2 ? '0 0 10px rgba(0,229,255,0.3)' : 'none'
            }}
          />
        ))}
      </motion.div>
    </div>
  )
  if (id === 2) return (
    <div className="relative w-12 h-12 flex items-center justify-center">
      <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity }}
        className="absolute w-3 h-3 rounded-full bg-purple-500 shadow-[0_0_12px_#7c3aed]" />
      <div className="absolute w-10 h-10 rounded-full border border-purple-500/30" />
      <motion.div animate={{ rotate: 360 }} transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        className="absolute w-10 h-10">
        <div className="absolute -top-1 left-1/2 w-2 h-2 -ml-1 rounded-full bg-purple-400 shadow-[0_0_8px_#7c3aed]" />
        <div className="absolute -bottom-1 left-1/2 w-2 h-2 -ml-1 rounded-full bg-purple-400 shadow-[0_0_8px_#7c3aed]" />
      </motion.div>
    </div>
  )
  if (id === 3) return (
    <div className="relative w-12 h-12 flex items-center justify-center">
      <div className="grid grid-cols-3 gap-[4px]">
        {[...Array(9)].map((_, i) => (
          <motion.div key={i}
            animate={{ opacity: [0.2, 1, 0.2], scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity, delay: (i % 3) * 0.2 + Math.floor(i / 3) * 0.2 }}
            className="w-1.5 h-1.5 rounded-full bg-pink-500 shadow-[0_0_6px_#f72585]"
          />
        ))}
      </div>
    </div>
  )
  if (id === 4) return (
    <div className="relative w-12 h-12 flex items-end justify-center gap-1.5 pb-2">
      {[1, 2, 3, 4].map((i) => (
        <motion.div key={i}
          animate={{ height: [8, 24, 12, 32, 8] }}
          transition={{ duration: 3, repeat: Infinity, delay: i * 0.2, ease: "easeInOut" }}
          className="w-1.5 bg-yellow-400 rounded-t-sm shadow-[0_0_8px_rgba(255,214,10,0.5)]"
        />
      ))}
    </div>
  )
  return null
}

function Card({ p, i }) {
  const wrap = useRef()
  const isInView = useInView(wrap, { once:true, margin:'-100px' })

  return (
    <motion.div ref={wrap} initial={{ opacity:0, y:40 }} animate={isInView?{opacity:1,y:0}:{}}
      transition={{ duration:0.8, delay:i*0.1 }}>
      <div className="glass-card h-full p-8 flex flex-col pointer-events-auto" data-cursor-text={p.cursor}>
        <div className="flex justify-between items-start mb-6">
          <ProjectArt id={p.id} />
          <span className="text-xs font-mono text-cyan-400 bg-cyan-400/10 px-3 py-1 rounded-full border border-cyan-400/20 uppercase tracking-widest">{p.cat}</span>
        </div>
        
        <h3 className="text-xl font-bold text-white mb-4">{p.title}</h3>
        <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-1">{p.desc}</p>
        
        <div className="flex flex-wrap gap-2 mb-6">
          {p.tags.map(t => (
            <span key={t} className="text-xs font-mono text-purple-400 bg-purple-400/10 px-2 py-1 rounded-md border border-purple-400/20">
              ✦ {t}
            </span>
          ))}
        </div>
        
        <div className="flex flex-wrap gap-2">
          {p.tech.map(t => (
            <span key={t} className="text-xs font-mono text-gray-400 bg-white/5 px-2 py-1 rounded border border-white/10">
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default function Projects() {
  const headRef = useRef()

  useEffect(() => {
    if (!headRef.current) return
    gsap.fromTo(headRef.current, { opacity:0, y:40 }, {
      opacity:1, y:0, duration:1,
      scrollTrigger:{ trigger:headRef.current, start:'top 80%' },
    })
  }, [])

  return (
    <section id="projects" className="py-32 pointer-events-none relative z-10">
      <div className="max-w-7xl mx-auto px-8 md:px-16 lg:px-24 xl:px-32">
        <div ref={headRef} className="mb-20 opacity-0 pointer-events-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">Featured Projects</h2>
          <p className="text-gray-400 max-w-2xl leading-relaxed">
            From intelligent automated pipelines to robust full-stack platforms, engineered to solve real-world problems.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {PROJECTS.map((p,i) => <Card key={p.id} p={p} i={i} />)}
        </div>
      </div>
    </section>
  )
}