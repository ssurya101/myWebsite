export type ProjectStatus = 'Implemented' | 'POC' | 'Exploration'

export type DiagramId =
  | 'superagent'
  | 'memory'
  | 'rag'
  | 'observability'
  | 'events'
  | 'ocr'

export interface Project {
  id: string
  title: string
  status: ProjectStatus
  focus: string
  problem: string
  approach: string
  highlights: string[]
  stack: string[]
  diagram: DiagramId
  github?: string // only set when a real repository exists
}

export const projects: Project[] = [
  {
    id: 'super-agent',
    title: 'Enterprise Super Agent Architecture',
    status: 'POC',
    focus: 'Building scalable, extensible multi-agent systems.',
    problem:
      'Enterprise assistants need to handle many kinds of requests without one monolithic agent that is hard to extend.',
    approach:
      'A router agent and planner agent decompose requests and dispatch them to specialized worker agents. Tools are discovered dynamically through MCP, while task ownership, shared context and memory keep concurrent execution coordinated.',
    highlights: [
      'Router and planner agents',
      'Specialized worker agents',
      'Dynamic tool discovery',
      'Task ownership and coordination',
      'Shared context and memory',
    ],
    stack: ['Python', 'LangGraph', 'MCP', 'Microsoft Foundry'],
    diagram: 'superagent',
  },
  {
    id: 'agent-memory',
    title: 'Agent Memory Management',
    status: 'Implemented',
    focus: 'Giving AI agents persistent context and continuity.',
    problem: 'Agents forget everything between conversations, which breaks continuity and personalization.',
    approach:
      'Mem0 on top of PostgreSQL and pgvector stores short-term and long-term memory, split into semantic and episodic types, and restores relevant context when a conversation resumes.',
    highlights: [
      'Short-term and long-term memory',
      'Semantic and episodic memory',
      'Memory retrieval and persistence',
      'Context restoration across conversations',
    ],
    stack: ['Mem0', 'PostgreSQL', 'pgvector', 'Python'],
    diagram: 'memory',
  },
  {
    id: 'advanced-rag',
    title: 'Advanced RAG Engineering',
    status: 'Implemented',
    focus: 'Improving retrieval quality and contextual accuracy.',
    problem: 'Naive retrieval often returns loosely related chunks, so answers are weakly grounded.',
    approach:
      'Documents are ingested and embedded, then retrieved with hybrid search, re-ranked, and optionally driven by an agent that decides when and how to retrieve again.',
    highlights: [
      'Document ingestion',
      'Embedding generation',
      'Hybrid retrieval',
      'Re-ranking',
      'Agentic retrieval workflows',
    ],
    stack: ['Python', 'Embeddings', 'Vector DB', 'Hybrid Search', 'LangChain'],
    diagram: 'rag',
  },
  {
    id: 'observability',
    title: 'Enterprise AI Observability',
    status: 'Implemented',
    focus: 'Understanding and monitoring distributed AI execution.',
    problem:
      'A request crossing the UI, gateways, core services, Foundry and MCP servers is hard to follow when something goes wrong.',
    approach:
      'Trace and span IDs propagate across every hop using OpenTelemetry, so agent execution and MCP tool invocations can be correlated in Grafana and Datadog.',
    highlights: [
      'End-to-end trace propagation',
      'Agent execution tracking',
      'MCP tool tracing',
      'Request and span correlation',
    ],
    stack: ['OpenTelemetry', 'Datadog', 'Grafana', 'Loki', 'Tempo'],
    diagram: 'observability',
  },
  {
    id: 'event-notifications',
    title: 'Event-Driven Notification Architecture',
    status: 'Implemented',
    focus: 'Decoupled real-time notification infrastructure.',
    problem: 'Notifications tightly coupled to producers are hard to extend with new channels.',
    approach:
      'Events are published to NATS and streamed to the UI over Server-Sent Events. New downstream consumers such as email or Microsoft Teams can be added without touching the producers.',
    highlights: [
      'NATS messaging',
      'SSE-based real-time updates',
      'Event-driven architecture',
      'Extensible downstream integrations',
    ],
    stack: ['NATS', 'Server-Sent Events', 'Python'],
    diagram: 'events',
  },
  {
    id: 'ocr',
    title: 'Intelligent OCR & Document Processing',
    status: 'Exploration',
    focus: 'Combining traditional OCR and AI-based document understanding.',
    problem: 'Choosing between classic OCR and vision language models for document understanding is not obvious.',
    approach:
      'Images are preprocessed with OpenCV, Pillow and NumPy, then run through RapidOCR on ONNX Runtime and compared against Vision Language Models.',
    highlights: [
      'RapidOCR with ONNX Runtime',
      'OpenCV preprocessing',
      'OCR versus VLM evaluation',
      'Document understanding',
    ],
    stack: ['RapidOCR', 'ONNX Runtime', 'OpenCV', 'Pillow', 'NumPy'],
    diagram: 'ocr',
  },
]
