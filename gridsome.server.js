// Server API makes it possible to hook into various parts of Gridsome
// on server-side and add custom data to the GraphQL data layer.
// Learn more: https://gridsome.org/docs/server-api/

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`
const dataStore = require('./data-store')
const {
  createPagesQuery,
  createPagesWithPagination,
} = require('./src/utils/createPages')

module.exports = function (api) {
  // fix Type with name "SanityDocument" does not exists error
  api.createSchema(({ addSchemaTypes }) => {
    addSchemaTypes(`
      type SanityDocument implements Node @infer {
        id: ID!
      }
    `)
  })
  api.loadSource( store => {
        // Use the Data store API here: https://gridsome.org/docs/data-store-api
        store.addMetadata('sanityOptions', dataStore.sanity)
  })

  api.createPages(async ({ graphql, createPage }) => {
    const { data } = await graphql(createPagesQuery)

    const allSanityPosts = data.allSanityPost.edges

    createPagesWithPagination({
      edges: allSanityPosts,
      component: './src/templates/Post.vue',
      path: 'blog',
      createPage,
    })
  })
}
