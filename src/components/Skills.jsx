import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const TECH = [
  { cat:'Languages',  color:'#00e5ff', items:[{n:'Python',p:92},{n:'JavaScript',p:85},{n:'HTML/CSS',p:88}] },
  { cat:'Frameworks', color:'#7c3aed', items:[{n:'Django',p:88},{n:'ReactJS',p:82},{n:'LangChain',p:78}] },
  { cat:'AI / ML',    color:'#f72585', items:[{n:'CrewAI',p:85},{n:'RAG Systems',p:80},{n:'LLM APIs',p:82}] },
  { cat:'Data',       color:'#ffd60a', items:[{n:'MySQL/SQLite',p:85},{n:'Vector DB',p:78},{n:'AWS Basics',p:70}] },
]

function TechCard({ t, i }) {
  const ref = useRef()
  const isInView = useInView(ref, { once:true, margin:'-50px' })
  return (
    <motion.div ref={ref} initial={{ opacity:0, y:30 }} animate={isInView?{opacity:1,y:0}:{}}
      transition={{ duration:0.8, delay:i*0.1 }}
      data-cursor-text={t.cat.toUpperCase()}
      className="glass-card p-6 pointer-events-auto">
      <h3 className="text-lg font-bold mb-4" style={{ color:t.color }}>{t.cat}</h3>
      <div className="flex flex-col gap-4">
        {t.items.map(item => (
          <div key={item.n}>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-300">{item.n}</span>
              <span className="font-mono text-gray-500">{item.p}%</span>
            </div>
            <div className="h-1 bg-white/10 rounded overflow-hidden">
              <motion.div initial={{ width:0 }} animate={isInView?{width:`${item.p}%`}:{}}
                transition={{ duration:1, delay:i*0.1 + 0.3 }}
                className="h-full" style={{ background:t.color }} />
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

export default function Skills() {
  return (
    <section id="skills" className="py-32 pointer-events-none relative z-10">
      <div className="max-w-7xl mx-auto px-8 md:px-16 lg:px-24 xl:px-32">
        <div className="mb-20 pointer-events-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">Skills & Stack</h2>
          <p className="text-gray-400 max-w-2xl leading-relaxed">
            The core technologies I use to build scalable backends and intelligent automated pipelines.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {TECH.map((t,i) => <TechCard key={t.cat} t={t} i={i} />)}
        </div>
      </div>
    </section>
  )
}