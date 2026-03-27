export const STATUS_LABELS = {
  active:     '[active]',
  maintained: '[maintained]',
  archived:   '[archived]',
}

export const PROJECTS = [
  {
    slug: 'hibiki',
    name: 'Hibiki',
    tagline: 'Discord music bot with REST API and web dashboard.',
    detail: 'Built because existing bots charged monthly. NestJS + Vue 3 monorepo, slash commands, queue management, SQLite state persistence. Probably over-engineered. That was the point.',
    stack: ['NestJS', 'Vue 3', 'TypeScript', 'SQLite'],
    status: 'active',
    featured: true,
  },
  {
    slug: 'kuroshiro',
    name: 'Kuroshiro',
    tagline: 'Self-hosted server for TRMNL e-paper displays.',
    detail: 'The kind of thing that takes a weekend to scaffold and months to perfect. Provisions new devices automatically, serves custom plugins, keeps a PostgreSQL log of everything.',
    stack: ['NestJS', 'Vue 3', 'PostgreSQL', 'Docker'],
    status: 'active',
    featured: true,
  },
  {
    slug: 'slds-schema-renderer',
    name: 'SLDS Schema Renderer',
    tagline: 'JSON Schema files → interactive HTML docs, styled for Salesforce LWC. Internal tooling that saves hours.',
    detail: null,
    stack: ['Node.js', 'JSON Schema', 'SLDS', 'CLI'],
    status: 'maintained',
    featured: false,
  },
  {
    slug: 'knowledgeng',
    name: 'KnowledgeNG',
    tagline: 'Knowledge management system. Scratching a personal itch.',
    detail: null,
    stack: ['Vue 3', 'TypeScript', 'NestJS'],
    status: 'archived',
    featured: false,
  },
  {
    slug: 'diary-of-legends',
    name: 'Diary of Legends',
    tagline: 'League of Legends match history and statistics tracker.',
    detail: null,
    stack: ['Vue 3', 'Riot API', 'Node.js'],
    status: 'maintained',
    featured: false,
  },
  {
    slug: 'lobbybinghoe',
    name: 'LobbyBinghoe',
    tagline: 'Bingo web app for the Hobbylos podcast community. Built for a friend, used by strangers.',
    detail: null,
    stack: ['Vue 3', 'Supabase'],
    status: 'archived',
    featured: false,
  },
  {
    slug: 'lol-api-wrapper',
    name: 'LoL API Wrapper',
    tagline: 'Node.js wrapper for the Riot Games API. Written before discovering there were already twelve of them.',
    detail: null,
    stack: ['Node.js', 'TypeScript', 'Riot API'],
    status: 'archived',
    featured: false,
  },
  {
    slug: 'lightning-talks',
    name: 'Lightning Talks',
    tagline: 'Technical presentations on security, frontend patterns, and tooling.',
    detail: null,
    stack: ['Slidev', 'Vue', 'Security'],
    status: 'active',
    featured: false,
  },
]

export const CONTRIB = [
  {
    name: 'Camunda Docs',
    url: 'https://github.com/camunda/camunda-docs-manual',
    desc: 'Documentation contributions',
  },
  {
    name: 'Home Assistant',
    url: 'https://github.com/home-assistant/home-assistant.io',
    desc: 'Integration documentation',
  },
  {
    name: 'Saule',
    url: 'https://github.com/joukevandermaas/saule',
    desc: 'JSON:API library for .NET',
  },
]
