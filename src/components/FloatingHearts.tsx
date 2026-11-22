import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

interface Heart {
  id: number
  x: number
  size: number
  duration: number
  delay: number
  emoji: string
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

const EMOJIS = ['❤️', '🤍', '💕', '💗', '💓']

export default function FloatingHearts() {
  const reduced = useReducedMotion()
  const [hearts] = useState<Heart[]>(() =>
    Array.from({ length: 18 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      size: Math.random() * 18 + 10,
      duration: Math.random() * 10 + 10,
      delay: Math.random() * 10,
      emoji: EMOJIS[i % EMOJIS.length],
    }))
  )

  if (reduced) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {hearts.map((h) => (
        <motion.div
          key={h.id}
          className="absolute select-none"
          style={{
            left: `${h.x}%`,
            bottom: '-5%',
            fontSize: h.size,
            opacity: 0.18,
          }}
          animate={{
            y: [0, -(window.innerHeight * 1.3)],
            x: [0, Math.sin(h.id) * 60],
            opacity: [0, 0.2, 0.18, 0.1, 0],
          }}
          transition={{
            duration: h.duration,
            delay: h.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          {h.emoji}
        </motion.div>
      ))}
    </div>
  )
}
