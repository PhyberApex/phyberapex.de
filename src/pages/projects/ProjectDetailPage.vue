<template>
  <div class="pd-page">
    <div v-if="content">
      <!-- Header -->
      <div class="pd-header">
        <div class="pd-back-row">
          <span class="pd-rule-line" aria-hidden="true"></span>
          <router-link to="/projects" class="pd-back">← all projects</router-link>
          <span class="pd-rule-line" aria-hidden="true"></span>
        </div>
        <h1 class="pd-title">{{ content.title }}</h1>
        <ProjectMeta
          :github="content.github"
          :tech="content.tech"
          :status="content.status"
        />
      </div>

      <!-- Intro -->
      <div class="pd-intro-wrap">
        <hr class="pd-rule" />
        <p class="pd-intro">{{ content.intro }}</p>
        <hr class="pd-rule" />
      </div>

      <!-- Sections -->
      <div class="pd-sections">
        <section
          v-for="section in content.sections"
          :key="section.heading"
          class="pd-section"
          :class="`pd-section--${section.type ?? 'features'}`"
        >
          <h2 class="pd-section-heading">
            <span class="pd-section-icon" aria-hidden="true">{{ section.type === 'stack' ? '⊞' : section.type === 'reflection' ? '◎' : '▸' }}</span>
            {{ section.heading }}
            <span class="pd-heading-rule" aria-hidden="true"></span>
          </h2>
          <ul class="pd-section-list">
            <li v-for="item in section.items" :key="item" class="pd-section-item">
              {{ item }}
            </li>
          </ul>
        </section>
      </div>

      <!-- Outro -->
      <p v-if="content.outroHtml" class="pd-outro" v-html="content.outroHtml"></p>
    </div>

    <div v-else class="pd-not-found">
      <div class="pd-back-row">
        <span class="pd-rule-line" aria-hidden="true"></span>
        <router-link to="/projects" class="pd-back">← all projects</router-link>
        <span class="pd-rule-line" aria-hidden="true"></span>
      </div>
      <h1 class="pd-title">Project not found</h1>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { PROJECT_CONTENT } from '../../data/projectContent.js'
import ProjectMeta from '../../components/ProjectMeta.vue'

const route = useRoute()
const content = computed(() => PROJECT_CONTENT[route.params.slug] ?? null)
</script>

<style scoped>
.pd-page {
  background-color: var(--color-bg);
  min-height: calc(100vh - var(--navbar-height));
  padding: 2.5rem 2rem 4rem;
}

/* ── Header ── */
.pd-header {
  margin-bottom: 2rem;
}

.pd-back-row {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
}

.pd-rule-line {
  flex: 1;
  height: 1px;
  background: var(--color-border);
}

.pd-back {
  color: var(--color-text-3);
  text-decoration: none;
  white-space: nowrap;
  font-family: var(--font-mono);
  font-size: 0.72rem;
  letter-spacing: 0.05em;
  transition: color 0.15s ease;
}

.pd-back:hover { color: var(--color-accent); }

.pd-title {
  font-family: var(--font-mono);
  font-size: 1.9rem;
  font-weight: 700;
  color: var(--color-text-1);
  margin: 0 0 1.25rem;
  letter-spacing: -0.02em;
  line-height: 1.2;
}

/* ── Intro (ruled serif paragraph) ── */
.pd-intro-wrap {
  margin: 0 0 2.5rem;
}

.pd-rule {
  border: none;
  height: 1px;
  background: linear-gradient(to right, transparent, var(--color-border), transparent);
  margin: 0;
}

.pd-intro {
  font-family: var(--font-serif);
  font-size: 1.05rem;
  line-height: 1.8;
  color: var(--color-text-1);
  margin: 1.5rem 0;
  font-style: italic;
}

/* ── Sections ── */
.pd-sections {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.pd-section {
  /* No border, no background box — content flows on the page */
}

.pd-section-heading {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: var(--font-mono);
  font-size: 0.78rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  margin: 0 0 0.85rem;
}

.pd-heading-rule {
  flex: 1;
  height: 1px;
  background: linear-gradient(to right, rgba(27, 178, 229, 0.15), transparent);
}

.pd-section-icon { opacity: 0.7; }

/* "What it does" — features section */
.pd-section--features .pd-section-heading {
  color: var(--color-accent);
}

.pd-section--features .pd-section-list {
  list-style: none;
  margin: 0;
  padding: 0;
  border-left: 2px solid rgba(27, 178, 229, 0.2);
  padding-left: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.pd-section--features .pd-section-item {
  font-family: var(--font-serif);
  font-size: 0.925rem;
  color: var(--color-text-2);
  line-height: 1.55;
  position: relative;
  padding-left: 1.4rem;
}

.pd-section--features .pd-section-item::before {
  content: '✓';
  position: absolute;
  left: 0;
  color: #56d364;
  font-family: var(--font-mono);
  font-size: 0.75rem;
  top: 0.12rem;
}

/* "How it's built" — stack section */
.pd-section--stack .pd-section-heading {
  color: var(--color-text-2);
}

.pd-section--stack .pd-section-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.pd-section--stack .pd-section-item {
  font-family: var(--font-mono);
  font-size: 0.82rem;
  color: var(--color-text-2);
  line-height: 1.6;
  padding-left: 1.4rem;
  position: relative;
}

.pd-section--stack .pd-section-item::before {
  content: '▸';
  position: absolute;
  left: 0;
  color: var(--color-accent);
  font-size: 0.7rem;
  top: 0.15rem;
}

/* "Reflection / What I learned" section */
.pd-section--reflection .pd-section-heading {
  color: var(--color-text-3);
}

.pd-section--reflection .pd-section-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.pd-section--reflection .pd-section-item {
  font-family: var(--font-serif);
  font-size: 0.925rem;
  color: var(--color-text-2);
  line-height: 1.6;
  padding-left: 1.4rem;
  position: relative;
  font-style: italic;
}

.pd-section--reflection .pd-section-item::before {
  content: '◎';
  position: absolute;
  left: 0;
  color: var(--color-text-3);
  font-size: 0.65rem;
  top: 0.2rem;
}

/* ── Outro ── */
.pd-outro {
  margin-top: 2.5rem;
  font-family: var(--font-serif);
  font-size: 0.925rem;
  color: var(--color-text-2);
  line-height: 1.65;
  padding: 1rem 1.25rem;
  border-left: 2px solid var(--color-border);
}

.pd-outro :deep(a) {
  color: var(--color-accent);
  text-decoration: none;
}

.pd-outro :deep(a):hover {
  text-decoration: underline;
}

/* ── Not found ── */
.pd-not-found .pd-title {
  color: var(--color-text-3);
}
</style>
