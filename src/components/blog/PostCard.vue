  
<template>
  <div
    class="aka-post-card bg-card relative flex flex-col h-full"
    :class="{ 'is-large': isLarge }"
  >
    <div class="post-card-content relative flex flex-col p-6 h-full w-full">
      <div class="post-card-meta font-semibold text-xs leading-tight mb-4">
        <span v-if="post.author"> By: {{ post.author.name }} /</span>
        Posted on: {{ post.publishedAt }}
      </div>
      <g-link
        class="post-card-link inline-flex font-medium text-base px-4 -ml-4"
        :to="postUrl"
      >
        <h2 class="post-card-heading font-bold text-lg leading-tight mb-auto">
          {{ post.title }}
        </h2>
      </g-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PostCard',
  computed: {
    isLarge() {
      return this.index % 3 === 0
    },
    postUrl() {
      return `/blog/${this.post.slug.current}`
    },
  },
  props: {
    post: Object,
    index: Number,
  },
}
</script>