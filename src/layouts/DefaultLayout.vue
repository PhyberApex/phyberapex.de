<template>
  <div class="layout-root">
    <AppNavbar />
    <div class="layout-body" :class="{ 'layout-body--with-sidebar': hasSidebar }">
      <AppSidebar v-if="hasSidebar" :group="route.meta.sidebar" />
      <main class="layout-main">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import AppNavbar from '../components/AppNavbar.vue'
import AppSidebar from '../components/AppSidebar.vue'

const route = useRoute()
const hasSidebar = computed(() => route.meta.sidebar !== false && route.meta.sidebar != null)
</script>

<style scoped>
.layout-root {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.layout-body {
  flex: 1;
  display: flex;
}

.layout-main {
  flex: 1;
  min-width: 0;
}
</style>
