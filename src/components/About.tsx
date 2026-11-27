import { motion } from 'motion/react'
import { Download } from 'lucide-react'
import { aboutFacts } from '../data/skills'
import { profile } from '../data/profile'
import { SectionHeading } from './SectionHeading'

const paragraphs = [
  "I'm a Software Engineer with a background in Information Technology and experience building backend applications and intelligent software systems.",
  'My engineering interests have evolved from traditional backend development into Generative AI and Agentic AI.',
  'I enjoy understanding how complex systems work, experimenting with emerging technologies, and turning technical concepts into practical solutions.',
  'I believe the future of software engineering lies in combining reliable software architecture with intelligent systems.',
]

export function About() {
  return (
    <section id="about" className="bg-surface/40 py-24 sm:py-32">
      <div className="container-x grid gap-14 lg:grid-cols-[1.2fr_1fr]">
        <div>
          <SectionHeading eyebrow="About" title="A little about the engineer." />
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-10 max-w-2xl space-y-5 text-lg leading-relaxed text-muted"
          >
            {paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
            <a href={profile.resumeUrl} download className="btn-primary mt-4">
              <Download size={18} /> Download Resume
            </a>
          </motion.div>
        </div>

        <motion.dl
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="card space-y-8 self-start p-8"
        >
          <div>
            <dt className="font-mono text-xs uppercase tracking-[0.2em] text-accent">Experience</dt>
            <dd className="mt-3 text-white/90">{aboutFacts.experience}</dd>
          </div>
          <div>
            <dt className="font-mono text-xs uppercase tracking-[0.2em] text-accent">Primary technologies</dt>
            <dd className="mt-3 flex flex-wrap gap-2">
              {aboutFacts.technologies.map((t) => (
                <span key={t} className="tag">
                  {t}
                </span>
              ))}
            </dd>
          </div>
          <div>
            <dt className="font-mono text-xs uppercase tracking-[0.2em] text-accent">Engineering interests</dt>
            <dd className="mt-3 flex flex-wrap gap-2">
              {aboutFacts.interests.map((t) => (
                <span key={t} className="tag">
                  {t}
                </span>
              ))}
            </dd>
          </div>
        </motion.dl>
      </div>
    </section>
  )
}
