import { motion, type Variants } from 'motion/react'
import { ArrowDown, ArrowRight, Github, Linkedin, Mail, PenLine } from 'lucide-react'
import { profile } from '../data/profile'

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
}
const item: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
}

const socials = [
  { label: 'GitHub', href: profile.github, Icon: Github },
  { label: 'LinkedIn', href: profile.linkedin, Icon: Linkedin },
  { label: 'Medium', href: profile.medium, Icon: PenLine },
  { label: 'Email', href: `mailto:${profile.email}`, Icon: Mail },
]

const floating = [
  { text: 'MCP', cls: 'left-[6%] top-[28%]', delay: 0 },
  { text: 'LangGraph', cls: 'right-[8%] top-[24%]', delay: 0.4 },
  { text: 'OpenTelemetry', cls: 'right-[12%] bottom-[26%]', delay: 0.8 },
  { text: 'pgvector', cls: 'left-[10%] bottom-[24%]', delay: 1.2 },
]

export function Hero() {
  return (
    <section id="home" className="relative flex min-h-screen items-center overflow-hidden pb-24 pt-32">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="orb-a absolute -left-[10%] top-[5%] size-[40rem] rounded-full bg-accent/20 blur-[140px]" />
        <div className="orb-b absolute -right-[10%] top-[30%] size-[36rem] rounded-full bg-accent-2/20 blur-[140px]" />
        <div
          className="absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage:
              'linear-gradient(rgb(255 255 255 / 0.04) 1px, transparent 1px), linear-gradient(90deg, rgb(255 255 255 / 0.04) 1px, transparent 1px)',
            backgroundSize: '64px 64px',
            maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 75%)',
            WebkitMaskImage: 'radial-gradient(ellipse at center, black 30%, transparent 75%)',
          }}
        />
      </div>

      {floating.map((f) => (
        <motion.span
          key={f.text}
          aria-hidden
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, -8, 0] }}
          transition={{
            opacity: { delay: 1 + f.delay, duration: 0.8 },
            y: { delay: 1 + f.delay, duration: 6, repeat: Infinity, ease: 'easeInOut' },
          }}
          className={`absolute hidden rounded-full border border-line bg-white/[0.03] px-3 py-1 font-mono text-xs text-muted lg:block ${f.cls}`}
        >
          {f.text}
        </motion.span>
      ))}

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="container-x"
      >
        <motion.p
          variants={item}
          className="mb-6 font-mono text-[0.7rem] uppercase tracking-[0.18em] text-accent sm:text-xs sm:tracking-[0.22em]"
        >
          {profile.eyebrow}
        </motion.p>

        <motion.h1
          variants={item}
          className="max-w-5xl font-display text-[2.75rem] font-bold leading-[0.98] tracking-tight sm:text-7xl lg:text-8xl"
        >
          Engineering <span className="gradient-text">Intelligent</span> Systems.
        </motion.h1>

        <motion.p
          variants={item}
          className="mt-5 font-display text-2xl text-white/60 sm:text-3xl"
        >
          {profile.subheadline}
        </motion.p>

        <motion.p variants={item} className="mt-8 max-w-2xl text-lg leading-relaxed text-muted">
          {profile.intro}
        </motion.p>

        <motion.ul variants={item} className="mt-8 flex flex-wrap gap-2" aria-label="Core technologies">
          {profile.highlights.map((h) => (
            <li key={h} className="tag">
              {h}
            </li>
          ))}
        </motion.ul>

        <motion.div variants={item} className="mt-10 flex flex-wrap gap-3">
          <a href="#projects" className="btn-primary">
            Explore My Work <ArrowRight size={18} />
          </a>
          <a href="#contact" className="btn-ghost">
            Let's Connect
          </a>
        </motion.div>

        <motion.ul variants={item} className="mt-10 flex gap-3">
          {socials.map(({ label, href, Icon }) => (
            <li key={label}>
              <a
                href={href}
                aria-label={label}
                {...(href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className="inline-flex size-11 items-center justify-center rounded-full border border-line text-muted transition-colors hover:border-white/30 hover:text-white"
              >
                <Icon size={18} />
              </a>
            </li>
          ))}
        </motion.ul>
      </motion.div>

      <motion.a
        href="#stats"
        aria-label="Scroll to content"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-xs text-muted sm:flex"
      >
        Scroll
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown size={16} />
        </motion.span>
      </motion.a>
    </section>
  )
}
