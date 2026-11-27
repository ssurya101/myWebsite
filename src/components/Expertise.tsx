import { motion, type Variants } from 'motion/react'
import { Activity, Brain, Cloud, Network, Search, Server, type LucideIcon } from 'lucide-react'
import { skills, type SkillIcon } from '../data/skills'
import { SectionHeading } from './SectionHeading'

const icons: Record<SkillIcon, LucideIcon> = {
  server: Server,
  brain: Brain,
  network: Network,
  search: Search,
  cloud: Cloud,
  activity: Activity,
}

const grid: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.09 } } }
const card: Variants = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

export function Expertise() {
  return (
    <section id="expertise" className="py-24 sm:py-32">
      <div className="container-x">
        <SectionHeading
          eyebrow="Technical Expertise"
          title="Where engineering meets intelligence."
          description="From building reliable backend systems to orchestrating intelligent AI workflows, I enjoy engineering solutions across the complete technology stack."
        />

        <motion.ul
          variants={grid}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          className="mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-3"
        >
          {skills.map((s) => {
            const Icon = icons[s.icon]
            return (
              <motion.li
                key={s.id}
                variants={card}
                whileHover={{ y: -6 }}
                transition={{ type: 'spring', stiffness: 300, damping: 24 }}
                className="card group flex flex-col p-7 transition-colors hover:border-accent/40"
              >
                <span className="mb-6 inline-flex size-12 items-center justify-center rounded-2xl bg-gradient-to-br from-accent/20 to-accent-2/20 text-accent transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110">
                  <Icon size={22} />
                </span>
                <h3 className="font-display text-xl font-semibold tracking-tight">{s.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{s.description}</p>
                <ul className="mt-6 flex flex-wrap gap-2">
                  {s.tags.map((t) => (
                    <li key={t} className="tag">
                      {t}
                    </li>
                  ))}
                </ul>
              </motion.li>
            )
          })}
        </motion.ul>
      </div>
    </section>
  )
}
