import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function Cursor() {
  const [hoverState, setHoverState] = useState('default')
  const [hoverText, setHoverText] = useState('')
  const [isVisible, setIsVisible] = useState(false)
  
  // Exact mouse tracking for the dot
  const mouseX = useMotionValue(-100)
  const mouseY = useMotionValue(-100)
  
  // Smooth spring physics for the outer ring (TerraHQ style lag)
  const ringSpringConfig = { damping: 25, stiffness: 200, mass: 0.5 }
  const ringX = useSpring(mouseX, ringSpringConfig)
  const ringY = useSpring(mouseY, ringSpringConfig)

  useEffect(() => {
    // Only enable on devices with a mouse
    if (!window.matchMedia('(pointer: fine)').matches) return
    setIsVisible(true)

    const updateMouse = (e) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }

    const handleMouseOver = (e) => {
      const target = e.target
      
      const isClickable = 
        window.getComputedStyle(target).cursor === 'pointer' || 
        target.tagName.toLowerCase() === 'a' || 
        target.tagName.toLowerCase() === 'button' ||
        target.closest('a') || 
        target.closest('button') ||
        target.closest('[data-interactive]')

      const card = target.closest('.glass-card')

      if (isClickable) {
        setHoverState('pointer')
        
        let customText = target.getAttribute('data-cursor-text') || 
                         target.closest('[data-cursor-text]')?.getAttribute('data-cursor-text')
                         
        if (!customText) {
          const btn = target.closest('a') || target.closest('button') || target
          const ariaLabel = btn.getAttribute('aria-label')
          const title = btn.getAttribute('title')
          
          let textContent = btn.textContent || btn.innerText || ariaLabel || title || ''
          let words = textContent.trim().toUpperCase().split(/[\s\n]+/)
          customText = words[0] || 'OPEN'
          
          // If the word is too long or weird, fallback
          if (customText.length > 10) customText = customText.substring(0, 10)
        }
        
        setHoverText(customText)
        return
      }

      if (card) {
        setHoverState('text')
        let cardText = target.getAttribute('data-cursor-text') || 
                       target.closest('[data-cursor-text]')?.getAttribute('data-cursor-text')
                       
        if (!cardText) {
          cardText = card.closest('#projects') ? 'EXPLORE' : 'VIEW'
        }
        
        setHoverText(cardText.toUpperCase())
        return
      }
      
      setHoverState('default')
      setHoverText('')
    }

    const handleMouseDown = () => setHoverState(prev => prev === 'default' ? 'clicking' : prev)
    const handleMouseUp = () => setHoverState(prev => prev === 'clicking' ? 'default' : prev)

    window.addEventListener('mousemove', updateMouse)
    window.addEventListener('mouseover', handleMouseOver)
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)

    return () => {
      window.removeEventListener('mousemove', updateMouse)
      window.removeEventListener('mouseover', handleMouseOver)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [])

  if (!isVisible) return null

  // Inner dot (TerraHQ style usually scales down/vanishes on hover)
  const dotVariants = {
    default: { opacity: 1, scale: 1 },
    clicking: { opacity: 0.5, scale: 0.5 },
    pointer: { opacity: 0, scale: 0 },
    text: { opacity: 0, scale: 0 }
  }

  const ringVariants = {
    default: {
      width: 40,
      height: 40,
      backgroundColor: 'rgba(0, 229, 255, 0)',
      border: '2px solid rgba(0, 229, 255, 1)',
    },
    clicking: {
      width: 30,
      height: 30,
      backgroundColor: 'rgba(0, 229, 255, 0.3)',
      border: '2px solid rgba(0, 229, 255, 1)',
    },
    pointer: {
      width: 140,
      height: 140,
      backgroundColor: '#ffffff',
      border: 'none',
      boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
      backdropFilter: 'blur(0px)',
    },
    text: {
      width: 160,
      height: 160,
      backgroundColor: '#00e5ff',
      border: 'none',
      boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
      backdropFilter: 'blur(0px)',
    }
  }

  return (
    <>
      {/* Smooth Outer Ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998] rounded-full flex items-center justify-center overflow-hidden"
        variants={ringVariants}
        animate={hoverState}
        transition={{ duration: 0.3, ease: "easeOut" }}
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <motion.span 
          initial={{ opacity: 0, y: 10, scale: 0.8 }}
          animate={{ 
            opacity: (hoverState === 'text' || hoverState === 'pointer') ? 1 : 0,
            y: (hoverState === 'text' || hoverState === 'pointer') ? 0 : 10,
            scale: (hoverState === 'text' || hoverState === 'pointer') ? 1 : 0.8
          }}
          transition={{ duration: 0.2, delay: (hoverState === 'text' || hoverState === 'pointer') ? 0.1 : 0 }}
          className="text-[#050508] font-bold font-sans text-[16px] tracking-widest pointer-events-none text-center"
        >
          {hoverText}
        </motion.span>
      </motion.div>

      {/* Crisp Inner Dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-[#00e5ff] rounded-full pointer-events-none z-[9999]"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        variants={dotVariants}
        animate={hoverState}
        transition={{ duration: 0.2 }}
      />
    </>
  )
}
