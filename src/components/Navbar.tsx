import { AnimatePresence, motion } from 'motion/react'
import { Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { profile } from '../data/profile'
import { useActiveSection } from '../hooks/useActiveSection'

const links = [
  { id: 'about', label: 'About' },
  { id: 'expertise', label: 'Expertise' },
  { id: 'projects', label: 'Projects' },
  { id: 'writing', label: 'Writing' },
  { id: 'contact', label: 'Contact' },
] as const

const sectionIds = ['home', ...links.map((l) => l.id)] as const

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const active = useActiveSection(sectionIds)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled || open
          ? 'border-b border-line bg-ink/75 backdrop-blur-xl'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <nav className="container-x flex h-16 items-center justify-between" aria-label="Primary">
        <a href="#home" className="font-display text-xl font-bold tracking-tight">
          {profile.name}
          <span className="gradient-text">.</span>
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <li key={l.id}>
              <a
                href={`#${l.id}`}
                aria-current={active === l.id ? 'true' : undefined}
                className={`relative rounded-full px-4 py-2 text-sm transition-colors ${
                  active === l.id ? 'text-white' : 'text-muted hover:text-white'
                }`}
              >
                {active === l.id && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 -z-10 rounded-full bg-white/10"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  />
                )}
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <a href="#contact" className="btn-primary hidden !px-5 !py-2 text-sm sm:inline-flex">
            Let's Connect
          </a>
          <button
            type="button"
            className="inline-flex size-11 items-center justify-center rounded-full border border-line md:hidden"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="container-x pb-6 md:hidden"
          >
            <ul className="flex flex-col gap-1">
              {links.map((l) => (
                <li key={l.id}>
                  <a
                    href={`#${l.id}`}
                    onClick={() => setOpen(false)}
                    className={`block rounded-xl px-4 py-3 text-lg ${
                      active === l.id ? 'bg-white/10 text-white' : 'text-muted'
                    }`}
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
            <a href="#contact" onClick={() => setOpen(false)} className="btn-primary mt-4 w-full">
              Let's Connect
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
