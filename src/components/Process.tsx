import { motion, useScroll, useSpring } from 'motion/react'
import { useRef } from 'react'
import { processSteps } from '../data/skills'
import { SectionHeading } from './SectionHeading'

export function Process() {
  const ref = useRef<HTMLOListElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 75%', 'end 60%'] })
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })

  return (
    <section id="process" className="py-24 sm:py-32">
      <div className="container-x">
        <SectionHeading eyebrow="Process" title="How I approach engineering." />

        <ol ref={ref} className="relative mt-16 max-w-4xl">
          <span aria-hidden className="absolute left-[1.35rem] top-2 bottom-2 w-px bg-line sm:left-[1.6rem]" />
          <motion.span
            aria-hidden
            style={{ scaleY, transformOrigin: 'top' }}
            className="absolute left-[1.35rem] top-2 bottom-2 w-px bg-gradient-to-b from-accent to-accent-2 sm:left-[1.6rem]"
          />
          {processSteps.map((s, i) => (
            <motion.li
              key={s.n}
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, delay: i * 0.05 }}
              className="relative flex gap-6 pb-14 last:pb-0 sm:gap-10"
            >
              <span className="relative z-10 flex size-11 shrink-0 items-center justify-center rounded-full border border-accent/50 bg-ink font-mono text-sm text-accent sm:size-[3.25rem]">
                {s.n}
              </span>
              <div className="pt-1">
                <h3 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">{s.title}</h3>
                <p className="mt-3 max-w-xl leading-relaxed text-muted">{s.text}</p>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  )
}
