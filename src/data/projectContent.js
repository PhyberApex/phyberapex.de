export const PROJECT_CONTENT = {
  karakuri: {
    title: 'Karakuri',
    github: 'https://karakuri.phyberapex.de/docs/',
    tech: 'Vue 3, NestJS, Socket.IO, Docker',
    status: 'active',
    intro: 'からくり — mechanical puppet. Homelab dashboard that turns a Raspberry Pi into an AI workshop. Manages llama-server for LLM inference, Qwen3-TTS for voice synthesis, and ComfyUI for image generation. Live monitoring of CPU, RAM, and VRAM. An animated PNGTuber avatar speaks via AI-generated voice and reacts to system state. Built for tinkering.',
    sections: [
      {
        type: 'features',
        heading: 'What it does',
        items: [
          'Manual GPU service control — start, stop, restart AI services subject to VRAM limits',
          'Real-time system monitoring: CPU, RAM, VRAM, disk usage',
          'Model management — browse HuggingFace, search CivitAI, download models via multiple protocols',
          'Load and unload GGUF models via llama-server router mode',
          'Image generation UI with ComfyUI workflow triggers and output gallery',
          'TTS voice synthesis with Qwen3-TTS and Kokoro fallback',
          'Live per-service log streaming with filters and auto-scroll',
          'Animated PNGTuber avatar with 15+ emotional states, TTS lip-sync, and inference-driven reactions',
          'Telegram and Discord messaging integration',
        ],
      },
      {
        type: 'stack',
        heading: "How it's built",
        items: [
          'Vue 3 + TypeScript frontend with scoped styles and CSS custom properties',
          'NestJS backend with Socket.IO for real-time status updates',
          'Dockerode wraps Docker Engine API for container orchestration',
          'nvidia-smi integration for VRAM monitoring',
          'PixiJS and pixi-live2d-display for animated avatar rendering',
          'WebSocket composables pattern for shared state management',
        ],
      },
      {
        type: 'reflection',
        heading: 'What I learned',
        items: [
          'Real-time dashboards need careful state management — WebSocket reconnection logic, stale data handling, and optimistic UI updates matter more than you think.',
          'Building for yourself means you can prioritize personality over polish. The avatar turned a monitoring tool into something with character.',
          'Docker API abstraction via Dockerode is powerful but opinionated — understanding the raw Engine API helped debug edge cases.',
        ],
      },
    ],
  },

  hibiki: {
    title: 'Hibiki',
    github: 'https://github.com/PhyberApex/hibiki',
    tech: 'Electron, Vue 3, TypeScript, Discord.js',
    status: 'active',
    intro: 'Grouvee, Spotify, and YouTube Music all had what I needed — except they cost money after the free tier. So I spent evenings building a Discord bot that runs as a desktop app, costs nothing to operate, and has a Vue 3 interface for managing it. The Electron wrapper was the over-engineering part. Worth it.',
    sections: [
      {
        type: 'features',
        heading: 'What it does',
        items: [
          'Music playback in Discord voice channels via slash commands',
          'Electron desktop app with Vue 3 interface for player control',
          'Cross-platform (Windows, macOS, Linux) with native installers',
          'JSON file-based state persistence for configuration and playlists',
          'Web Audio API integration for browser-based audio capture',
          'Guild and channel management from the desktop UI',
        ],
      },
      {
        type: 'stack',
        heading: "How it's built",
        items: [
          'Electron desktop application with Vue 3 frontend',
          'Discord.js for bot commands and voice channel management',
          'TypeScript across the entire codebase for type safety',
          'Vite for fast development builds and HMR',
          'Electron Forge for packaging and distribution',
          'JSON file storage for persistent state',
        ],
      },
    ],
  },

  kuroshiro: {
    title: 'Kuroshiro',
    github: 'https://github.com/PhyberApex/kuroshiro',
    tech: 'NestJS, Vue 3, PostgreSQL, Docker',
    status: 'active',
    intro: "TRMNL's cloud service is fine until you notice your device is phoning home to a server in Oregon for every screen refresh. So I self-hosted it. The first weekend produced something barely functional. The following months turned it into something I'd actually recommend to others: auto-provisioning, full device management, virtual mode for testing without hardware.",
    sections: [
      {
        type: 'features',
        heading: 'What it does',
        items: [
          'Plug-and-play self-hosting via Docker',
          'Auto-provisioning of new devices on first connection',
          'Full device management — rename, reset, refresh rate control',
          'Live insights: battery, WiFi signal, firmware version, screen previews',
          'Mirroring support for official TRMNL screens',
          'Multiple screen types: uploaded image, linked URL, or custom HTML',
          'Virtual device mode for testing without physical hardware',
          'HTML screen preview and templating with the TRMNL framework',
        ],
      },
      {
        type: 'stack',
        heading: "How it's built",
        items: [
          'NestJS API handles device communication, provisioning, and plugin serving',
          'Vue 3 dashboard for device management and screen configuration',
          'PostgreSQL for device state, screen history, and plugin registry',
          'Imagemagick for image processing and ePaper-format conversion',
          'Docker Compose setup for one-command deployment',
        ],
      },
    ],
  },

  'slds-schema-renderer': {
    title: 'SLDS JSON Schema Renderer',
    github: 'https://github.com/PhyberApex/slds-json-schema-renderer',
    tech: 'Node.js, TypeScript, Vue 3, SLDS',
    status: 'maintained',
    intro: 'Internal Salesforce tooling that solved a real problem: teams generating JSON Schemas had no way to share browsable documentation without writing HTML by hand. Point the CLI at a directory of schema files, get a hosted reference that non-engineers can actually read. Went from idea to npm package in one sprint.',
    sections: [
      {
        type: 'features',
        heading: 'What it does',
        items: [
          'Parses and validates JSON Schema files automatically',
          'Generates static HTML you can host anywhere — GitHub Pages, S3, Netlify',
          'Vue 3 component-driven rendering with SLDS styling',
          'Direct SLDS SVG icon use for fast load times',
          'Simple CLI interface, designed for CI integration or local dev workflows',
        ],
      },
      {
        type: 'stack',
        heading: "How it's built",
        items: [
          'Node.js + TypeScript CLI handles schema parsing and validation',
          'Vue 3 renders the interactive documentation frontend',
          'Salesforce Lightning Design System provides the component library',
          'Static output — no server required after generation',
          'Distributed via npm for easy installation in any project',
        ],
      },
    ],
  },

  knowledgeng: {
    title: 'KnowledgeNG',
    github: 'https://github.com/PhyberApex/Knowledge-NG',
    tech: 'Java, SVN',
    status: 'archived',
    intro: 'First real project. Needed a local, offline wiki for personal notes before Notion existed and before Obsidian was a concept. Built it in Java because that was what I knew. Learned more from shipping this than from the three projects before it combined — including the lesson that someone will eventually build what you need better than you can.',
    sections: [
      {
        type: 'features',
        heading: 'What it did',
        items: [
          'Local wiki creation and management',
          'Offline-first personal knowledge base',
          'User-editable interface for organizing notes',
        ],
      },
      {
        type: 'reflection',
        heading: 'What I learned',
        items: [
          "Act on new tech as soon as you learn it. Don't let ideas sit.",
          'This project led directly to every side project since — including the ones that actually got used.',
        ],
      },
    ],
  },

  'diary-of-legends': {
    title: 'Diary of Legends',
    github: 'https://github.com/PhyberApex/diary-of-legends',
    tech: 'Java, Elophant API',
    status: 'archived',
    intro: 'A Java desktop app for tracking League of Legends match history and matchup notes. Archived when the Elophant API shut down — a lesson in third-party dependency risk learned before I knew what that phrase meant. Less about the game, more about learning Model-View-Presenter and OOP patterns under real conditions.',
    sections: [
      {
        type: 'features',
        heading: 'What it did',
        items: [
          'Match history tracking and personal notation',
          'Matchup data and performance statistics',
          'Local storage of game records between sessions',
        ],
      },
      {
        type: 'reflection',
        heading: 'What I was exploring',
        items: [
          'Testing different software engineering patterns — Model-View-Presenter, separation of concerns, OOP principles.',
          'Less about the game, more about the patterns.',
        ],
      },
    ],
  },

  lobbybinghoe: {
    title: 'LobbyBinghoe',
    github: 'https://github.com/PhyberApex/LobbyBinghoe',
    tech: 'Vue 3, TypeScript, Supabase, Netlify',
    status: 'archived',
    intro: 'Bingo web app for fans of a German podcast — built for a specific friend, discovered by strangers. An excuse to try Supabase for real-time state, which it handled well. The community did not adopt it. Shipped, learned, moved on.',
    sections: [
      {
        type: 'features',
        heading: 'What it does',
        items: [
          'Interactive bingo board synced in real time',
          'Supabase backend for board state and (planned) user management',
          'Deployed on Netlify',
        ],
      },
      {
        type: 'reflection',
        heading: 'What I was exploring',
        items: [
          'First real project with Supabase.',
          'Wanted to push further into real-time features and user management — the community adoption question was answered before I got there.',
        ],
      },
    ],
  },

  'lol-api-wrapper': {
    title: 'League of Legends API Wrapper',
    github: 'https://github.com/PhyberApex/lol-api',
    tech: 'Java',
    status: 'archived',
    intro: 'Java wrapper for the Riot Games API, written before discovering the community had already written twelve of them. The official API client arrived shortly after. Archived without regret — the point was learning API design patterns, not shipping a library that anyone would use.',
    sections: [
      {
        type: 'features',
        heading: 'What it did',
        items: [
          'Java interface for querying League of Legends match and player data',
          'Handled authentication, rate limiting, and response parsing',
          'Covered game statistics and match history endpoints',
        ],
      },
    ],
  },

  'lightning-talks': {
    title: 'Lightning Talks',
    github: 'https://github.com/PhyberApex/lightning-talks',
    tech: 'Slidev, Vue',
    status: 'active',
    intro: 'Short technical talks on security, frontend patterns, and tooling — delivered at internal Salesforce knowledge-sharing sessions. Built with Slidev so the slides are Vue components, which means live-coding demos mid-presentation are a first-class feature rather than a workaround.',
    sections: [],
    outroHtml: 'An overview of all talks is available <a href="https://phyberapex.github.io/lightning-talks/" target="_blank" rel="noopener noreferrer">here</a>.',
  },
}
