<template>
  <ul class="aka-blog-posts grid gap-8 items-stretch">
    <li v-for="(edge, index) in posts" :key="edge.node.id">
      <PostCard :index="index" :post="edge.node" />
    </li>
  </ul>
</template>

<script>
import PostCard from '@/components/blog/PostCard'
export default {
  name: 'PostList',
  components: {
    PostCard,
  },
  props: {
    posts: Array,
  },
}
</script>