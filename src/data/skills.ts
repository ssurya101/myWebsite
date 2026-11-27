export type SkillIcon =
  | 'server'
  | 'brain'
  | 'network'
  | 'search'
  | 'cloud'
  | 'activity'

export interface SkillGroup {
  id: string
  icon: SkillIcon
  title: string
  description: string
  tags: string[]
}

export const skills: SkillGroup[] = [
  {
    id: 'backend',
    icon: 'server',
    title: 'Backend Engineering',
    description: 'Reliable, well-tested services and integrations built for scale and maintainability.',
    tags: ['Python', 'Java', 'Spring Boot', 'REST APIs', 'Microservices', 'Distributed Systems'],
  },
  {
    id: 'genai',
    icon: 'brain',
    title: 'Generative AI & LLM Engineering',
    description: 'Practical LLM applications with careful prompting, context design and cost awareness.',
    tags: ['LLM Integration', 'Prompt Engineering', 'Context Engineering', 'Embeddings', 'LLM Optimization'],
  },
  {
    id: 'agentic',
    icon: 'network',
    title: 'Agentic AI Systems',
    description: 'Router, planner and worker agents coordinated through tools, memory and shared context.',
    tags: ['Microsoft AI Foundry', 'LangGraph', 'LangChain', 'Multi-Agent Orchestration', 'MCP / FastMCP', 'Mem0'],
  },
  {
    id: 'rag',
    icon: 'search',
    title: 'RAG & Knowledge Systems',
    description: 'Retrieval pipelines that ground model answers in the right knowledge.',
    tags: ['Naive RAG', 'Advanced RAG', 'Hybrid Search', 'Agentic RAG', 'Graph RAG', 'Vector Databases'],
  },
  {
    id: 'cloud',
    icon: 'cloud',
    title: 'Cloud & DevOps',
    description: 'Containerized deployments and automated pipelines on Azure.',
    tags: ['Azure', 'Docker', 'Kubernetes', 'AKS', 'GitHub Actions', 'Jenkins'],
  },
  {
    id: 'observability',
    icon: 'activity',
    title: 'Observability & Infrastructure',
    description: 'End-to-end visibility across services, agents and tool calls.',
    tags: ['OpenTelemetry', 'Datadog', 'Grafana', 'Loki', 'Tempo', 'Distributed Tracing'],
  },
]

export const stats = [
  { id: 'exp', value: 3, suffix: '+', label: 'Years of Software Engineering Experience' },
  { id: 'be', text: 'Backend & AI', label: 'Engineering' },
  { id: 'ent', text: 'Enterprise', label: 'AI Architecture' },
  { id: 'explore', text: 'Continuous', label: 'Technical Exploration' },
] as const

export const processSteps = [
  { n: '01', title: 'Understand', text: 'Understand the actual problem, requirements, constraints, and expected outcome.' },
  { n: '02', title: 'Architect', text: 'Design the system architecture, identify components, evaluate technologies, and define communication patterns.' },
  { n: '03', title: 'Engineer', text: 'Build modular, maintainable, scalable backend and AI components.' },
  { n: '04', title: 'Integrate', text: 'Connect agents, tools, databases, APIs, cloud services, and infrastructure.' },
  { n: '05', title: 'Observe & Improve', text: 'Monitor execution, evaluate performance, optimize costs, and improve system reliability.' },
]

export const exploring = [
  { title: 'Advanced Agentic Architectures', note: 'Event-driven agents, resource discovery (ARD), UTCP' },
  { title: 'Context Engineering', note: 'Progressive tool disclosure, context budgets' },
  { title: 'Multi-Agent Coordination', note: 'Task leasing, handoffs, shared memory' },
  { title: 'Agent Memory Systems', note: 'Episodic, semantic and procedural memory' },
  { title: 'AI-powered Code Intelligence', note: 'AST analysis, codebase understanding' },
  { title: 'Graph-based Knowledge Systems', note: 'Graph RAG, Neo4j, Open Knowledge Format' },
  { title: 'LLM Evaluation', note: 'Model evaluation and optimization' },
  { title: 'Model Fine-tuning', note: 'Fine-tuning and LoRA' },
]

export const aboutFacts = {
  experience: 'Software Engineer at NIQ, Chennai · 3+ years',
  technologies: ['Python', 'Java', 'Spring Boot', 'LangGraph', 'MCP', 'Azure', 'PostgreSQL'],
  interests: ['Agentic architectures', 'Context engineering', 'Agent memory', 'Observability'],
}
