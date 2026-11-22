import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

interface Particle {
  id: number
  x: number
  y: number
  size: number
  duration: number
  delay: number
  color: string
}

interface FloatingHeart {
  id: number
  x: number
  size: number
  duration: number
  delay: number
}

function useReducedMotion() {
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(mq.matches)
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])
  return reduced
}

export default function IntroScreen({ onEnter }: { onEnter: () => void }) {
  const reduced = useReducedMotion()
  const [particles] = useState<Particle[]>(() =>
    Array.from({ length: 40 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 4 + 3,
      delay: Math.random() * 4,
      color: i % 3 === 0 ? '#DC143C' : i % 3 === 1 ? '#ff6b8a' : '#ffb6c1',
    }))
  )

  const [hearts] = useState<FloatingHeart[]>(() =>
    Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      size: Math.random() * 20 + 14,
      duration: Math.random() * 8 + 8,
      delay: Math.random() * 6,
    }))
  )

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden"
      style={{ background: 'radial-gradient(ellipse at center, #120005 0%, #080808 70%)' }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 1.2, ease: 'easeInOut' }}
    >
      {/* Particles */}
      {!reduced && particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            background: p.color,
            boxShadow: `0 0 ${p.size * 3}px ${p.color}`,
          }}
          animate={{
            y: [0, -20, 10, -30, 0],
            x: [0, 10, -10, 5, 0],
            opacity: [0.4, 1, 0.6, 1, 0.4],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Floating Hearts */}
      {!reduced && hearts.map((h) => (
        <motion.div
          key={h.id}
          className="absolute pointer-events-none select-none"
          style={{
            left: `${h.x}%`,
            bottom: '-5%',
            fontSize: h.size,
          }}
          animate={{ y: [0, -window.innerHeight * 1.2], opacity: [0, 0.8, 0.8, 0] }}
          transition={{
            duration: h.duration,
            delay: h.delay,
            repeat: Infinity,
            ease: 'easeOut',
          }}
        >
          ❤️
        </motion.div>
      ))}

      {/* Content */}
      <motion.div
        className="relative z-10 flex flex-col items-center gap-8 px-6 text-center"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, ease: 'easeOut', delay: 0.5 }}
      >
        {/* Decorative top line */}
        <motion.div
          className="flex items-center gap-3"
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 1, delay: 1 }}
        >
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#DC143C]" />
          <span className="text-[#DC143C] text-sm tracking-[0.3em] uppercase">a message for you</span>
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#DC143C]" />
        </motion.div>

        {/* Main text */}
        <motion.h1
          className="text-3xl sm:text-5xl md:text-6xl font-bold text-white leading-tight"
          style={{ fontFamily: 'Georgia, serif' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 1.2 }}
        >
          <span className="glow-pink">Something special</span>
          <br />
          <span className="text-[#DC143C] glow-text">for you...</span>
        </motion.h1>

        {/* Heart */}
        <motion.div
          className="text-5xl heartbeat"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 2, type: 'spring', stiffness: 200 }}
        >
          ❤️
        </motion.div>

        {/* Subtitle */}
        <motion.p
          className="text-[#ffb6c1] text-base sm:text-lg italic"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2.4 }}
        >
          Dibuat dengan sepenuh hati, hanya untukmu.
        </motion.p>

        {/* CTA Button */}
        <motion.button
          onClick={onEnter}
          className="mt-4 px-8 py-4 rounded-full text-white font-semibold text-base sm:text-lg cursor-pointer relative overflow-hidden group"
          style={{
            background: 'linear-gradient(135deg, #DC143C, #8B0000)',
            boxShadow: '0 0 30px rgba(220, 20, 60, 0.6)',
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 3 }}
          whileHover={{ scale: 1.05, boxShadow: '0 0 50px rgba(220, 20, 60, 0.9)' }}
          whileTap={{ scale: 0.97 }}
        >
          <span className="relative z-10">Open My Heart ❤️</span>
          <motion.div
            className="absolute inset-0 bg-white/10"
            initial={{ x: '-100%' }}
            whileHover={{ x: '100%' }}
            transition={{ duration: 0.5 }}
          />
        </motion.button>
      </motion.div>

      {/* Vignette overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 40%, #080808 100%)',
        }}
      />
    </motion.div>
  )
}
