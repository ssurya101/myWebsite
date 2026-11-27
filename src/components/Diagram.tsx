import { motion } from 'motion/react'
import type { DiagramId } from '../data/projects'

interface Node {
  id: string
  label: string
  x: number
  y: number
  w?: number
  accent?: boolean
}
type Edge = [from: string, to: string, dashed?: boolean]
interface Spec {
  nodes: Node[]
  edges: Edge[]
}

const H = 36
const W = 96

const specs: Record<DiagramId, Spec> = {
  superagent: {
    nodes: [
      { id: 'u', label: 'User', x: 8, y: 92 },
      { id: 'r', label: 'Router', x: 118, y: 92, accent: true },
      { id: 'p', label: 'Planner', x: 228, y: 92, accent: true },
      { id: 'a', label: 'Worker A', x: 360, y: 20 },
      { id: 'b', label: 'Worker B', x: 360, y: 92 },
      { id: 'c', label: 'Worker C', x: 360, y: 164 },
      { id: 'm', label: 'Shared memory', x: 214, y: 168, w: 124 },
    ],
    edges: [['u', 'r'], ['r', 'p'], ['p', 'a'], ['p', 'b'], ['p', 'c'], ['p', 'm', true]],
  },
  memory: {
    nodes: [
      { id: 'a', label: 'Agent', x: 8, y: 92, accent: true },
      { id: 'm', label: 'Mem0', x: 140, y: 92 },
      { id: 's', label: 'Short-term', x: 280, y: 36 },
      { id: 'l', label: 'Long-term', x: 280, y: 148 },
      { id: 'd', label: 'Postgres + pgvector', x: 360, y: 92, w: 120 },
    ],
    edges: [['a', 'm'], ['m', 's'], ['m', 'l'], ['s', 'd', true], ['l', 'd']],
  },
  rag: {
    nodes: [
      { id: 'd', label: 'Documents', x: 8, y: 92 },
      { id: 'e', label: 'Embed', x: 116, y: 92 },
      { id: 'v', label: 'Vector DB', x: 218, y: 32 },
      { id: 'k', label: 'Keyword', x: 218, y: 152 },
      { id: 'h', label: 'Hybrid + Rerank', x: 340, y: 92, w: 132, accent: true },
    ],
    edges: [['d', 'e'], ['e', 'v'], ['e', 'k'], ['v', 'h'], ['k', 'h']],
  },
  observability: {
    nodes: [
      { id: 'ui', label: 'UI', x: 8, y: 20, w: 70 },
      { id: 'g', label: 'Gateway', x: 8, y: 92, w: 80 },
      { id: 'c', label: 'Core service', x: 128, y: 92, w: 110 },
      { id: 'f', label: 'Foundry', x: 280, y: 36, w: 90 },
      { id: 'mcp', label: 'MCP server', x: 280, y: 148, w: 104 },
      { id: 'o', label: 'OTel → Grafana', x: 380, y: 92, w: 100, accent: true },
    ],
    edges: [['ui', 'g'], ['g', 'c'], ['c', 'f'], ['c', 'mcp'], ['f', 'o', true], ['mcp', 'o', true]],
  },
  events: {
    nodes: [
      { id: 'p', label: 'Producer', x: 8, y: 92 },
      { id: 'n', label: 'NATS', x: 140, y: 92, accent: true },
      { id: 's', label: 'SSE → UI', x: 290, y: 20 },
      { id: 'e', label: 'Email', x: 290, y: 92 },
      { id: 't', label: 'Teams', x: 290, y: 164 },
    ],
    edges: [['p', 'n'], ['n', 's'], ['n', 'e', true], ['n', 't', true]],
  },
  ocr: {
    nodes: [
      { id: 'i', label: 'Image', x: 8, y: 92 },
      { id: 'p', label: 'OpenCV prep', x: 130, y: 92, w: 108 },
      { id: 'o', label: 'RapidOCR', x: 290, y: 36 },
      { id: 'v', label: 'VLM', x: 290, y: 148 },
      { id: 'c', label: 'Compare', x: 400, y: 92, w: 80, accent: true },
    ],
    edges: [['i', 'p'], ['p', 'o'], ['p', 'v'], ['o', 'c'], ['v', 'c']],
  },
}

function clip(n: Node, tx: number, ty: number) {
  const w = n.w ?? W
  const cx = n.x + w / 2
  const cy = n.y + H / 2
  const dx = tx - cx
  const dy = ty - cy
  const k = Math.min(dx !== 0 ? w / 2 / Math.abs(dx) : Infinity, dy !== 0 ? H / 2 / Math.abs(dy) : Infinity)
  return { x: cx + dx * k, y: cy + dy * k }
}

export function Diagram({ id, title }: { id: DiagramId; title: string }) {
  const { nodes, edges } = specs[id]
  const byId = Object.fromEntries(nodes.map((n) => [n.id, n]))
  const center = (n: Node) => ({ x: n.x + (n.w ?? W) / 2, y: n.y + H / 2 })

  return (
    <svg
      viewBox="0 0 490 208"
      role="img"
      aria-label={`Architecture diagram: ${title}`}
      className="h-full w-full"
    >
      <defs>
        <marker id={`arrow-${id}`} viewBox="0 0 8 8" refX="7" refY="4" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0 0 L8 4 L0 8 z" fill="#7a8cff" />
        </marker>
      </defs>

      {edges.map(([f, t, dashed]) => {
        const a = byId[f]
        const b = byId[t]
        const ca = center(a)
        const cb = center(b)
        const p1 = clip(a, cb.x, cb.y)
        const p2 = clip(b, ca.x, ca.y)
        return (
          <motion.line
            key={`${f}-${t}`}
            x1={p1.x}
            y1={p1.y}
            x2={p2.x}
            y2={p2.y}
            stroke="#7a8cff"
            strokeOpacity={0.7}
            strokeWidth={1.4}
            strokeDasharray={dashed ? '4 4' : undefined}
            markerEnd={`url(#arrow-${id})`}
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          />
        )
      })}

      {nodes.map((n) => {
        const w = n.w ?? W
        return (
          <g key={n.id}>
            <rect
              x={n.x}
              y={n.y}
              width={w}
              height={H}
              rx={10}
              fill={n.accent ? 'rgb(91 124 255 / 0.18)' : '#17171d'}
              stroke={n.accent ? '#5b7cff' : 'rgb(255 255 255 / 0.18)'}
            />
            <text
              x={n.x + w / 2}
              y={n.y + H / 2 + 4}
              textAnchor="middle"
              fontSize={11}
              fill="#e8e8f0"
              fontFamily="Inter Variable, system-ui, sans-serif"
            >
              {n.label}
            </text>
          </g>
        )
      })}
    </svg>
  )
}
