import { defineConfig, type HeadConfig } from 'vitepress'
import { sidebar, sectionLabels } from './sidebar.mts'

const siteUrl = 'https://md.ccwu.cc'
const siteName = 'ImgHost Docs'
const siteDescription = 'ImgHost documentation for deployment, storage channels, API tokens, public gallery, random image API, backups, OCR, and blog setup.'

// 每种语言的单一事实来源，locales、hreflang、Open Graph 与结构化数据都由此派生。
// dir：URL 路径前缀，同时也是仓库里的目录名。英文是根语言，dir 为空串，
//   页面地址是 /upload/s3 而不是 /en/upload/s3，VitePress 的 locales 键相应用 'root'。
// lang：写进 <html lang>，用 BCP-47，允许文字子标签（如 zh-Hant-TW）。
// hreflang：写进 hreflang，只用 ISO 639-1 语言码加可选 ISO 3166-1 alpha-2 地区码，
//   所以 zh-TW 这里刻意不带 Hant 文字子标签，避免部分搜索引擎判为无效值。
// siteName：各语言 index.md 里已有的站点名译法，仅供 og:site_name 与结构化数据使用，
//   不参与导航栏渲染，因此不改变阅读界面。
const localeDefs = [
  { dir: '', label: 'English', lang: 'en-US', hreflang: 'en-US', siteName: 'ImgHost Docs' },
  { dir: 'cn', label: '简体中文', lang: 'zh-CN', hreflang: 'zh-CN', siteName: 'ImgHost 文档' },
  { dir: 'zh-TW', label: '繁體中文', lang: 'zh-Hant-TW', hreflang: 'zh-TW', siteName: 'ImgHost 文件' },
  { dir: 'ja-JP', label: '日本語', lang: 'ja-JP', hreflang: 'ja-JP', siteName: 'ImgHost ドキュメント' },
  { dir: 'ko-KR', label: '한국어', lang: 'ko-KR', hreflang: 'ko-KR', siteName: 'ImgHost 문서' },
  { dir: 'es', label: 'Español', lang: 'es', hreflang: 'es', siteName: 'Documentación de ImgHost' },
  { dir: 'pt-BR', label: 'Português do Brasil', lang: 'pt-BR', hreflang: 'pt-BR', siteName: 'Documentação do ImgHost' },
  { dir: 'fr-FR', label: 'Français', lang: 'fr-FR', hreflang: 'fr-FR', siteName: 'Documentation ImgHost' },
  { dir: 'de-DE', label: 'Deutsch', lang: 'de-DE', hreflang: 'de-DE', siteName: 'ImgHost-Dokumentation' },
  { dir: 'it-IT', label: 'Italiano', lang: 'it-IT', hreflang: 'it-IT', siteName: 'Documentazione ImgHost' },
  { dir: 'nl-NL', label: 'Nederlands', lang: 'nl-NL', hreflang: 'nl-NL', siteName: 'ImgHost-documentatie' },
  { dir: 'pl-PL', label: 'Polski', lang: 'pl-PL', hreflang: 'pl-PL', siteName: 'Dokumentacja ImgHost' },
  { dir: 'cs-CZ', label: 'Čeština', lang: 'cs-CZ', hreflang: 'cs-CZ', siteName: 'Dokumentace ImgHost' },
  { dir: 'uk-UA', label: 'Українська', lang: 'uk-UA', hreflang: 'uk-UA', siteName: 'Документація ImgHost' },
  { dir: 'ru-RU', label: 'Русский', lang: 'ru-RU', hreflang: 'ru-RU', siteName: 'Документация ImgHost' },
  { dir: 'tr-TR', label: 'Türkçe', lang: 'tr-TR', hreflang: 'tr-TR', siteName: 'ImgHost Belgeleri' },
  { dir: 'ar-SA', label: 'العربية', lang: 'ar-SA', hreflang: 'ar-SA', siteName: 'توثيق ImgHost' },
  { dir: 'hi', label: 'हिन्दी', lang: 'hi', hreflang: 'hi', siteName: 'ImgHost दस्तावेज़' },
  { dir: 'bn-BD', label: 'বাংলা', lang: 'bn-BD', hreflang: 'bn-BD', siteName: 'ImgHost ডকুমেন্টেশন' },
  { dir: 'th-TH', label: 'ไทย', lang: 'th-TH', hreflang: 'th-TH', siteName: 'เอกสาร ImgHost' },
  { dir: 'vi-VN', label: 'Tiếng Việt', lang: 'vi-VN', hreflang: 'vi-VN', siteName: 'Tài liệu ImgHost' },
  { dir: 'ms-MY', label: 'Bahasa Melayu', lang: 'ms-MY', hreflang: 'ms-MY', siteName: 'Dokumentasi ImgHost' },
  { dir: 'id-ID', label: 'Bahasa Indonesia', lang: 'id-ID', hreflang: 'id-ID', siteName: 'Dokumentasi ImgHost' },
  { dir: 'ur', label: 'اردو', lang: 'ur', hreflang: 'ur', siteName: 'ImgHost دستاویزات' },
  { dir: 'ta', label: 'தமிழ்', lang: 'ta', hreflang: 'ta', siteName: 'ImgHost ஆவணம்' },
  { dir: 'fa', label: 'فارسی', lang: 'fa', hreflang: 'fa', siteName: 'مستندات ImgHost' },
  { dir: 'my', label: 'မြန်မာ', lang: 'my', hreflang: 'my', siteName: 'ImgHost လမ်းညွှန်' },
  { dir: 'ps', label: 'پښتو', lang: 'ps', hreflang: 'ps', siteName: 'د ImgHost لارښود' }
]

// 带路径前缀的语言目录，不含根语言英文；用于从路径首段识别语言。
const prefixedDirs = localeDefs.map((locale) => locale.dir).filter(Boolean)
const localeByDir = new Map(localeDefs.map((locale) => [locale.dir, locale]))

// 英文位于仓库根目录，这四个是它的内容子目录。用来把根目录下的英文页面
// 与 README.md 这类不参与文档导航的文件区分开。
const rootSections = new Set(['upload', 'Safety', 'Other', 'Page'])

// 逻辑路径首段到 sidebar.mts 里 sectionLabels 的键；只有 upload 有 index.md，
// 因此只有它能作为可点击的面包屑中间层级。
const sectionKeys: Record<string, string> = {
  upload: 'upload',
  Safety: 'safety',
  Other: 'other',
  Page: 'page'
}
const sectionsWithIndex = new Set(['upload'])

function toCleanUrl(page: string) {
  const normalized = page.replace(/\\/g, '/')
  const withoutIndex = normalized.replace(/(^|\/)index\.md$/, '$1')
  const cleanPath = withoutIndex.replace(/\.md$/, '')
  return cleanPath.startsWith('/') ? cleanPath : `/${cleanPath}`
}

function toAbsoluteUrl(page: string) {
  return new URL(toCleanUrl(page), siteUrl).toString()
}

// 拼某个语言下某个逻辑路径的绝对地址；根语言英文不带路径前缀。
function localeHref(dir: string, logical: string) {
  return dir ? `${siteUrl}/${dir}/${logical}` : `${siteUrl}/${logical}`
}

// 路径首段是已知语言目录就返回它，否则返回空串，代表这是根语言英文。
function localeDirOf(path: string) {
  const firstSegment = path.replace(/\\/g, '/').split('/')[0]
  return prefixedDirs.includes(firstSegment) ? firstSegment : ''
}

// 参与 hreflang 集群的是：带语言前缀的页面，以及根目录下的英文页面
// （首页 index.md 与四个内容目录）。README.md 不参与。
function isClusteredPage(page: string) {
  const normalized = page.replace(/\\/g, '/')
  if (localeDirOf(normalized)) return true
  if (normalized === 'index.md') return true
  return rootSections.has(normalized.split('/')[0])
}

// 剥掉语言前缀得到逻辑路径，与 VitePress 内部的 sitemap 分组规则保持一致：
// index.md 与 cn/index.md 都是 ''，upload/index.md 与 ja-JP/upload/index.md 都是 'upload/'，
// upload/s3.md 与 ja-JP/upload/s3.md 都是 'upload/s3'。
function logicalPathOfPage(page: string) {
  const normalized = page.replace(/\\/g, '/')
  const dir = localeDirOf(normalized)
  const rest = dir ? normalized.slice(dir.length + 1) : normalized
  return rest.replace(/(^|\/)index\.md$/, '$1').replace(/\.md$/, '')
}

// sitemap 的 item.url 是相对路径，形如 ''、'upload/s3'、'ja-JP/upload/s3'。
function normalizeSitemapUrl(url: string) {
  return url.replace(/^\//, '')
}

function isClusteredUrl(url: string) {
  const normalized = normalizeSitemapUrl(url)
  if (localeDirOf(normalized)) return true
  if (normalized === '') return true
  return rootSections.has(normalized.split('/')[0])
}

function logicalPathOfUrl(url: string) {
  const normalized = normalizeSitemapUrl(url)
  const dir = localeDirOf(normalized)
  return dir ? normalized.slice(dir.length + 1) : normalized
}

// 一个逻辑路径对应的完整 hreflang 集群：1 条 x-default 加 28 条语言。
// 集群成员共享同一份清单，天然满足 hreflang 的双向与自指要求，且每个语言码只出现一次。
// 英文是根语言，所以 x-default 与 en-US 都指向不带前缀的根路径。
function hreflangCluster(logical: string) {
  return [
    { hreflang: 'x-default', href: localeHref('', logical) },
    ...localeDefs.map((locale) => ({
      hreflang: locale.hreflang,
      href: localeHref(locale.dir, logical)
    }))
  ]
}

// Open Graph 的 locale 要求 language_TERRITORY，没有地区码的语言直接跳过。
function toOgLocale(hreflang: string) {
  return /^[a-z]{2}-[A-Z]{2}$/.test(hreflang) ? hreflang.replace('-', '_') : null
}

function toJsonLd(data: unknown) {
  return JSON.stringify(data).replace(/</g, '\\u003C')
}

function buildBreadcrumb(dir: string, logical: string, pageTitle: string, url: string) {
  const segments = logical.replace(/\/$/, '').split('/').filter(Boolean)
  if (segments.length === 0) return null

  const locale = localeByDir.get(dir)
  // sectionLabels 仍以 'en' 作为英文的键，而根语言英文的 dir 是空串。
  const labels = sectionLabels[dir || 'en'] || sectionLabels.en
  const sectionKey = sectionKeys[segments[0]]
  const isSectionIndex = segments.length === 1
  const trail = [{ name: locale?.siteName || siteName, item: localeHref(dir, '') }]

  if (sectionKey && !isSectionIndex && sectionsWithIndex.has(segments[0])) {
    trail.push({ name: labels[sectionKey], item: localeHref(dir, `${segments[0]}/`) })
  }

  trail.push({
    name: sectionKey && isSectionIndex ? labels[sectionKey] : pageTitle,
    item: url
  })

  return {
    '@type': 'BreadcrumbList',
    '@id': `${url}#breadcrumb`,
    itemListElement: trail.map((entry, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: entry.name,
      item: entry.item
    }))
  }
}

// VitePress 只负责展示静态 Markdown；Cloudflare Pages 负责托管构建产物。
export default defineConfig({
  title: siteName,
  description: siteDescription,
  cleanUrls: true,
  lastUpdated: true,
  ignoreDeadLinks: false,
  sitemap: {
    hostname: siteUrl,
    transformItems(items) {
      return items
        .filter((item) => normalizeSitemapUrl(item.url) !== 'README')
        .map((item) => {
          if (!isClusteredUrl(item.url)) return item

          // VitePress 让同一集群的所有条目共享同一个 links 数组，这里必须新建数组而不是原地修改。
          return {
            ...item,
            links: hreflangCluster(logicalPathOfUrl(item.url)).map((alternate) => ({
              lang: alternate.hreflang,
              hreflang: alternate.hreflang,
              url: alternate.href
            }))
          }
        })
    }
  },
  head: [
    ['link', { rel: 'icon', type: 'image/png', sizes: '64x64', href: '/favicon.png' }],
    ['meta', { name: 'theme-color', content: '#2563eb' }],
    ['meta', { name: 'robots', content: 'index,follow' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { name: 'twitter:card', content: 'summary' }]
  ],
  transformHead({ page, pageData, title, description }) {
    const url = toAbsoluteUrl(page)
    const pageDescription = description || siteDescription
    const dir = localeDirOf(page.replace(/\\/g, '/'))
    const locale = localeByDir.get(dir)!
    const logical = logicalPathOfPage(page)
    const clustered = isClusteredPage(page)

    // 首页用本地化站点名，内页用该语言 Markdown 的 H1，避免 og:title 带上英文站点名后缀。
    const ogTitle =
      clustered && logical === '' ? locale.siteName : pageData?.title || title || siteName

    const tags: HeadConfig[] = [
      ['link', { rel: 'canonical', href: url }],
      ['meta', { property: 'og:url', content: url }],
      ['meta', { property: 'og:title', content: ogTitle }],
      ['meta', { property: 'og:description', content: pageDescription }],
      ['meta', { property: 'og:site_name', content: locale.siteName }],
      ['meta', { name: 'twitter:title', content: ogTitle }],
      ['meta', { name: 'twitter:description', content: pageDescription }]
    ]

    if (!clustered) return tags

    for (const alternate of hreflangCluster(logical)) {
      tags.push(['link', { rel: 'alternate', hreflang: alternate.hreflang, href: alternate.href }])
    }

    const ogLocale = toOgLocale(locale.hreflang)
    if (ogLocale) {
      tags.push(['meta', { property: 'og:locale', content: ogLocale }])
      for (const other of localeDefs) {
        const alternateLocale = toOgLocale(other.hreflang)
        if (alternateLocale && alternateLocale !== ogLocale) {
          tags.push(['meta', { property: 'og:locale:alternate', content: alternateLocale }])
        }
      }
    }

    const graph: Record<string, unknown>[] = [
      {
        '@type': 'WebSite',
        '@id': `${siteUrl}/#website`,
        name: locale.siteName,
        url: `${siteUrl}/`,
        inLanguage: locale.lang
      }
    ]

    if (logical !== '') {
      graph.push({
        '@type': 'TechArticle',
        '@id': `${url}#article`,
        headline: ogTitle,
        description: pageDescription,
        url,
        inLanguage: locale.lang,
        isPartOf: { '@id': `${siteUrl}/#website` },
        ...(pageData?.lastUpdated
          ? { dateModified: new Date(pageData.lastUpdated).toISOString() }
          : {})
      })
    }

    const breadcrumb = buildBreadcrumb(dir, logical, ogTitle, url)
    if (breadcrumb) graph.push(breadcrumb)

    tags.push([
      'script',
      { type: 'application/ld+json' },
      toJsonLd({ '@context': 'https://schema.org', '@graph': graph })
    ])

    return tags
  },
  markdown: {
    image: {
      lazyLoading: true
    }
  },
  // 'root' 是 VitePress 约定的根语言键，对应不带路径前缀的英文。
  locales: Object.fromEntries(
    localeDefs.map((locale) => [locale.dir || 'root', { label: locale.label, lang: locale.lang }])
  ),
  themeConfig: {
    nav: [],
    sidebar,
    search: {
      provider: 'local'
    },
    outline: {
      level: [2, 3]
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/axibayuit-a11y/imghost-docs' }
    ],
    footer: {
      message: 'Released as user documentation for ImgHost.'
    }
  }
})
