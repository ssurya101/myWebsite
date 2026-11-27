import { profile } from '../data/profile'

const links = [
  { label: 'GitHub', href: profile.github },
  { label: 'LinkedIn', href: profile.linkedin },
  { label: 'Medium', href: profile.medium },
  { label: 'Email', href: `mailto:${profile.email}` },
]

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="container-x flex flex-col items-start justify-between gap-4 py-8 text-sm text-muted sm:flex-row sm:items-center">
        <p>
          © {new Date().getFullYear()} {profile.name}. Built with curiosity. Engineered with purpose.
        </p>
        <ul className="flex gap-5">
          {links.map((l) => (
            <li key={l.label}>
              <a
                href={l.href}
                {...(l.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className="inline-flex min-h-11 items-center transition-colors hover:text-white"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  )
}
