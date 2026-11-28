import { profile } from '../data/profile'

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="container-x flex justify-center py-8 text-center text-sm text-muted">
        <p>
          © {new Date().getFullYear()} {profile.name}. Built with curiosity. Engineered with purpose.
        </p>
      </div>
    </footer>
  )
}
