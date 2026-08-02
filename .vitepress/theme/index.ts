import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import './style.css'

// 语言切换完全交给 VitePress 默认主题导航栏里的语言下拉，不再按浏览器语言自动跳转。
// 自动跳转会让爬虫只看得到一种语言，此前也正是它导致 / 与 /en/ 被 Google 判为重复页。
export default {
  extends: DefaultTheme
} satisfies Theme
