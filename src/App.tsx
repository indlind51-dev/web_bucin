import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import IntroScreen from './components/IntroScreen'
import HeroSection from './components/HeroSection'
import LoveLetter from './components/LoveLetter'
import FloatingHearts from './components/FloatingHearts'
import MemoriesSection from './components/MemoriesSection'
import OurStory from './components/OurStory'
import MusicPlayer from './components/MusicPlayer'
import SecretSurprise from './components/SecretSurprise'
import FinalSection from './components/FinalSection'

function NavDot({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      className="w-2 h-2 rounded-full bg-white/20 hover:bg-[#DC143C] transition-colors duration-300"
      title={label}
    />
  )
}

export default function App() {
  const [entered, setEntered] = useState(false)

  return (
    <div className="relative min-h-screen bg-[#080808]">
      {/* Floating hearts background — always present after enter */}
      {entered && <FloatingHearts />}

      {/* Intro overlay */}
      <AnimatePresence>
        {!entered && (
          <IntroScreen onEnter={() => setEntered(true)} />
        )}
      </AnimatePresence>

      {/* Main content */}
      <AnimatePresence>
        {entered && (
          <motion.main
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.3 }}
          >
            {/* Side nav dots (desktop) */}
            <nav className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-3">
              <NavDot href="#hero" label="Hero" />
              <NavDot href="#letter" label="Surat" />
              <NavDot href="#memories" label="Kenangan" />
              <NavDot href="#story" label="Kisah" />
              <NavDot href="#music" label="Musik" />
              <NavDot href="#surprise" label="Kejutan" />
              <NavDot href="#final" label="Penutup" />
            </nav>

            <HeroSection />
            <LoveLetter />
            <MemoriesSection />
            <OurStory />
            <MusicPlayer />
            <SecretSurprise />
            <FinalSection />
          </motion.main>
        )}
      </AnimatePresence>
    </div>
  )
}
