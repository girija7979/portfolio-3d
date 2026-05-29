import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

export default function Contact() {
  const ref = useRef()
  const isInView = useInView(ref, { once:true, margin:'-100px' })

  return (
    <section id="contact" ref={ref} className="py-32 pointer-events-none relative z-10">
      <div className="max-w-4xl mx-auto px-8 md:px-16 text-center">
        
        <motion.div initial={{ opacity:0, y:40 }} animate={isInView?{opacity:1,y:0}:{}} transition={{ duration:0.8 }}>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white pointer-events-auto">Let's Connect</h2>
          
          <p className="text-gray-400 max-w-2xl mx-auto leading-relaxed mb-12 pointer-events-auto">
            Currently open for new opportunities. Whether you have a question or just want to say hi, 
            I'll try my best to get back to you!
          </p>
          
          <div className="flex flex-wrap justify-center gap-6 pointer-events-auto">
            <a href="mailto:girijabiswal21@gmail.com" 
               data-cursor-text="EMAIL"
               className="glass-card px-8 py-4 font-bold text-cyan-400 hover:bg-cyan-400/10 transition-colors">
              girijabiswal21@gmail.com
            </a>
            <a href="tel:+918144846086" 
               data-cursor-text="CALL"
               className="glass-card px-8 py-4 font-bold text-purple-400 hover:bg-purple-400/10 transition-colors">
              +91 8144 846 086
            </a>
          </div>
          
          <div className="mt-20 pt-8 border-t border-white/10 text-gray-500 font-mono text-sm pointer-events-auto flex justify-between items-center">
            <span>© 2024 Girija Sankar Biswal</span>
            <span>Bengaluru, Karnataka</span>
          </div>
        </motion.div>
        
      </div>
    </section>
  )
}