export interface Article {
  title: string
  description: string
  date: string // ISO yyyy-mm-dd
  tags: string[]
  url: string
  cover?: string // optional image path or URL
}
