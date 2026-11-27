import { readFile, rename, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import { parseMediumFeed } from './medium-feed.mjs'

const root = fileURLToPath(new URL('../', import.meta.url))
const feedPath = path.join(root, 'public', 'medium-feed.json')
const temporaryPath = `${feedPath}.tmp`
const feedUrl = 'https://medium.com/feed/@suryasm0602'

try {
  const response = await fetch(feedUrl, {
    headers: { 'user-agent': 'SuryaPortfolio/1.0' },
    signal: AbortSignal.timeout(15000),
  })

  if (!response.ok) {
    throw new Error(`Medium returned HTTP ${response.status}`)
  }

  const articles = parseMediumFeed(await response.text())
  await writeFile(temporaryPath, JSON.stringify(articles), 'utf8')
  await rename(temporaryPath, feedPath)
  console.log(`Synced ${articles.length} Medium articles.`)
} catch (error) {
  const syncError = error instanceof Error ? error.message : String(error)
  let cachedFeed

  try {
    cachedFeed = JSON.parse(await readFile(feedPath, 'utf8'))
  } catch {
    cachedFeed = null
  }

  if (process.env.CI !== 'true' && Array.isArray(cachedFeed) && cachedFeed.length > 0) {
    console.warn(`Medium feed sync failed; keeping the last synced feed. ${syncError}`)
  } else {
    console.error(`Could not sync Medium feed. ${syncError}`)
    process.exitCode = 1
  }
}
