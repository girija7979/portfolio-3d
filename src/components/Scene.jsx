import { useRef, useMemo, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { Stars } from '@react-three/drei'
import * as THREE from 'three'

// Create a simple circular texture programmatically for perfect round particles
const getCircleTexture = () => {
  const canvas = document.createElement('canvas')
  canvas.width = 64
  canvas.height = 64
  const ctx = canvas.getContext('2d')
  
  ctx.beginPath()
  ctx.arc(32, 32, 30, 0, Math.PI * 2)
  ctx.fillStyle = '#ffffff'
  ctx.fill()
  
  const texture = new THREE.CanvasTexture(canvas)
  return texture
}

function ParticleGalaxy({ count = 2000 }) {
  const meshRef = useRef()
  const mouseRef = useRef({ x: 0, y: 0 })
  const circleTexture = useMemo(() => getCircleTexture(), [])

  const [positions, colors, sizes] = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    const sizes = new Float32Array(count)

    const palette = [
      new THREE.Color('#00e5ff'), // cyan
      new THREE.Color('#7c3aed'), // purple
      new THREE.Color('#f72585'), // pink
      new THREE.Color('#4cc9f0'), // light blue
    ]

    for (let i = 0; i < count; i++) {
      // Create a more immersive 3D volume, not just a flat disk
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      const r = 5 + Math.random() * 25
      
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      positions[i * 3 + 2] = r * Math.cos(phi)

      const c = palette[Math.floor(Math.random() * palette.length)]
      colors[i * 3] = c.r
      colors[i * 3 + 1] = c.g
      colors[i * 3 + 2] = c.b

      sizes[i] = Math.random() * 3 + 1
    }
    return [positions, colors, sizes]
  }, [count])

  useEffect(() => {
    const onMouseMove = (e) => {
      mouseRef.current.x = (e.clientX / window.innerWidth - 0.5) * 2
      mouseRef.current.y = -(e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('mousemove', onMouseMove)
    return () => window.removeEventListener('mousemove', onMouseMove)
  }, [])

  useFrame((state) => {
    if (!meshRef.current) return
    const t = state.clock.elapsedTime
    
    // Gentle rotation of the entire galaxy
    meshRef.current.rotation.y = t * 0.03
    meshRef.current.rotation.x = t * 0.02
    
    // Parallax effect with mouse
    const targetX = mouseRef.current.x * 0.8
    const targetY = mouseRef.current.y * 0.8
    
    meshRef.current.position.x += (targetX - meshRef.current.position.x) * 0.05
    meshRef.current.position.y += (targetY - meshRef.current.position.y) * 0.05
  })

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" array={positions} count={count} itemSize={3} />
        <bufferAttribute attach="attributes-color" array={colors} count={count} itemSize={3} />
        <bufferAttribute attach="attributes-size" array={sizes} count={count} itemSize={1} />
      </bufferGeometry>
      <pointsMaterial
        size={0.15}
        vertexColors
        transparent
        opacity={0.7}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        map={circleTexture}
        alphaTest={0.01}
      />
    </points>
  )
}

export default function Scene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <ParticleGalaxy />
      {/* Fallback standard stars */}
      <Stars radius={50} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
    </>
  )
}