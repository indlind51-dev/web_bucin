import { motion } from 'framer-motion'

interface Milestone {
  date: string
  title: string
  description: string
  emoji: string
}

const MILESTONES: Milestone[] = [
  {
    date: 'Suatu Hari di Tahun Lalu',
    title: 'Pertama Kali Bertemu',
    description: 'Aku tidak pernah menyangka bahwa hari itu akan mengubah segalanya. Kamu datang, dan duniaku berubah selamanya.',
    emoji: '👀',
  },
  {
    date: 'Beberapa Minggu Kemudian',
    title: 'Pesan Pertama',
    description: 'Jantungku berdegup kencang setiap kali ada notif darimu. Aku selalu senyum-senyum sendiri baca pesanmu.',
    emoji: '💬',
  },
  {
    date: 'Momen yang Tak Terlupakan',
    title: 'Kencan Pertama',
    description: 'Waktu terasa berlalu terlalu cepat. Aku tidak ingin momen itu berakhir — aku hanya ingin terus di sisimu.',
    emoji: '☕',
  },
  {
    date: 'Hari yang Spesial',
    title: 'Resmi Jadi Milikku',
    description: 'Kamu bilang "iya" dan hatiku meledak penuh kebahagiaan. Hari itu adalah salah satu hari terbaik hidupku.',
    emoji: '💑',
  },
  {
    date: 'Setiap Hari Bersamamu',
    title: 'Tumbuh Bersama',
    description: 'Setiap hari bersamamu adalah petualangan baru. Kamu mengajarkan aku tentang cinta, kesabaran, dan kebaikan.',
    emoji: '🌱',
  },
  {
    date: 'Sekarang & Selamanya',
    title: 'Hari Ini dan Seterusnya',
    description: 'Aku tidak tahu apa yang ada di depan, tapi aku tahu satu hal — aku ingin menjalaninya bersamamu.',
    emoji: '∞',
  },
]

export default function OurStory() {
  return (
    <section
      id="story"
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
        <p className="text-[#DC143C] text-sm tracking-[0.3em] uppercase mb-3">Perjalanan Kita</p>
        <h2 className="text-4xl sm:text-5xl font-bold text-white glow-pink" style={{ fontFamily: 'Georgia, serif' }}>
          Kisah Kita
        </h2>
        <p className="text-white/40 text-sm mt-4 italic">Setiap babak lebih indah dari sebelumnya.</p>
      </motion.div>

      <div className="max-w-2xl mx-auto relative">
        {/* Vertical line */}
        <div
          className="absolute left-6 sm:left-1/2 top-0 bottom-0 w-px"
          style={{ background: 'linear-gradient(to bottom, transparent, #DC143C, #DC143C, transparent)' }}
        />

        {MILESTONES.map((m, i) => {
          const isLeft = i % 2 === 0
          return (
            <motion.div
              key={i}
              className={`relative flex items-start gap-6 mb-16 ${
                isLeft ? 'sm:flex-row' : 'sm:flex-row-reverse'
              } flex-row`}
              initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              {/* Timeline dot */}
              <div
                className="relative z-10 flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-xl"
                style={{
                  background: 'linear-gradient(135deg, #DC143C, #8B0000)',
                  boxShadow: '0 0 20px rgba(220, 20, 60, 0.6)',
                  marginLeft: '-0.25rem',
                }}
              >
                {m.emoji}
              </div>

              {/* Content card */}
              <motion.div
                className="flex-1 glass-red rounded-2xl p-5 sm:p-6"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <p className="text-[#DC143C] text-xs tracking-widest uppercase mb-1">{m.date}</p>
                <h3 className="text-white text-lg sm:text-xl font-semibold mb-2" style={{ fontFamily: 'Georgia, serif' }}>
                  {m.title}
                </h3>
                <p className="text-white/60 text-sm leading-relaxed italic">{m.description}</p>
              </motion.div>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
