import { AnimatePresence, motion } from 'motion/react'
import { Plus } from 'lucide-react'
import { useState } from 'react'
import { faq } from '../data/faq'
import { SectionHeading } from './SectionHeading'

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section id="faq" className="py-24 sm:py-32">
      <div className="container-x grid gap-14 lg:grid-cols-[1fr_1.4fr]">
        <SectionHeading eyebrow="FAQ" title="Frequently asked questions." />

        <ul className="divide-y divide-line border-y border-line">
          {faq.map((f, i) => {
            const isOpen = open === i
            return (
              <li key={f.q}>
                <h3>
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${i}`}
                    id={`faq-btn-${i}`}
                    className="flex min-h-14 w-full items-center justify-between gap-6 py-6 text-left font-display text-lg font-medium sm:text-xl"
                  >
                    {f.q}
                    <Plus
                      size={20}
                      className={`shrink-0 text-accent transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`}
                    />
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-panel-${i}`}
                      role="region"
                      aria-labelledby={`faq-btn-${i}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <p className="pb-6 leading-relaxed text-muted">{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
