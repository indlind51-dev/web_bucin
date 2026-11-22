import { motion } from 'framer-motion'

interface Memory {
  id: number
  caption: string
  subcaption: string
  emoji: string
  color: string
}

const MEMORIES: Memory[] = [
  { id: 1, caption: 'Hari Pertama Kita', subcaption: 'Hari itu aku tahu, kamu yang spesial.', emoji: '🌹', color: '#DC143C' },
  { id: 2, caption: 'Jalan Sore Bersama', subcaption: 'Langkah kaki yang terasa ringan bersamamu.', emoji: '🌅', color: '#ff6b8a' },
  { id: 3, caption: 'Makan Malam Istimewa', subcaption: 'Makanan terasa lebih enak saat bersamamu.', emoji: '🕯️', color: '#ff9eb5' },
  { id: 4, caption: 'Ketawa Bareng', subcaption: 'Tawa yang aku rindukan setiap hari.', emoji: '😂', color: '#DC143C' },
  { id: 5, caption: 'Hujan Pertama', subcaption: 'Basah-basahan tapi tetap bahagia.', emoji: '🌧️', color: '#ff6b8a' },
  { id: 6, caption: 'Mimpi Bersama', subcaption: 'Masa depan yang ingin aku bangun denganmu.', emoji: '⭐', color: '#ff9eb5' },
]

function MemoryCard({ memory, index }: { memory: Memory; index: number }) {
  return (
    <motion.div
      className="relative rounded-2xl overflow-hidden cursor-pointer group"
      style={{
        background: `linear-gradient(145deg, rgba(220,20,60,0.08), rgba(8,8,8,0.9))`,
        border: '1px solid rgba(220, 20, 60, 0.2)',
      }}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.7, delay: index * 0.1 }}
      whileHover={{ scale: 1.03, borderColor: 'rgba(220,20,60,0.6)' }}
    >
      {/* Photo placeholder */}
      <div
        className="w-full aspect-square flex items-center justify-center relative overflow-hidden"
        style={{
          background: `radial-gradient(ellipse at center, ${memory.color}22, #080808)`,
        }}
      >
        {/* Gradient overlay */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ background: `radial-gradient(ellipse at center, ${memory.color}33, transparent)` }}
        />

        {/* Emoji placeholder */}
        <motion.span
          className="text-6xl sm:text-7xl relative z-10"
          whileHover={{ scale: 1.2, rotate: [0, -5, 5, 0] }}
          transition={{ duration: 0.4 }}
        >
          {memory.emoji}
        </motion.span>

        {/* Corner accent */}
        <div
          className="absolute top-3 right-3 w-6 h-6 rounded-full"
          style={{ background: memory.color, boxShadow: `0 0 10px ${memory.color}` }}
        />

        {/* Replace hint */}
        <div className="absolute bottom-2 left-0 right-0 text-center">
          <span className="text-white/20 text-xs">[ Ganti dengan fotomu ]</span>
        </div>
      </div>

      {/* Caption */}
      <div className="p-4">
        <h3 className="text-white font-semibold text-base" style={{ fontFamily: 'Georgia, serif' }}>
          {memory.caption}
        </h3>
        <p className="text-white/50 text-sm mt-1 italic">{memory.subcaption}</p>
      </div>

      {/* Hover glow */}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ boxShadow: `inset 0 0 30px ${memory.color}22` }}
      />
    </motion.div>
  )
}

export default function MemoriesSection() {
  return (
    <section
      id="memories"
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
        <p className="text-[#DC143C] text-sm tracking-[0.3em] uppercase mb-3">Galeri Kenangan</p>
        <h2 className="text-4xl sm:text-5xl font-bold text-white glow-pink" style={{ fontFamily: 'Georgia, serif' }}>
          Momen Kita Bersama
        </h2>
        <p className="text-white/40 text-sm mt-4 italic">Setiap foto menyimpan seribu perasaan.</p>
      </motion.div>

      <div className="max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6">
        {MEMORIES.map((memory, i) => (
          <MemoryCard key={memory.id} memory={memory} index={i} />
        ))}
      </div>
    </section>
  )
}
