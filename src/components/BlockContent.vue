<template>
  <PortableText
    v-if="hasBlocks"
    :blocks="blocks"
    :projectId="$static.metadata.sanityOptions.projectId"
    :dataset="$static.metadata.sanityOptions.dataset"
  />
</template>

<static-query>
  {
    metadata {
      sanityOptions {
        projectId
        dataset
      }
    }
  }
</static-query>

<script>
import PortableText from 'sanity-blocks-vue-component'
export default {
  props: {
    blocks: Array,
  },
  components: {
    PortableText,
  },
  computed: {
    hasBlocks() {
      return this.blocks && this.blocks.length
    },
  },
}
</script>