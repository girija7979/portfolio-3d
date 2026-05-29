import { useRef, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function CursorMesh() {
  const meshRef = useRef()
  const wireRef = useRef()
  const [hoverState, setHoverState] = useState('default')
  
  useEffect(() => {
    const handleHover = (e) => setHoverState(e.detail)
    window.addEventListener('cursor-hover', handleHover)
    return () => window.removeEventListener('cursor-hover', handleHover)
  }, [])

  const vec = new THREE.Vector3()
  
  useFrame((state, delta) => {
    // Map mouse to world coordinates (z=0)
    const targetX = (state.pointer.x * state.viewport.width) / 2
    const targetY = (state.pointer.y * state.viewport.height) / 2
    
    // Ultra smooth follow physics
    meshRef.current.position.lerp(vec.set(targetX, targetY, 0), 0.25)
    wireRef.current.position.copy(meshRef.current.position)
    
    // Dynamic Rotation
    const rotSpeed = hoverState === 'text' ? 3 : (hoverState === 'pointer' ? 2 : 1)
    meshRef.current.rotation.x += delta * rotSpeed * 0.8
    meshRef.current.rotation.y += delta * rotSpeed
    wireRef.current.rotation.x -= delta * rotSpeed * 0.5
    wireRef.current.rotation.y -= delta * rotSpeed * 0.3
    
    // Scale interpolation based on hover state (elongated crystal shape)
    const targetScale = hoverState === 'text' ? 1.0 : (hoverState === 'pointer' ? 0.5 : 0.2)
    meshRef.current.scale.lerp(vec.set(targetScale, targetScale * 1.5, targetScale), 0.15)
    wireRef.current.scale.lerp(vec.set(targetScale * 1.3, targetScale * 1.95, targetScale * 1.3), 0.15)
  })

  return (
    <>
      <ambientLight intensity={1.5} />
      <directionalLight position={[5, 5, 5]} intensity={3} />
      <directionalLight position={[-5, -5, -5]} intensity={1} color="#f72585" />
      
      {/* Precision Geometric Crystal Core */}
      <mesh ref={meshRef}>
        <octahedronGeometry args={[1, 0]} />
        <meshStandardMaterial 
          color={hoverState === 'text' ? '#f72585' : (hoverState === 'pointer' ? '#7c3aed' : '#00e5ff')}
          emissive={hoverState === 'text' ? '#f72585' : (hoverState === 'pointer' ? '#7c3aed' : '#00e5ff')}
          emissiveIntensity={hoverState === 'default' ? 0.8 : 0.4}
          metalness={1}
          roughness={0.1}
        />
      </mesh>
      
      {/* Outer Geometric Cage */}
      <mesh ref={wireRef}>
        <octahedronGeometry args={[1, 0]} />
        <meshBasicMaterial 
          color={hoverState === 'text' ? '#ffffff' : '#00e5ff'} 
          wireframe 
          transparent 
          opacity={hoverState === 'default' ? 0.8 : 0.3} 
        />
      </mesh>
    </>
  )
}

export default function Cursor3D() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return
    setIsVisible(true)

    const handleMouseOver = (e) => {
      const target = e.target
      const isClickable = 
        window.getComputedStyle(target).cursor === 'pointer' || 
        target.closest('a') || target.closest('button') || target.closest('[data-interactive]')
      
      const card = target.closest('.glass-card')
      
      let state = 'default'
      if (isClickable) state = 'pointer'
      else if (card && card.closest('#projects')) state = 'text'
      
      window.dispatchEvent(new CustomEvent('cursor-hover', { detail: state }))
    }

    window.addEventListener('mouseover', handleMouseOver)
    return () => window.removeEventListener('mouseover', handleMouseOver)
  }, [])

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999]">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }} gl={{ alpha: true, antialias: true }} dpr={[1, 2]}>
        <CursorMesh />
      </Canvas>
    </div>
  )
}
