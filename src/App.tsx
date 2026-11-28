import { MotionConfig } from 'motion/react'
import { About } from './components/About'
import { Contact } from './components/Contact'
import { Exploring } from './components/Exploring'
import { Expertise } from './components/Expertise'
import { Footer } from './components/Footer'
import { Hero } from './components/Hero'
import { Navbar } from './components/Navbar'
import { Process } from './components/Process'
import { Projects } from './components/Projects'
import { Stats } from './components/Stats'
import { Writing } from './components/Writing'

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <a
        href="#expertise"
        className="sr-only z-[60] rounded-full bg-white px-4 py-2 text-black focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to content
      </a>
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <Expertise />
        <Projects />
        <Process />
        <Writing />
        <Exploring />
        <About />
        <Contact />
      </main>
      <Footer />
    </MotionConfig>
  )
}
