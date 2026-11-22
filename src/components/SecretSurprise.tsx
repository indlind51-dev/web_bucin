import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Sparkles } from 'lucide-react'

interface ExplosionHeart {
  id: number
  x: number
  y: number
  angle: number
  distance: number
  size: number
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

function HeartExplosion({ active, reduced }: { active: boolean; reduced: boolean }) {
  const [hearts] = useState<ExplosionHeart[]>(() =>
    Array.from({ length: 24 }, (_, i) => ({
      id: i,
      x: 0,
      y: 0,
      angle: (i / 24) * 360,
      distance: Math.random() * 160 + 80,
      size: Math.random() * 20 + 14,
    }))
  )

  if (!active || reduced) return null

  return (
    <div className="absolute inset-0 pointer-events-none overflow-visible z-50">
      {hearts.map((h) => {
        const rad = (h.angle * Math.PI) / 180
        const tx = Math.cos(rad) * h.distance
        const ty = Math.sin(rad) * h.distance
        return (
          <motion.span
            key={h.id}
            className="absolute left-1/2 top-1/2 select-none"
            style={{ fontSize: h.size }}
            initial={{ x: 0, y: 0, opacity: 1, scale: 0 }}
            animate={{ x: tx, y: ty, opacity: 0, scale: 1 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
          >
            ❤️
          </motion.span>
        )
      })}
    </div>
  )
}

export default function SecretSurprise() {
  const [revealed, setRevealed] = useState(false)
  const [exploding, setExploding] = useState(false)
  const reduced = useReducedMotion()

  function handleReveal() {
    if (revealed) return
    setExploding(true)
    setTimeout(() => {
      setExploding(false)
      setRevealed(true)
    }, reduced ? 100 : 1400)
  }

  return (
    <section
      id="surprise"
      className="relative py-24 px-6"
      style={{ background: '#080808' }}
    >
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        <p className="text-[#DC143C] text-sm tracking-[0.3em] uppercase mb-3">Rahasia Untukmu</p>
        <h2 className="text-4xl sm:text-5xl font-bold text-white glow-pink" style={{ fontFamily: 'Georgia, serif' }}>
          Ada Kejutan
        </h2>
        <p className="text-white/40 text-sm mt-4 italic">Ada pesan tersembunyi yang menunggumu...</p>
      </motion.div>

      <div className="flex flex-col items-center gap-8">
        {/* Mysterious button */}
        <AnimatePresence mode="wait">
          {!revealed && (
            <motion.div key="button" className="relative" exit={{ opacity: 0, scale: 0.5 }}>
              {/* Pulsing rings */}
              {!reduced && (
                <>
                  {[1, 2, 3].map((ring) => (
                    <motion.div
                      key={ring}
                      className="absolute inset-0 rounded-full"
                      style={{ border: '2px solid rgba(220,20,60,0.4)' }}
                      animate={{ scale: [1, 1 + ring * 0.5], opacity: [0.6, 0] }}
                      transition={{ duration: 2, delay: ring * 0.4, repeat: Infinity }}
                    />
                  ))}
                </>
              )}

              <motion.button
                onClick={handleReveal}
                disabled={exploding}
                className="relative w-32 h-32 rounded-full flex flex-col items-center justify-center gap-2 cursor-pointer"
                style={{
                  background: 'linear-gradient(135deg, #DC143C, #8B0000)',
                  boxShadow: '0 0 40px rgba(220, 20, 60, 0.7)',
                }}
                animate={!reduced ? {
                  boxShadow: [
                    '0 0 40px rgba(220,20,60,0.5)',
                    '0 0 70px rgba(220,20,60,0.9)',
                    '0 0 40px rgba(220,20,60,0.5)',
                  ],
                } : {}}
                transition={{ duration: 2, repeat: Infinity }}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.93 }}
              >
                <HeartExplosion active={exploding} reduced={reduced} />
                <Sparkles className="w-8 h-8 text-white" />
                <span className="text-white text-xs font-semibold tracking-wide">Buka</span>
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Revealed message */}
        <AnimatePresence>
          {revealed && (
            <motion.div
              className="max-w-lg w-full"
              initial={{ opacity: 0, scale: 0.5, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, type: 'spring', stiffness: 150 }}
            >
              <div
                className="glass-red rounded-3xl p-8 sm:p-10 text-center"
                style={{ boxShadow: '0 0 60px rgba(220,20,60,0.3)' }}
              >
                <motion.div
                  className="text-5xl mb-6"
                  animate={!reduced ? { scale: [1, 1.3, 1] } : {}}
                  transition={{ duration: 1, repeat: Infinity, repeatDelay: 1 }}
                >
                  💝
                </motion.div>
                <h3 className="text-white text-2xl sm:text-3xl font-bold mb-4" style={{ fontFamily: 'Georgia, serif' }}>
                  Pesan Rahasiaku
                </h3>
                <p className="text-[#ffb6c1] text-base sm:text-lg leading-relaxed italic mb-6" style={{ fontFamily: 'Georgia, serif' }}>
                  "Setiap kali aku melihatmu, aku jatuh cinta lebih dalam dari sebelumnya. Kamu bukan hanya cintaku — kamu adalah alasanku untuk tersenyum setiap pagi."
                </p>
                <p className="text-white/60 text-sm">
                  ~ Hanya untukmu, Sayang ~
                </p>

                {/* Heart burst decoration */}
                <div className="flex justify-center gap-2 mt-6">
                  {['❤️', '💕', '💗', '💓', '❤️'].map((e, i) => (
                    <motion.span
                      key={i}
                      className="text-xl"
                      animate={!reduced ? { y: [0, -8, 0] } : {}}
                      transition={{ duration: 1.5, delay: i * 0.15, repeat: Infinity }}
                    >
                      {e}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
