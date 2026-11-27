import { motion } from 'motion/react'
import { Github, Linkedin, Mail, PenLine } from 'lucide-react'
import { profile } from '../data/profile'

const buttons = [
  { label: 'Email Me', href: `mailto:${profile.email}`, Icon: Mail, primary: true },
  { label: 'LinkedIn', href: profile.linkedin, Icon: Linkedin },
  { label: 'GitHub', href: profile.github, Icon: Github },
  { label: 'Medium', href: profile.medium, Icon: PenLine },
]

export function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden py-28 sm:py-40">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-2/3 bg-gradient-to-t from-accent/15 via-accent-2/5 to-transparent" />
      <div className="container-x">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
        >
          <p className="mb-5 font-mono text-xs uppercase tracking-[0.2em] text-accent">Contact</p>
          <h2 className="max-w-5xl font-display text-5xl font-bold leading-[1] tracking-tight sm:text-7xl lg:text-8xl">
            Have an interesting <span className="gradient-text">problem</span> to solve?
          </h2>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted">
            I'm always interested in connecting with engineers, exploring new technologies, and discussing ideas around
            AI and software architecture.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            {buttons.map(({ label, href, Icon, primary }) => (
              <motion.a
                key={label}
                href={href}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                {...(href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className={primary ? 'btn-primary' : 'btn-ghost'}
              >
                <Icon size={18} /> {label}
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
