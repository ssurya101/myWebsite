import { motion, type Variants } from 'motion/react'
import { FlaskConical } from 'lucide-react'
import { exploring } from '../data/skills'
import { SectionHeading } from './SectionHeading'

const grid: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.06 } } }
const item: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.97 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5 } },
}

export function Exploring() {
  return (
    <section id="exploring" className="py-24 sm:py-32">
      <div className="container-x">
        <SectionHeading
          eyebrow="Currently Exploring"
          title="Always exploring what's next."
          description={
            <>
              <FlaskConical size={16} className="mr-2 inline -translate-y-0.5 text-accent" />
              These are learning and experimentation areas, not claims of production experience.
            </>
          }
        />

        <motion.ul
          variants={grid}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {exploring.map((e) => (
            <motion.li
              key={e.title}
              variants={item}
              whileHover={{ y: -4 }}
              className="card border-dashed p-6 transition-colors hover:border-accent/40"
            >
              <p className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-accent-2">Exploring</p>
              <h3 className="mt-3 font-display text-lg font-semibold leading-snug">{e.title}</h3>
              <p className="mt-2 text-sm text-muted">{e.note}</p>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  )
}
