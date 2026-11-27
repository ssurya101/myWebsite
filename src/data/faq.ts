export interface FaqItem {
  q: string
  a: string
}

export const faq: FaqItem[] = [
  {
    q: 'What areas of software engineering do you specialize in?',
    a: 'Backend engineering, generative AI and LLM engineering, agentic AI systems, RAG, cloud deployment and observability for distributed applications.',
  },
  {
    q: 'What kind of AI systems do you work on?',
    a: 'Multi-agent architectures with router, planner and worker agents, tool-driven workflows over MCP, agent memory, RAG pipelines and enterprise AI observability. Some are implemented components; others are POCs or explorations, labelled as such on this site.',
  },
  {
    q: 'Which programming languages do you primarily use?',
    a: 'Python and Java day to day, with SQL for data work. I also have working knowledge of JavaScript and C++.',
  },
  {
    q: 'What frameworks do you use for agentic AI?',
    a: 'LangGraph, LangChain, Microsoft Foundry, CrewAI, Mem0 and MCP / FastMCP, plus Spring AI on the Java side.',
  },
  {
    q: 'Where can I read your technical articles?',
    a: 'On Medium. See the Writing section above or use the Read More on Medium button.',
  },
  {
    q: 'How can I get in touch?',
    a: 'Email or LinkedIn works best. Both are linked in the Contact section below.',
  },
]
