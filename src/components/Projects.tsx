import { AnimatePresence, motion } from 'motion/react'
import { ChevronDown, Github } from 'lucide-react'
import { useState } from 'react'
import { projects, type Project, type ProjectStatus } from '../data/projects'
import { Diagram } from './Diagram'
import { SectionHeading } from './SectionHeading'

const statusStyle: Record<ProjectStatus, string> = {
  Implemented: 'border-emerald-400/30 bg-emerald-400/10 text-emerald-300',
  POC: 'border-amber-400/30 bg-amber-400/10 text-amber-300',
  Exploration: 'border-violet-400/30 bg-violet-400/10 text-violet-300',
}

function ProjectCard({ p, index }: { p: Project; index: number }) {
  const [open, setOpen] = useState(false)
  const flip = index % 2 === 1

  return (
    <motion.article
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4 }}
      className="card group grid overflow-hidden transition-colors duration-300 hover:border-accent/40 lg:grid-cols-2"
    >
      <div
        className={`relative flex min-h-[15rem] items-center justify-center overflow-hidden border-b border-line bg-[radial-gradient(ellipse_at_center,rgb(91_124_255/0.12),transparent_70%)] p-6 lg:border-b-0 ${
          flip ? 'lg:order-2 lg:border-l' : 'lg:border-r'
        }`}
      >
        <span className="absolute left-5 top-5 font-mono text-xs text-muted">
          {String(index + 1).padStart(2, '0')}
        </span>
        <div className="w-full max-w-md transition-transform duration-500 group-hover:scale-[1.03]">
          <Diagram id={p.diagram} title={p.title} />
        </div>
      </div>

      <div className="flex flex-col p-7 sm:p-10">
        <div className="mb-5 flex flex-wrap items-center gap-3">
          <span className={`rounded-full border px-3 py-1 text-xs font-medium ${statusStyle[p.status]}`}>
            {p.status}
          </span>
          <span className="text-xs text-muted">{p.focus}</span>
        </div>

        <h3 className="font-display text-2xl font-bold leading-tight tracking-tight sm:text-3xl">{p.title}</h3>

        <p className="mt-4 leading-relaxed text-muted">
          <span className="font-medium text-white/80">Problem. </span>
          {p.problem}
        </p>

        <ul className="mt-6 flex flex-wrap gap-2" aria-label="Technology stack">
          {p.stack.map((t) => (
            <li key={t} className="tag">
              {t}
            </li>
          ))}
        </ul>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              id={`${p.id}-more`}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: 'easeInOut' }}
              className="overflow-hidden"
            >
              <p className="mt-6 leading-relaxed text-muted">
                <span className="font-medium text-white/80">Approach. </span>
                {p.approach}
              </p>
              <ul className="mt-4 space-y-2 text-sm text-muted">
                {p.highlights.map((h) => (
                  <li key={h} className="flex gap-2">
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-accent" />
                    {h}
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls={`${p.id}-more`}
            className="btn-ghost !min-h-11 !px-5 !py-2 text-sm"
          >
            {open ? 'Show Less' : 'Read More'}
            <ChevronDown size={16} className={`transition-transform ${open ? 'rotate-180' : ''}`} />
          </button>
          {p.github && (
            <a
              href={p.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center gap-2 text-sm text-muted transition-colors hover:text-white"
            >
              <Github size={16} /> Source
            </a>
          )}
        </div>
      </div>
    </motion.article>
  )
}

export function Projects() {
  return (
    <section id="projects" className="bg-surface/40 py-24 sm:py-32">
      <div className="container-x">
        <SectionHeading
          eyebrow="Featured Engineering Projects"
          title="From architecture to implementation."
          description="Each project is labelled by maturity: Implemented components, proof-of-concept builds, or architecture explorations."
        />
        <div className="mt-16 space-y-8">
          {projects.map((p, i) => (
            <ProjectCard key={p.id} p={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
