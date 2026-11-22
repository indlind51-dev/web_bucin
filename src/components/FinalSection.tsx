import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'

interface ConfettiHeart {
  id: number
  x: number
  y: number
  angle: number
  distance: number
  size: number
  color: string
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

const COLORS = ['#DC143C', '#ff6b8a', '#ffb6c1', '#fff', '#ff9eb5']

function FullscreenHearts({ active, reduced }: { active: boolean; reduced: boolean }) {
  const [hearts] = useState<ConfettiHeart[]>(() =>
    Array.from({ length: 60 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      angle: Math.random() * 360,
      distance: Math.random() * 300 + 100,
      size: Math.random() * 24 + 12,
      color: COLORS[i % COLORS.length],
    }))
  )

  if (!active || reduced) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {hearts.map((h) => {
        const rad = (h.angle * Math.PI) / 180
        const tx = Math.cos(rad) * h.distance
        const ty = Math.sin(rad) * h.distance
        return (
          <motion.span
            key={h.id}
            className="absolute select-none"
            style={{
              left: `${h.x}%`,
              top: `${h.y}%`,
              fontSize: h.size,
              color: h.color,
            }}
            initial={{ x: 0, y: 0, opacity: 1, scale: 0, rotate: 0 }}
            animate={{ x: tx, y: ty, opacity: 0, scale: 1, rotate: 360 }}
            transition={{ duration: 2, ease: 'easeOut', delay: Math.random() * 0.3 }}
          >
            ❤
          </motion.span>
        )
      })}
    </div>
  )
}

export default function FinalSection() {
  const [answered, setAnswered] = useState<'yes' | 'no' | null>(null)
  const [noClicks, setNoClicks] = useState(0)
  const [showConfetti, setShowConfetti] = useState(false)
  const reduced = useReducedMotion()

  const noMessages = [
    'Yakin? 🥺',
    'Coba lagi... 💔',
    'Jangan dong... 😢',
    'Please... 🙏',
    'Aku serius nih... 😭',
    'Masa iya...',
    'Baik deh... 😔',
  ]

  function handleYes() {
    setAnswered('yes')
    setShowConfetti(true)
    setTimeout(() => setShowConfetti(false), 2500)
  }

  function handleNo() {
    if (noClicks >= noMessages.length - 1) {
      // After enough clicks, force yes
      handleYes()
      return
    }
    setNoClicks((c) => c + 1)
  }

  return (
    <section
      id="final"
      className="relative min-h-screen flex flex-col items-center justify-center px-6 py-24"
      style={{ background: 'radial-gradient(ellipse at center, #120005 0%, #080808 70%)' }}
    >
      <FullscreenHearts active={showConfetti} reduced={reduced} />

      <motion.div
        className="text-center max-w-xl mx-auto"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        {/* Decorative */}
        <motion.div
          className="text-5xl mb-6"
          animate={!reduced ? { scale: [1, 1.2, 1] } : {}}
          transition={{ duration: 2, repeat: Infinity }}
        >
          💍
        </motion.div>

        <h2
          className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 glow-pink leading-tight"
          style={{ fontFamily: 'Georgia, serif' }}
        >
          Will You Always
          <br />
          <span className="text-[#DC143C] glow-text">Be Mine?</span>
        </h2>

        <p className="text-white/60 text-base sm:text-lg italic mb-12" style={{ fontFamily: 'Georgia, serif' }}>
          Satu pertanyaan, satu jawaban, selamanya.
        </p>

        <AnimatePresence mode="wait">
          {!answered ? (
            <motion.div
              key="buttons"
              className="flex flex-col sm:flex-row items-center justify-center gap-6"
              exit={{ opacity: 0, scale: 0.8 }}
            >
              {/* YES button */}
              <motion.button
                onClick={handleYes}
                className="px-10 py-4 rounded-full text-white font-bold text-xl cursor-pointer relative overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, #DC143C, #8B0000)',
                  boxShadow: '0 0 30px rgba(220, 20, 60, 0.6)',
                  minWidth: 160,
                }}
                whileHover={{ scale: 1.08, boxShadow: '0 0 60px rgba(220,20,60,0.9)' }}
                whileTap={{ scale: 0.95 }}
                animate={!reduced ? {
                  boxShadow: [
                    '0 0 30px rgba(220,20,60,0.5)',
                    '0 0 60px rgba(220,20,60,0.9)',
                    '0 0 30px rgba(220,20,60,0.5)',
                  ],
                } : {}}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <span className="relative z-10">Iya, Sayang ❤️</span>
              </motion.button>

              {/* NO button — gets smaller and shows funny messages */}
              <motion.button
                onClick={handleNo}
                className="px-6 py-3 rounded-full text-white/50 font-semibold cursor-pointer border border-white/10"
                style={{ minWidth: 120 }}
                animate={{ scale: Math.max(0.5, 1 - noClicks * 0.08) }}
                whileHover={{ scale: Math.max(0.45, 0.95 - noClicks * 0.08) }}
                whileTap={{ scale: Math.max(0.4, 0.9 - noClicks * 0.08) }}
              >
                {noClicks === 0 ? 'Tidak' : noMessages[noClicks]}
              </motion.button>
            </motion.div>
          ) : (
            <motion.div
              key="response"
              className="flex flex-col items-center gap-6"
              initial={{ opacity: 0, scale: 0.5, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1, type: 'spring', stiffness: 150 }}
            >
              {/* Big heart */}
              <motion.div
                className="text-7xl"
                animate={!reduced ? { scale: [1, 1.4, 1], rotate: [0, -10, 10, 0] } : {}}
                transition={{ duration: 1.2, repeat: Infinity, repeatDelay: 1 }}
              >
                ❤️
              </motion.div>

              <div
                className="glass-red rounded-3xl p-8 sm:p-10 text-center"
                style={{ boxShadow: '0 0 60px rgba(220,20,60,0.4)' }}
              >
                <h3
                  className="text-2xl sm:text-3xl font-bold text-white mb-4"
                  style={{ fontFamily: 'Georgia, serif' }}
                >
                  Aku Tahu Jawabannya 💕
                </h3>
                <p
                  className="text-[#ffb6c1] text-base sm:text-lg leading-relaxed italic"
                  style={{ fontFamily: 'Georgia, serif' }}
                >
                  "Terima kasih sudah memilihku hari ini, kemarin, dan untuk hari-hari yang belum datang. Aku tidak akan berhenti mencintaimu — tidak sekarang, tidak pernah."
                </p>
                <p className="text-white/40 text-sm mt-6">
                  Dibuat dengan sepenuh cinta ❤️
                </p>
              </div>

              {/* Floating hearts around */}
              <div className="flex justify-center gap-3 mt-2">
                {['❤️', '💕', '💗', '💓', '💝', '💕', '❤️'].map((e, i) => (
                  <motion.span
                    key={i}
                    className="text-xl"
                    animate={!reduced ? { y: [0, -12, 0], opacity: [1, 0.6, 1] } : {}}
                    transition={{ duration: 1.5 + i * 0.1, delay: i * 0.1, repeat: Infinity }}
                  >
                    {e}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Footer */}
      <motion.div
        className="mt-24 text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <div className="h-px w-32 bg-gradient-to-r from-transparent via-[#DC143C] to-transparent mx-auto mb-6" />
        <p className="text-white/20 text-sm italic">For You, Sayang — Selalu dan Selamanya ❤️</p>
      </motion.div>
    </section>
  )
}
