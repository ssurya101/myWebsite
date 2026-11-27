import test from 'node:test'
import assert from 'node:assert/strict'
import { parseMediumFeed } from './medium-feed.mjs'

function item(title, date, content, extra = '') {
  return `<item><title><![CDATA[${title}]]></title>
    <link>https://medium.com/@suryasm0602/${title}</link>
    <pubDate>${date}</pubDate>
    <content:encoded><![CDATA[${content}]]></content:encoded>${extra}</item>`
}

test('extracts article summaries and sorts newest first', () => {
  const feed = `<rss><channel>
    ${item('older', 'Sat, 03 Jan 2026 10:00:00 GMT', '<p>Older post</p>')}
    ${item('newer', 'Sun, 04 Jan 2026 10:00:00 GMT', '<p>AI &amp; agents</p><img src="https://example.com/image.jpg"><p>Full article text</p>', '<category><![CDATA[agentic-ai]]></category>')}
  </channel></rss>`

  assert.deepEqual(parseMediumFeed(feed), [
    {
      title: 'newer',
      url: 'https://medium.com/@suryasm0602/newer',
      date: '2026-01-04',
      description: 'AI & agents',
      tags: ['agentic ai'],
      cover: 'https://example.com/image.jpg',
    },
    {
      title: 'older',
      url: 'https://medium.com/@suryasm0602/older',
      date: '2026-01-03',
      description: 'Older post',
      tags: [],
    },
  ])
})

test('truncates long summaries without including the rest of the article', () => {
  const feed = `<rss><channel>${item('long', 'Sat, 03 Jan 2026 10:00:00 GMT', `<p>${'a'.repeat(250)}</p>`)}</channel></rss>`
  assert.equal(parseMediumFeed(feed)[0].description, `${'a'.repeat(217)}...`)
})

test('rejects invalid and incomplete feeds instead of publishing them', () => {
  assert.throws(() => parseMediumFeed('<html></html>'), /invalid RSS/)
  assert.throws(() => parseMediumFeed('<rss><channel></channel></rss>'), /empty RSS/)
  assert.throws(() => parseMediumFeed('<rss><channel><item><title>Incomplete</title></item></channel></rss>'), /missing link/)
  assert.throws(() => parseMediumFeed(`<rss><channel>${item('bad', 'not a date', '<p>text</p>')}</channel></rss>`), /Invalid publication date/)
})
