import { motion } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'
import { useEffect, useState } from 'react'
import type { Article } from '../data/articles'
import { profile } from '../data/profile'
import { SectionHeading } from './SectionHeading'

const fmt = new Intl.DateTimeFormat('en', { year: 'numeric', month: 'short', day: 'numeric', timeZone: 'UTC' })

export function Writing() {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [feedError, setFeedError] = useState(false)

  useEffect(() => {
    let active = true

    async function loadArticles() {
      try {
        const response = await fetch(`${import.meta.env.BASE_URL}medium-feed.json`)
        if (!response.ok) {
          throw new Error(`Medium feed request failed with HTTP ${response.status}.`)
        }

        const feedArticles: Article[] = await response.json()
        if (active) setArticles(feedArticles)
      } catch (error) {
        console.error('Could not load Medium articles.', error)
        if (active) setFeedError(true)
      } finally {
        if (active) setLoading(false)
      }
    }

    void loadArticles()
    return () => {
      active = false
    }
  }, [])

  return (
    <section id="writing" className="bg-surface/40 py-24 sm:py-32">
      <div className="container-x">
        <SectionHeading
          eyebrow="Technical Writing"
          title="Thoughts, experiments & engineering insights."
          description="I enjoy learning in public, exploring emerging technologies, and documenting engineering lessons."
        />

        {loading && <p className="mt-16 text-sm text-muted">Loading articles from Medium...</p>}
        {feedError && (
          <p className="mt-16 text-sm text-muted" role="alert">
            Articles could not be loaded. Visit{' '}
            <a href={profile.medium} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
              Medium
            </a>
            .
          </p>
        )}
        {!loading && !feedError && articles.length === 0 && (
          <p className="mt-16 text-sm text-muted">No Medium articles found yet.</p>
        )}
        {articles.length > 0 && (
          <ul className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {articles.map((a, i) => (
              <motion.li
                key={a.url}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                whileHover={{ y: -6 }}
              >
                <a
                  href={a.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card group flex h-full flex-col overflow-hidden transition-colors hover:border-accent/40"
                >
                  <div className="aspect-[16/9] overflow-hidden border-b border-line bg-gradient-to-br from-accent/20 via-surface-2 to-accent-2/20">
                    {a.cover && (
                      <img
                        src={a.cover}
                        alt={`Cover image for ${a.title}`}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    )}
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <time dateTime={a.date} className="font-mono text-xs text-muted">
                      {fmt.format(new Date(a.date))}
                    </time>
                    <h3 className="mt-3 font-display text-xl font-semibold leading-snug tracking-tight">{a.title}</h3>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{a.description}</p>
                    <ul className="mt-5 flex flex-wrap gap-2">
                      {a.tags.map((t) => (
                        <li key={t} className="tag">
                          {t}
                        </li>
                      ))}
                    </ul>
                    <span className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-accent">
                      Read Article
                      <ArrowUpRight size={16} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </a>
              </motion.li>
            ))}
          </ul>
        )}

        <div className="mt-12">
          <a href={profile.medium} target="_blank" rel="noopener noreferrer" className="btn-ghost">
            Read More on Medium <ArrowUpRight size={18} />
          </a>
        </div>
      </div>
    </section>
  )
}
