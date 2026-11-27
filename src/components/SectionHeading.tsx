import { motion } from 'motion/react'
import type { ReactNode } from 'react'

interface Props {
  eyebrow?: string
  title: string
  description?: ReactNode
  align?: 'left' | 'center'
}

export function SectionHeading({ eyebrow, title, description, align = 'left' }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`max-w-3xl ${align === 'center' ? 'mx-auto text-center' : ''}`}
    >
      {eyebrow && (
        <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-accent">{eyebrow}</p>
      )}
      <h2 className="font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
        {title}
      </h2>
      {description && <p className="mt-6 text-lg leading-relaxed text-muted">{description}</p>}
    </motion.div>
  )
}
