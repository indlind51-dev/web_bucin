import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

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

export default function HeroSection() {
  const reduced = useReducedMotion()

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6 py-20"
      style={{ background: 'radial-gradient(ellipse at center, #0d0003 0%, #080808 65%)' }}
    >
      {/* Soft glow rings */}
      {!reduced && (
        <>
          <motion.div
            className="absolute rounded-full pointer-events-none"
            style={{
              width: 600,
              height: 600,
              border: '1px solid rgba(220, 20, 60, 0.12)',
            }}
            animate={{ scale: [1, 1.08, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute rounded-full pointer-events-none"
            style={{
              width: 400,
              height: 400,
              border: '1px solid rgba(220, 20, 60, 0.18)',
            }}
            animate={{ scale: [1, 1.12, 1], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
          />
        </>
      )}

      <div className="relative z-10 flex flex-col items-center gap-6 text-center max-w-3xl mx-auto">
        {/* Top badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="flex items-center gap-2 glass-red rounded-full px-5 py-2"
        >
          <span className="text-[#DC143C] text-xs tracking-widest uppercase">Hanya Untukmu</span>
        </motion.div>

        {/* Heart */}
        <motion.div
          className={`text-7xl sm:text-8xl ${reduced ? '' : 'heartbeat'}`}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, type: 'spring', stiffness: 150, delay: 0.4 }}
        >
          ❤️
        </motion.div>

        {/* Main title */}
        <motion.h1
          className="text-5xl sm:text-7xl md:text-8xl font-bold leading-tight"
          style={{ fontFamily: 'Georgia, serif' }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.6 }}
        >
          <span className="text-white">For You,</span>
          <br />
          <span className="text-[#DC143C] glow-text">Sayang</span>
        </motion.h1>

        {/* Divider */}
        <motion.div
          className="flex items-center gap-4 w-full max-w-xs"
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 1, delay: 0.9 }}
        >
          <div className="flex-1 h-px bg-gradient-to-r from-transparent to-[#DC143C]" />
          <span className="text-[#DC143C] text-xs">❤</span>
          <div className="flex-1 h-px bg-gradient-to-l from-transparent to-[#DC143C]" />
        </motion.div>

        {/* Subtitle */}
        <motion.p
          className="text-xl sm:text-2xl text-[#ffb6c1] italic leading-relaxed"
          style={{ fontFamily: 'Georgia, serif' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 1 }}
        >
          "You make my world beautiful."
        </motion.p>

        <motion.p
          className="text-base sm:text-lg text-white/50 max-w-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 1.3 }}
        >
          Ada sesuatu yang ingin aku katakan kepadamu — sesuatu yang terasa lebih dari sekadar kata-kata.
        </motion.p>

        {/* Scroll hint */}
        <motion.div
          className="mt-8 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2 }}
        >
          <span className="text-white/30 text-xs tracking-widest uppercase">Gulir ke bawah</span>
          <motion.div
            className="w-px h-10 bg-gradient-to-b from-[#DC143C] to-transparent"
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </motion.div>
      </div>
    </section>
  )
}
