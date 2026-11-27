// Single source of truth for personal details. Replace placeholders before publishing.
export const profile = {
  name: 'Surya Sethuramasamy',
  siteTitle: 'Surya Sethuramasamy | Software Engineer · Agentic AI & Backend Systems',
  siteUrl: 'https://surya-sethuramasamy.com',
  title: 'Software Engineer',
  eyebrow: 'SOFTWARE ENGINEER · AGENTIC AI · BACKEND SYSTEMS',
  headline: 'Engineering Intelligent Systems.',
  subheadline: 'Building beyond the prompt.',
  intro:
    "I'm a Software Engineer working at the intersection of backend engineering and artificial intelligence. I build scalable software systems, intelligent AI applications, and multi-agent architectures that solve real engineering problems.",
  metaDescription:
    'Software Engineer specializing in backend engineering, generative AI, agentic AI, LLM systems and distributed architectures.',
  highlights: ['Python', 'Java', 'LLMs', 'Agentic AI', 'Azure', 'Distributed Systems'],
  company: 'NIQ, Chennai',
  role: 'Software Engineer',
  experienceYears: 3,
  email: 'suryasm0602@gmail.com',
  github: 'https://github.com/ssurya101',
  linkedin: 'https://www.linkedin.com/in/surya-sethuramasamy/',
  medium: 'https://medium.com/@suryasm0602',
  // `BASE_URL` is `/myWebsite/` on GitHub Pages and `/` during local development.
  resumeUrl: `${import.meta.env.BASE_URL}resume/surya-resume.pdf`,
} as const

export type Profile = typeof profile
