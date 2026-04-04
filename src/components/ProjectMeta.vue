<template>
  <div class="pmeta">
    <div class="pmeta-row">
      <a
        v-if="github"
        :href="github"
        class="pmeta-gh"
        target="_blank"
        rel="noopener noreferrer"
      >→ {{ linkLabel }}</a>

      <div v-if="tech" class="pmeta-stack" aria-label="Tech stack">
        <span v-for="t in techList" :key="t" class="pmeta-tag">{{ t }}</span>
      </div>

      <span
        v-if="status"
        class="pmeta-status"
        :class="`pmeta-status--${statusClass}`"
      >[{{ status }}]</span>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  github: String,
  tech:   String,
  status: String,
})

const techList = computed(() =>
  props.tech ? props.tech.split(',').map(t => t.trim()) : []
)

const statusClass = computed(() => {
  const s = (props.status || '').toLowerCase()
  if (s === 'active')     return 'active'
  if (s === 'maintained') return 'maintained'
  return 'archived'
})

const linkLabel = computed(() => {
  if (!props.github) return 'View'
  return props.github.includes('github.com') ? 'GitHub' : 'Docs'
})
</script>

<style scoped>
.pmeta {
  margin: 0 0 2rem;
  padding: 0.75rem 0 0.85rem;
  border-top: 1px solid rgba(27, 178, 229, 0.18);
  border-bottom: 1px solid rgba(27, 178, 229, 0.18);
}

.pmeta-row {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.6rem 1.25rem;
}

.pmeta-gh {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.78rem;
  font-weight: 600;
  color: #0b0f1a;
  background: #1bb2e5;
  padding: 0.32rem 0.85rem;
  border-radius: 4px;
  text-decoration: none;
  flex-shrink: 0;
  transition: background 0.15s ease;
}

.pmeta-gh:hover {
  background: #0ea5d4;
  text-decoration: none;
}

.pmeta-stack {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
  flex: 1;
}

.pmeta-tag {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.68rem;
  letter-spacing: 0.03em;
  color: #8b949e;
  background: rgba(27, 178, 229, 0.06);
  border: 1px solid rgba(27, 178, 229, 0.15);
  border-radius: 3px;
  padding: 0.15rem 0.5rem;
}

.pmeta-status {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.65rem;
  letter-spacing: 0.08em;
  flex-shrink: 0;
  margin-left: auto;
}

.pmeta-status--active     { color: #1bb2e5; }
.pmeta-status--maintained { color: #88c0d0; }
.pmeta-status--archived   { color: #484f58; }
</style>
