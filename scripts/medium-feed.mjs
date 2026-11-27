import { DomUtils, parseDocument } from 'htmlparser2'

function firstElement(name, nodes) {
  return DomUtils.findOne((element) => element.name === name, nodes)
}

function requiredText(name, nodes) {
  const element = firstElement(name, nodes)
  const value = element ? DomUtils.textContent(element).trim() : ''
  if (!value) throw new Error(`Medium RSS item is missing ${name}.`)
  return value
}

export function parseMediumFeed(xml) {
  const document = parseDocument(xml, { xmlMode: true })
  const rss = firstElement('rss', document.children)
  const channel = rss && firstElement('channel', rss.children)
  if (!channel) throw new Error('Medium returned an invalid RSS feed.')

  const items = channel.children.filter((node) => node.type === 'tag' && node.name === 'item')
  if (items.length === 0) throw new Error('Medium returned an empty RSS feed.')

  return items.map((item) => {
    const title = requiredText('title', item.children)
    const url = new URL(requiredText('link', item.children))
    if (url.protocol !== 'https:' || url.hostname !== 'medium.com') {
      throw new Error(`Unexpected Medium article URL: ${url.href}`)
    }

    const publishedAt = new Date(requiredText('pubDate', item.children))
    if (Number.isNaN(publishedAt.getTime())) throw new Error(`Invalid publication date for ${title}.`)

    const content = requiredText('content:encoded', item.children)
    const html = parseDocument(content)
    const paragraph = firstElement('p', html.children)
    const text = paragraph ? DomUtils.textContent(paragraph).trim() : ''
    const description = text.length > 220 ? `${text.slice(0, 217).trimEnd()}...` : text
    const image = firstElement('img', html.children)?.attribs.src
    const tags = item.children
      .filter((node) => node.type === 'tag' && node.name === 'category')
      .map((node) => DomUtils.textContent(node).trim().replace(/-/g, ' '))
      .filter(Boolean)

    return {
      title,
      url: url.href,
      date: publishedAt.toISOString().slice(0, 10),
      description,
      tags,
      ...(image ? { cover: image } : {}),
    }
  }).sort((a, b) => b.date.localeCompare(a.date))
}
