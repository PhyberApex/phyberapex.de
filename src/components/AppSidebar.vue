<template>
  <aside class="sidebar" :aria-label="`${group} navigation`">
    <div class="sidebar-group-label">{{ groupLabel }}</div>
    <nav>
      <router-link
        v-for="link in links"
        :key="link.path"
        :to="link.path"
        class="sidebar-link"
        active-class="sidebar-link--active"
      >{{ link.text }}</router-link>
    </nav>
  </aside>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  group: {
    type: String,
    required: true,
  },
})

const SIDEBAR_GROUPS = {
  projects: {
    label: 'Projects',
    links: [
      { text: 'All Projects',        path: '/projects' },
      { text: 'Hibiki',              path: '/projects/hibiki' },
      { text: 'Kuroshiro',           path: '/projects/kuroshiro' },
      { text: 'SLDS Schema Renderer', path: '/projects/slds-schema-renderer' },
      { text: 'KnowledgeNG',         path: '/projects/knowledgeng' },
      { text: 'Diary of Legends',    path: '/projects/diary-of-legends' },
      { text: 'LobbyBinghoe',        path: '/projects/lobbybinghoe' },
      { text: 'LoL API Wrapper',     path: '/projects/lol-api-wrapper' },
      { text: 'Lightning Talks',     path: '/projects/lightning-talks' },
    ],
  },
  interests: {
    label: 'Interests',
    links: [
      { text: 'Gaming',            path: '/interests/gaming' },
      { text: 'Vinyl Collection',  path: '/interests/vinyl' },
      { text: 'Miniature Painting', path: '/interests/miniatures' },
    ],
  },
}

const groupLabel = computed(() => SIDEBAR_GROUPS[props.group]?.label ?? '')
const links = computed(() => SIDEBAR_GROUPS[props.group]?.links ?? [])
</script>

<style scoped>
.sidebar {
  width: 220px;
  flex-shrink: 0;
  background: var(--color-bg-alt);
  border-right: 1px solid var(--color-border-subtle);
  padding: 1.25rem 0;
  position: sticky;
  top: var(--navbar-height);
  height: calc(100vh - var(--navbar-height));
  overflow-y: auto;
}

.sidebar-group-label {
  font-family: var(--font-mono);
  font-size: 0.64rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--color-accent);
  font-weight: 600;
  opacity: 0.8;
  padding: 0 0.9rem 0.5rem;
}

.sidebar-link {
  display: block;
  font-family: var(--font-mono);
  font-size: 0.78rem;
  font-weight: 400;
  color: var(--color-text-muted);
  text-decoration: none;
  padding: 0.28rem 0.9rem;
  margin: 0.06rem 0.35rem;
  border-radius: 3px;
  border-left: 2px solid transparent;
  transition: color 0.15s ease, background 0.15s ease;
}

.sidebar-link:hover {
  color: var(--color-text-2);
  background: rgba(27, 178, 229, 0.05);
}

.sidebar-link--active {
  color: var(--color-accent) !important;
  background: rgba(27, 178, 229, 0.09);
  border-left-color: var(--color-accent);
  font-weight: 500;
}

@media (max-width: 768px) {
  .sidebar {
    display: none;
  }
}
</style>
