# Webhook Configuration for Auto-Generated Timeline

This directory contains webhook configurations for automatically updating the project timeline.

## Setup Instructions

### GitHub Webhook

1. Go to your repository settings on GitHub
2. Navigate to "Webhooks" → "Add webhook"
3. Configure the following:
   - **Payload URL**: `https://your-domain.com/api/webhook` (you'll need a backend service)
   - **Content type**: `application/json`
   - **Secret**: Generate a secure random string and store it securely
   - **Events**: Select "Let me select individual events" and choose:
     - Pushes
     - Pull requests
     - Releases

### Alternative: Scheduled Updates

For simpler setups without a backend, use GitHub Actions to periodically fetch and update timeline data:

1. Create `.github/workflows/update-timeline.yml` in your repository
2. The workflow will run daily and commit any updates to the timeline markdown files

See `update-timeline-action.yml.example` for a template.

## Auto-Generation Features

The timeline automatically pulls data from:
- GitHub API (repository metadata, creation dates, languages)
- Local project documentation (markdown files in `/docs/projects/`)
- Blog posts (if you add them to the site)

### Data Sources

1. **GitHub Repositories**: 
   - Repository name and description
   - Creation and update dates
   - Programming language
   - Star count and fork count
   - License information

2. **Local Projects**:
   - Project descriptions from markdown frontmatter
   - Custom metadata defined in each project file

## Manual Updates

If you prefer manual control, simply edit the timeline data in `docs/timeline.md` or add metadata comments to your project markdown files:

```markdown
---
title: My Project
timeline:
  category: development
  highlights:
    - "Implemented feature X"
    - "Reached 100 stars on GitHub"
---
```

## Security Notes

- Never commit webhook secrets to the repository
- Use environment variables for sensitive data
- Validate webhook payloads before processing
- Implement rate limiting to prevent abuse
