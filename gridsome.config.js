// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here requires a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = {
  siteName: 'Gridsome Blog Starter',
  siteDescription: 'A simple, hackable & minimalistic starter for Gridsome that uses Markdown for content.',

  templates: {
    GhostPost: '/:title',
    GhostTag: '/tag/:id'
  },

  plugins: [
    {
      use: '@gridsome/source-ghost',
      options: {
        baseUrl: 'http://ghost.sabisu-sama.phyberhome',
        contentKey: `${process.env.GHOST_CONTENT_KEY}`,
        routes: {
          post: '/:slug',
          page: '/:slug'
        }
      }
    }
  ]
}
