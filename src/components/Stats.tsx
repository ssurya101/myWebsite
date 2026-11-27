import { animate, motion, useInView, useReducedMotion } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import { stats } from '../data/skills'
import { profile } from '../data/profile'

function CountUp({ to, suffix = '' }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })
  const reduce = useReducedMotion()
  const [val, setVal] = useState(reduce ? to : 0)

  useEffect(() => {
    if (!inView || reduce) return
    const controls = animate(0, to, { duration: 1.4, ease: 'easeOut', onUpdate: (v) => setVal(Math.round(v)) })
    return () => controls.stop()
  }, [inView, reduce, to])

  return (
    <span ref={ref}>
      {val}
      {suffix}
    </span>
  )
}

export function Stats() {
  return (
    <section id="stats" aria-label="Engineering highlights" className="border-y border-line">
      <div className="container-x grid grid-cols-2 gap-y-10 py-14 lg:grid-cols-4">
        {stats.map((s, i) => (
          <motion.div
            key={s.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            className={`px-2 lg:px-8 ${i > 0 ? 'lg:border-l lg:border-line' : ''}`}
          >
            <p className="font-display text-4xl font-bold tracking-tight sm:text-5xl">
              {'value' in s ? (
                <CountUp to={profile.experienceYears} suffix={s.suffix} />
              ) : (
                <span className="gradient-text text-[clamp(1.125rem,6vw,2.25rem)] sm:text-5xl">{s.text}</span>
              )}
            </p>
            <p className="mt-3 max-w-[16rem] text-sm leading-snug text-muted">{s.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
