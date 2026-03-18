# Interactive Project Timeline

## Overview

An interactive 3D timeline visualization that showcases PhyberApex's development journey through time. Built with **VuePress 2** and **D3.js**, this component automatically pulls data from GitHub repositories to create a dynamic, up-to-date visual representation of project history.

![Timeline Preview](./timeline-preview.png)

## Features

- 🎨 **Interactive 3D Visualization**: Smooth curved timeline path with animated nodes
- 🔄 **Auto-Generation**: Automatically fetches latest repository data from GitHub API
- 📱 **Fully Responsive**: Adapts beautifully to mobile, tablet, and desktop screens
- 💬 **Rich Modal Details**: Click any node to see project details, statistics, and code samples
- 🎯 **Smart Icon Mapping**: Different icons based on project type (bot, game, tool, etc.)
- ⚡ **Performance Optimized**: Efficient D3.js rendering with lazy loading

## Tech Stack

- **VuePress 2** - Static site generator
- **D3.js v7** - Data-driven document visualization
- **Vue 3 Composition API** - Reactive component architecture
- **GitHub API v3** - Real-time repository data

## Project Structure

```
docs/
├── timeline.md                 # Main timeline component
└── .vuepress/
    └── public/
        ├── timeline-data.json  # Cached timeline data (auto-generated)
        └── webhook-config.md   # Webhook setup documentation
```

## Installation & Setup

### Prerequisites

- Node.js 16+ 
- pnpm package manager

### Install Dependencies

```bash
cd phyberapex.de
pnpm install
```

Make sure `d3` is listed in your `package.json`:

```json
{
  "devDependencies": {
    "d3": "^7.8.5",
    ...
  }
}
```

### Development

```bash
pnpm dev
```

Visit `http://localhost:8080/timeline` to see the timeline in action.

### Build for Production

```bash
pnpm build
```

## Configuration

### Customizing Colors

Edit the gradient and node colors in `docs/timeline.md`:

```javascript
// Gradient colors (lines 247-253)
gradient.append('stop').attr('stop-color', '#e94560')  // Start color
gradient.append('stop').attr('stop-color', '#0fbcf9')  // Middle color  
gradient.append('stop').attr('stop-color', '#a8ff60')  // End color

// Node colors by language (lines 371-376)
if (d.language === 'TypeScript' || d.language === 'Vue') return '#3178c6'
if (d.language === 'Java') return '#f89820'
if (d.language === 'Python') return '#3572a5'
```

### Adjusting Timeline Density

Limit the number of displayed nodes by modifying line 343:

```javascript
const numNodes = Math.min(timelineData.value.length, 12) // Change 12 to your preferred max
```

### Changing Wave Amplitude

Adjust the vertical wave pattern (line 360):

```javascript
const yOffset = Math.sin(i * Math.PI / (numNodes - 1 || 1)) * 60 // Change 60 for more/less curve
```

## Auto-Update Configuration

### GitHub Actions (Recommended)

The repository includes a scheduled workflow that automatically updates timeline data daily:

**File**: `.github/workflows/update-timeline.yml`

This workflow:
1. Runs every day at midnight UTC
2. Fetches latest repository data from GitHub API
3. Updates `timeline-data.json` in the public directory
4. Commits and pushes changes automatically

### Manual Updates

To manually trigger an update:

```bash
# Navigate to Actions tab on GitHub
# Click "Update Timeline Data" workflow
# Press "Run workflow" button
```

Or run locally:

```bash
node .github/scripts/update-timeline.js
```

## Webhook Integration (Optional)

For real-time updates instead of scheduled runs, you can set up a webhook:

1. Go to your GitHub repository settings
2. Navigate to "Webhooks" → "Add webhook"
3. Configure payload URL to your backend service
4. Select events: Pushes, Pull requests, Releases

See `public/webhook-config.md` for detailed setup instructions.

## Data Sources

The timeline pulls from multiple sources:

### Primary Source: GitHub API

- Repository name and description
- Creation and update dates
- Programming language
- Star count and fork count
- License information

### Future Enhancements

Potential additional data sources:

- **Blog Posts**: Parse markdown files in `/docs/blog/` for content milestones
- **Commit History**: Fetch commit frequency and contribution graphs
- **Release Tags**: Highlight major version releases on the timeline
- **Pull Requests**: Show merged PRs as individual events

## Customization Examples

### Adding Multimedia Support

To add video embeds or code samples to specific projects:

```javascript
// In the openModal function, add custom data for each project
const customContent = {
    'hibiki': {
        demoVideo: 'https://youtube.com/embed/your-video-id',
        codeSnippet: `// Hibiki Discord Bot Example
const musicPlayer = new MusicBot({
    prefix: '!',
    commands: ['play', 'skip', 'queue']
});`
    }
}

// Then conditionally render in modal
if (customContent[selectedProject.value.title]) {
    // Render custom content
}
```

### Adding Project Categories

Enhance the icon mapping with categories:

```javascript
function getRepoIcon(repoName, repoData) {
    const categories = {
        bot: ['bot', 'discord', 'telegram'],
        game: ['game', 'league', 'lol'],
        music: ['audio', 'music', 'sound'],
        tool: ['tool', 'utility', 'cli'],
        schema: ['schema', 'json', 'validator']
    }
    
    for (const [category, keywords] of Object.entries(categories)) {
        if (keywords.some(k => repoName.toLowerCase().includes(k))) {
            return getEmojiForCategory(category)
        }
    }
    return '💻' // Default
}

function getEmojiForCategory(category) {
    const emojis = {
        bot: '🤖',
        game: '🎮', 
        music: '🎵',
        tool: '🔧',
        schema: '📊'
    }
    return emojis[category] || '💻'
}
```

## Performance Considerations

- **Node Limit**: Default max of 12 nodes prevents overcrowding on smaller screens
- **Lazy Loading**: Data fetched only when component mounts
- **Resize Debouncing**: SVG re-renders optimized with ResizeObserver
- **D3 Selection Efficiency**: Uses data-driven enter/update/exit pattern

## Accessibility

- Semantic HTML structure
- Keyboard navigation support (Enter/Space to open modal)
- Escape key closes modal
- Focus management in modal dialogs
- Screen reader friendly labels

## Troubleshooting

### Timeline Not Rendering

1. Check browser console for errors
2. Verify D3.js is installed: `pnpm list d3`
3. Ensure VuePress dev server has fully loaded
4. Clear browser cache and reload

### GitHub API Rate Limiting

The public GitHub API has a rate limit of 60 requests/hour for unauthenticated requests. If you hit this limit:

1. Add GitHub token to environment variables
2. Use authenticated requests:
   ```javascript
   const response = await fetch('https://api.github.com/users/PhyberApex/repos...', {
       headers: { 'Authorization': `token ${process.env.GITHUB_TOKEN}` }
   })
   ```

### Nodes Not Appearing

- Verify data is being fetched correctly (check network tab)
- Ensure repository descriptions exist (filtered out if empty)
- Check that the timeline container has proper dimensions

## Contributing

When adding new projects:

1. Push code to GitHub with a descriptive commit message
2. Wait for next scheduled update or manually trigger workflow
3. Timeline will automatically reflect the change

### Best Practices

- Write clear, concise repository descriptions
- Use consistent naming conventions
- Add appropriate topics/tags to repositories
- Keep documentation up-to-date in README files

## Future Roadmap

- [ ] Add 3D perspective using Three.js for enhanced depth
- [ ] Implement drag-and-drop node reordering
- [ ] Add filtering by year range or technology stack
- [ ] Support for personal blog post integration
- [ ] Export timeline as interactive HTML/PDF
- [ ] Dark/light theme toggle for timeline colors
- [ ] Animated transitions between time periods

## License

MIT License - See [LICENSE](../../LICENSE) for details.

---

**Code speaks louder than words.** (ง・ω・)ง

Built with ❤️ by PhyberApex | Part of the PhyberApex Homelab ecosystem
