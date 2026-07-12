import { readFile, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'

const sitemapPath = resolve('.vitepress/dist/sitemap.xml')
const source = await readFile(sitemapPath, 'utf8')

if (
  !source.startsWith('<?xml') ||
  !source.includes('<urlset') ||
  !source.trimEnd().endsWith('</urlset>')
) {
  throw new Error('Generated sitemap.xml is not a complete XML sitemap')
}

let depth = 0
const formatted = source
  .replace(/>\s*</g, '>\n<')
  .trim()
  .split('\n')
  .map((line) => {
    const tag = line.trim()

    if (tag.startsWith('</')) {
      depth = Math.max(0, depth - 1)
    }

    const output = `${'  '.repeat(depth)}${tag}`
    const opensElement =
      tag.startsWith('<') &&
      !tag.startsWith('</') &&
      !tag.startsWith('<?') &&
      !tag.startsWith('<!') &&
      !tag.endsWith('/>') &&
      !tag.includes('</')

    if (opensElement) {
      depth += 1
    }

    return output
  })
  .join('\n')

const urlCount = (source.match(/<url>/g) || []).length
await writeFile(sitemapPath, `${formatted}\n`, 'utf8')
console.log(`Formatted sitemap.xml with ${urlCount} URLs`)
