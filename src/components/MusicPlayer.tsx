import { motion, AnimatePresence } from 'framer-motion'
import { useState, useRef, useEffect } from 'react'
import { Play, Pause, Music } from 'lucide-react'

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

const BAR_COUNT = 20

export default function MusicPlayer() {
  const [playing, setPlaying] = useState(false)
  const [bars] = useState(() => Array.from({ length: BAR_COUNT }, (_, i) => i))
  const reduced = useReducedMotion()
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [hasAudio, setHasAudio] = useState(false)

  useEffect(() => {
    // Check if audio file exists
    const audio = new Audio('/music/song.mp3')
    audio.addEventListener('canplaythrough', () => {
      setHasAudio(true)
      audioRef.current = audio
    })
    audio.addEventListener('error', () => {
      setHasAudio(false)
    })
    audio.load()
    return () => {
      audio.pause()
    }
  }, [])

  function toggle() {
    if (!hasAudio) {
      setPlaying((p) => !p) // visual only
      return
    }
    if (playing) {
      audioRef.current?.pause()
    } else {
      audioRef.current?.play().catch(() => {})
    }
    setPlaying((p) => !p)
  }

  return (
    <section
      id="music"
      className="relative py-24 px-6"
      style={{ background: 'linear-gradient(to bottom, #080808, #0a0003, #080808)' }}
    >
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        <p className="text-[#DC143C] text-sm tracking-[0.3em] uppercase mb-3">Lagu Kita</p>
        <h2 className="text-4xl sm:text-5xl font-bold text-white glow-pink" style={{ fontFamily: 'Georgia, serif' }}>
          Musik untuk Hatimu
        </h2>
      </motion.div>

      <motion.div
        className="max-w-sm mx-auto glass-red rounded-3xl p-8 flex flex-col items-center gap-8"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        style={{ boxShadow: '0 0 60px rgba(220,20,60,0.2)' }}
      >
        {/* Album art placeholder */}
        <motion.div
          className="w-32 h-32 rounded-full flex items-center justify-center relative"
          style={{
            background: 'linear-gradient(135deg, #DC143C, #8B0000)',
            boxShadow: '0 0 30px rgba(220, 20, 60, 0.5)',
          }}
          animate={playing && !reduced ? { rotate: 360 } : { rotate: 0 }}
          transition={playing ? { duration: 8, repeat: Infinity, ease: 'linear' } : { duration: 0.5 }}
        >
          <Music className="w-12 h-12 text-white/80" />
          {/* Vinyl ring */}
          <div className="absolute inset-4 rounded-full border-2 border-white/10" />
          <div className="absolute inset-0 m-auto w-4 h-4 rounded-full bg-white/20" />
        </motion.div>

        {/* Song info */}
        <div className="text-center">
          <p className="text-white font-semibold text-lg" style={{ fontFamily: 'Georgia, serif' }}>
            Lagu Spesial Kita
          </p>
          <p className="text-white/40 text-sm mt-1">
            {hasAudio ? 'song.mp3' : 'Tambahkan lagu di /public/music/song.mp3'}
          </p>
        </div>

        {/* Visualizer bars */}
        <div className="flex items-end gap-1 h-12">
          {bars.map((i) => (
            <motion.div
              key={i}
              className="w-2 rounded-full"
              style={{ background: 'linear-gradient(to top, #DC143C, #ff6b8a)' }}
              animate={
                playing && !reduced
                  ? {
                      height: [
                        Math.random() * 24 + 8,
                        Math.random() * 40 + 10,
                        Math.random() * 20 + 6,
                        Math.random() * 48 + 8,
                      ],
                    }
                  : { height: 4 }
              }
              transition={
                playing
                  ? {
                      duration: 0.5 + Math.random() * 0.5,
                      repeat: Infinity,
                      ease: 'easeInOut',
                      delay: (i / BAR_COUNT) * 0.3,
                    }
                  : { duration: 0.3 }
              }
            />
          ))}
        </div>

        {/* Play button */}
        <motion.button
          onClick={toggle}
          className="w-16 h-16 rounded-full flex items-center justify-center cursor-pointer"
          style={{
            background: 'linear-gradient(135deg, #DC143C, #8B0000)',
            boxShadow: '0 0 30px rgba(220, 20, 60, 0.6)',
          }}
          whileHover={{ scale: 1.1, boxShadow: '0 0 50px rgba(220, 20, 60, 0.9)' }}
          whileTap={{ scale: 0.9 }}
        >
          <AnimatePresence mode="wait">
            {playing ? (
              <motion.div key="pause" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                <Pause className="w-6 h-6 text-white" />
              </motion.div>
            ) : (
              <motion.div key="play" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                <Play className="w-6 h-6 text-white ml-1" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>

        {!hasAudio && (
          <p className="text-white/25 text-xs text-center italic">
            Taruh file MP3 di <code className="text-[#DC143C]">public/music/song.mp3</code> untuk memutar musik
          </p>
        )}
      </motion.div>
    </section>
  )
}
