import { viteBundler } from '@vuepress/bundler-vite'
import { defaultTheme } from '@vuepress/theme-default'
import { defineUserConfig } from 'vuepress'

export default defineUserConfig({
    title: "PhyberApex",
    description: "Software Engineering PMTS at Salesforce | Gamer | Miniature Painter",
    bundler: viteBundler(),
    theme: defaultTheme({
        logo: '/images/phyberapex-logo.png',
        navbar: [
            { text: 'Home', link: '/' },
            { text: 'About', link: '/about' },
            { text: 'Projects', link: '/projects/' },
            {
                text: 'Interests',
                children: [
                    { text: 'Gaming', link: '/interests/gaming' },
                    { text: 'Vinyl Collection', link: '/interests/vinyl' },
                    { text: 'Miniature Painting', link: '/interests/miniatures' },
                ],
            },
            { text: 'CV', link: 'https://registry.jsonresume.org/phyberapex?theme=kendall' },
        ],
        sidebar: {
            '/projects/': [
                {
                    text: 'Projects',
                    children: [
                        '/projects/README.md',
                        '/projects/knowledgeng.md',
                        '/projects/diary-of-legends.md',
                        '/projects/lol-api-wrapper.md',
                        '/projects/lobbybinghoe.md',
                        '/projects/lightning-talks.md',
                    ],
                },
            ],
            '/interests/': [
                {
                    text: 'My Interests',
                    children: [
                        '/interests/gaming.md',
                        '/interests/vinyl.md',
                        '/interests/miniatures.md',
                    ],
                },
            ],
        },
    }),
    head: [
        ['link', { rel: "apple-touch-icon", sizes: "180x180", href: "/favicons/apple-touch-icon.png"}],
        ['link', { rel: "icon", type: "image/png", sizes: "32x32", href: "/favicons/favicon-32x32.png"}],
        ['link', { rel: "icon", type: "image/png", sizes: "16x16", href: "/favicons/favicon-16x16.png"}],
        ['link', { rel: "manifest", href: "/favicons/site.webmanifest"}],
        ['meta', { name: "msapplication-TileColor", content: "#da532c"}],
        ['meta', { name: "theme-color", content: "#ffffff"}],
    ],
})