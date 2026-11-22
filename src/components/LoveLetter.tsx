import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'

const LETTER_TEXT = `Sayang,

Aku tidak tahu harus mulai dari mana, karena perasaan ini terlalu besar
untuk dirangkum dalam kata-kata. Tapi aku akan coba.

Kamu adalah bagian terbaik dari hariku. Setiap pagi yang aku bangun,
aku bersyukur karena ada kamu. Senyummu, tawamu, bahkan cemberutmu —
semuanya membuatku jatuh cinta lagi dan lagi.

Kamu bukan hanya pacarku. Kamu adalah rumahku, tempat aku pulang
ketika dunia terasa terlalu berat. Di sisimu, segalanya jadi lebih mudah,
lebih hangat, lebih berarti.

Terima kasih sudah ada. Terima kasih sudah menerima aku apa adanya.
Terima kasih sudah menjadi kamu.

Aku sayang kamu — lebih dari yang bisa aku ungkapkan.

Selalu milikmu,
❤`

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

function useTypingEffect(text: string, speed: number, active: boolean) {
  const [displayed, setDisplayed] = useState('')
  const idx = useRef(0)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (!active) return
    idx.current = 0
    setDisplayed('')
    function type() {
      if (idx.current < text.length) {
        const char = text[idx.current]
        setDisplayed((prev) => prev + char)
        idx.current++
        timer.current = setTimeout(type, speed)
      }
    }
    type()
    return () => { if (timer.current) clearTimeout(timer.current) }
  }, [active, text, speed])

  return displayed
}

export default function LoveLetter() {
  const [opened, setOpened] = useState(false)
  const [showLetter, setShowLetter] = useState(false)
  const reduced = useReducedMotion()
  const typedText = useTypingEffect(LETTER_TEXT, reduced ? 0 : 20, showLetter)

  function handleOpen() {
    if (opened) return
    setOpened(true)
    setTimeout(() => setShowLetter(true), reduced ? 100 : 900)
  }

  return (
    <section
      id="letter"
      className="relative min-h-screen flex flex-col items-center justify-center px-6 py-24"
      style={{ background: '#080808' }}
    >
      {/* Section header */}
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        <p className="text-[#DC143C] text-sm tracking-[0.3em] uppercase mb-3">Sebuah Surat</p>
        <h2 className="text-4xl sm:text-5xl font-bold text-white glow-pink" style={{ fontFamily: 'Georgia, serif' }}>
          Kata Hati Untukmu
        </h2>
      </motion.div>

      {/* Envelope */}
      <motion.div
        className="relative w-full max-w-md mx-auto cursor-pointer"
        initial={{ opacity: 0, scale: 0.8, y: 40 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, type: 'spring' }}
        onClick={handleOpen}
        whileHover={!opened ? { scale: 1.03 } : {}}
        whileTap={!opened ? { scale: 0.97 } : {}}
      >
        {/* Envelope body */}
        <div
          className="relative rounded-xl overflow-hidden"
          style={{
            background: 'linear-gradient(145deg, #1a0005, #0d0003)',
            boxShadow: '0 0 40px rgba(220, 20, 60, 0.3)',
            border: '1px solid rgba(220, 20, 60, 0.3)',
          }}
        >
          {/* Envelope flap (animated) */}
          <motion.div
            className="absolute top-0 left-0 right-0"
            style={{ transformOrigin: 'top center', zIndex: 10 }}
            animate={opened ? { rotateX: -180, opacity: 0 } : { rotateX: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
          >
            <svg viewBox="0 0 400 180" className="w-full" preserveAspectRatio="none">
              <polygon
                points="0,0 400,0 200,160"
                fill="#2a0008"
                stroke="rgba(220,20,60,0.4)"
                strokeWidth="1"
              />
              {/* Wax seal */}
              <circle cx="200" cy="90" r="30" fill="#DC143C" opacity="0.9" />
              <text x="200" y="98" textAnchor="middle" fontSize="22" fill="white">❤</text>
            </svg>
          </motion.div>

          {/* Envelope content area */}
          <div className="pt-40 pb-8 px-8">
            <AnimatePresence>
              {!opened && (
                <motion.div
                  className="text-center py-6"
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="text-[#ffb6c1] text-sm mb-2">Sentuh untuk membuka</p>
                  <span className="text-3xl">💌</span>
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {showLetter && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <pre
                    className="text-white/90 text-sm sm:text-base leading-relaxed whitespace-pre-wrap font-serif cursor-blink"
                    style={{ fontFamily: 'Georgia, serif' }}
                  >
                    {typedText}
                  </pre>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Bottom envelope design */}
          <svg viewBox="0 0 400 60" className="w-full" preserveAspectRatio="none">
            <polygon points="0,60 200,0 400,60" fill="#1a0005" stroke="rgba(220,20,60,0.3)" strokeWidth="1" />
          </svg>
        </div>

        {!opened && (
          <motion.p
            className="text-center text-white/40 text-xs mt-4"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            ✦ Klik untuk membuka suratmu ✦
          </motion.p>
        )}
      </motion.div>
    </section>
  )
}
