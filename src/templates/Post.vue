<template>
  <Layout>
    <div class="aka-blog-post">
      <article>
        <header class="mb-8">
          <h1
            class="font-black text-3xl leading-tight xl:text-center xl:text-5xl"
          >
            {{ $page.post.title }}
          </h1>
        </header>

        <div class="blog-post-content container p-0">
          <div class="blog-post-meta font-semibold text-sm mb-4 text-gray">
            <span v-if="$page.post.author"
              >By: {{ $page.post.author.name }} /</span
            >
            Posted on: {{ $page.post.publishedAt }}
          </div>
          <BlockContent :blocks="$page.post._rawBody" />
          <PostPagination :next="$page.nextPost" :prev="$page.prevPost" />
        </div>
      </article>
    </div>
  </Layout>
</template>

<page-query>
  query Post ($id: ID!, $nextID: ID!, $prevID: ID!) {

    post: sanityPost (id: $id) {
      author {
        name
      }
      title
      publishedAt(format: "MMMM D, YYYY")
      _rawBody
    }

    nextPost: sanityPost (id: $nextID) {
      slug {
        current
      }
      title
    }

    prevPost: sanityPost (id: $prevID) {
      slug {
        current
      }
      title
    }
  }
</page-query>

<script>
import BlockContent from '@/components/BlockContent'
import PostPagination from '@/components/blog/PostPagination'
export default {
  name: 'Post',
  components: {
    BlockContent,
    PostPagination,
  },
  metaInfo() {
    return {
      title: this.$page.post.title,
    }
  },
}
</script>