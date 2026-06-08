# phyberapex.de

[![Netlify Status](https://api.netlify.com/api/v1/badges/ce5a7bf0-58b6-4e55-9f36-e1f2d155aa39/deploy-status)](https://app.netlify.com/sites/nervous-booth-d6b845/deploys)
![GitHub License](https://img.shields.io/github/license/phyberapex/phyberapex.de)
![GitHub issues](https://img.shields.io/github/issues/phyberapex/phyberapex.de)
[GitHub commit activity](https://img.shields.io/github/commit-activity/m/phyberapex/phyberapex.de)

This is the repository for my personal website [phyberapex.de](https://phyberapex.de)

## Development

### Analytics Setup

This project uses [Umami](https://umami.is/) for privacy-focused analytics. Analytics is optional and gracefully disabled if not configured.

**Local Development:**
1. Copy `.env.example` to `.env`
2. Add your Umami credentials (or leave empty to disable analytics)
3. Run `pnpm dev`

**Production Deployment:**

Set these environment variables in your hosting platform (Netlify, Vercel, etc.):

- `VITE_UMAMI_SCRIPT_URL` - Your Umami script URL (e.g., `https://analytics.phyberapex.de/script.js`)
- `VITE_UMAMI_WEBSITE_ID` - Your website ID from Umami dashboard

**Verification:**
1. Open browser DevTools → Network tab
2. Look for request to your Umami script URL
3. Check Umami dashboard → Realtime view for pageviews