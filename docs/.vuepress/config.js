import { viteBundler } from '@vuepress/bundler-vite'
import { defaultTheme } from '@vuepress/theme-default'
import { defineUserConfig } from 'vuepress'

export default defineUserConfig({
    title: "PhyberApex",
    bundler: viteBundler(),
    theme: defaultTheme({
        logo: '/images/phyberapex-logo.png',
        navbar: [
            {
                text: 'Home',
                link: '/',
            },
            {
                text: 'Me',
                link: '/about',
            },
        ],
    }),
    head: [
        ['link', { rel: "apple-touch-icon", sizes: "180x180", href: "/favicons/apple-touch-icon.png"}],
        ['link', { rel: "icon", type: "image/png", sizes: "32x32", href: "/favicons/favicon-32x32.png"}],
        ['link', { rel: "icon", type: "image/png", sizes: "16x16", href: "/favicons/favicon-16x16.png"}],
        ['link', { rel: "manifest", href: "/favicons/site.webmanifest"}],
        ['link', { rel: "mask-icon", href: "/favicons/safari-pinned-tab.svg", color: "#5bbad5"}],
        ['meta', { name: "msapplication-TileColor", content: "#da532c"}],
        ['meta', { name: "theme-color", content: "#ffffff"}],
    ],
})