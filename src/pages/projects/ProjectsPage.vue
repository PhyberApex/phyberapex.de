<template>
  <div class="pm-root">

    <!-- Masthead rule -->
    <div class="pm-masthead" aria-hidden="true">
      <span class="pm-deco">◈</span>
      <span class="pm-rule-line"></span>
      <span class="pm-rule-label">project manifest</span>
      <span class="pm-rule-line"></span>
      <span class="pm-deco">◈</span>
    </div>

    <!-- Project entries -->
    <ol class="pm-list" aria-label="Projects">
      <li
        v-for="(project, i) in PROJECTS"
        :key="project.slug"
        class="pm-entry"
        :class="{ 'pm-entry--featured': project.featured, [`pm-entry--${project.status}`]: true }"
        :style="{ '--delay': `${i * 55}ms` }"
      >
        <router-link :to="`/projects/${project.slug}`" class="pm-link">

          <span class="pm-idx" aria-hidden="true">{{ String(i + 1).padStart(3, '0') }}.</span>

          <div class="pm-body">
            <div class="pm-namerow">
              <h2 class="pm-name">{{ project.name }}</h2>
              <span class="pm-status" :class="`pm-status--${project.status}`">{{ STATUS_LABELS[project.status] }}</span>
            </div>

            <p class="pm-tagline">{{ project.tagline }}</p>

            <p v-if="project.featured && project.detail" class="pm-detail">{{ project.detail }}</p>

            <div class="pm-stack" aria-label="Tech stack">
              <span v-for="(tech, j) in project.stack" :key="tech">
                <span v-if="j > 0" class="pm-sep" aria-hidden="true"> · </span>{{ tech }}
              </span>
            </div>
          </div>

        </router-link>
      </li>
    </ol>

    <!-- Open-source contributions -->
    <section class="pm-oss" aria-labelledby="pm-oss-heading">
      <h2 class="pm-oss-heading" id="pm-oss-heading">
        <span class="pm-oss-icon" aria-hidden="true">◎</span>
        open source contributions
        <span class="pm-oss-rule" aria-hidden="true"></span>
      </h2>
      <ul class="pm-oss-list">
        <li v-for="c in CONTRIB" :key="c.name" class="pm-oss-entry">
          <a :href="c.url" class="pm-oss-link" target="_blank" rel="noopener noreferrer">{{ c.name }}</a>
          <span class="pm-oss-desc"> — {{ c.desc }}</span>
        </li>
      </ul>
    </section>

    <!-- Footer divider -->
    <div class="pm-footer-divider" aria-hidden="true"></div>

  </div>
</template>

<script setup>
import { PROJECTS, CONTRIB, STATUS_LABELS } from '../../data/projects.js'
</script>

<style scoped>
/* ── Root ── */
.pm-root {
  padding: 0 0 2rem;
}

/* ── Masthead rule ── */
.pm-masthead {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.5rem 0 1.5rem;
  font-family: 'JetBrains Mono', 'Fira Code', monospace;
  font-size: 0.6rem;
  letter-spacing: 0.22em;
  color: var(--color-accent);
  text-transform: uppercase;
}

.pm-footer-divider {
  margin-top: 2rem;
  height: 1px;
  background: linear-gradient(to right, transparent, var(--color-border), transparent 90%);
}

.pm-rule-line {
  flex: 1;
  height: 1px;
  background: linear-gradient(to right, transparent, rgba(27, 178, 229, 0.25), transparent 90%);
}

.pm-deco { flex-shrink: 0; opacity: 0.55; }
.pm-rule-label { flex-shrink: 0; }

/* ── OSS section header ── */
.pm-oss {
  margin-top: 3rem;
}

.pm-oss-heading {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.78rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  margin: 0 0 1rem;
  color: var(--color-text-3);
}

.pm-oss-icon {
  opacity: 0.7;
}

.pm-oss-rule {
  flex: 1;
  height: 1px;
  background: linear-gradient(to right, rgba(27, 178, 229, 0.15), transparent);
}

/* ── Project list ── */
.pm-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
}

.pm-entry {
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  border-radius: 3px;
  animation: pm-enter 0.45s cubic-bezier(0.22, 1, 0.36, 1) both;
  animation-delay: var(--delay, 0ms);
}

@keyframes pm-enter {
  from { opacity: 0; transform: translateY(10px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* ── Entry link (full-row clickable) ── */
.pm-link {
  display: flex;
  align-items: baseline;
  gap: 0.75rem;
  padding: 1.1rem 0.5rem 1.1rem 0;
  text-decoration: none;
  position: relative;
  overflow: hidden;
  transition: background 0.2s ease;
  border-radius: 3px;
  margin: 0 -0.5rem;
  padding-left: 0.5rem;
}

/* Scan-line sweep on hover */
.pm-link::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, transparent 0%, rgba(27, 178, 229, 0.055) 50%, transparent 100%);
  height: 200%;
  top: -100%;
  transition: top 0.55s cubic-bezier(0.22, 1, 0.36, 1);
  pointer-events: none;
}

.pm-link:hover::before { top: 100%; }
.pm-link:hover .pm-name { color: var(--color-accent); }
.pm-link:hover .pm-arrow { transform: translateX(5px); }

/* ── Entry index number ── */
.pm-idx {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.65rem;
  font-weight: 400;
  color: var(--color-text-3);
  flex-shrink: 0;
  width: 2.8rem;
  padding-top: 0.22rem;
  letter-spacing: 0.06em;
  user-select: none;
}

/* ── Entry body ── */
.pm-body {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

/* ── Name row ── */
.pm-namerow {
  display: flex;
  align-items: baseline;
  gap: 0.75rem;
  flex-wrap: wrap;
}

h2.pm-name {
  font-family: 'JetBrains Mono', 'Fira Code', monospace;
  font-size: clamp(1.05rem, 2.2vw, 1.35rem);
  font-weight: 600;
  letter-spacing: -0.02em;
  line-height: 1.2;
  color: var(--color-text-1);
  margin: 0;
  padding: 0;
  border: none;
  transition: color 0.18s ease;
}

.pm-entry--featured {
  background: rgba(27, 178, 229, 0.03);
  border-radius: 3px;
}

.pm-entry--featured .pm-link {
  padding-top: 1.5rem;
  padding-bottom: 1.5rem;
  padding-left: 1rem;
  border-left: 2px solid rgba(27, 178, 229, 0.2);
}

.pm-entry--featured h2.pm-name {
  font-size: clamp(1.15rem, 2.5vw, 1.5rem);
}

/* ── Status label ── */
.pm-status {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.62rem;
  letter-spacing: 0.08em;
  flex-shrink: 0;
  white-space: nowrap;
}

.pm-status--active     { color: var(--color-accent); }
.pm-status--maintained { color: #88c0d0; }
.pm-status--archived   { color: var(--color-text-3); opacity: 0.6; }

/* ── Tagline ── */
.pm-tagline {
  font-family: Georgia, 'Times New Roman', serif;
  font-size: 0.875rem;
  font-weight: 400;
  color: var(--color-text-2);
  line-height: 1.6;
  margin: 0;
}

/* ── Detail (featured projects only) ── */
.pm-detail {
  font-family: Georgia, 'Times New Roman', serif;
  font-size: 0.86rem;
  font-weight: 400;
  color: var(--color-text-2);
  line-height: 1.65;
  margin: 0.1rem 0 0;
  opacity: 0.85;
}

/* ── Tech stack ── */
.pm-stack {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.7rem;
  color: var(--color-text-3);
  margin-top: 0.35rem;
  letter-spacing: 0.02em;
  line-height: 1.5;
}

.pm-sep {
  color: var(--color-text-muted);
  opacity: 0.6;
}


/* ── OSS contributions list ── */
.pm-oss-list {
  list-style: none;
  padding: 0 0 0 1rem;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
  border-left: 2px solid rgba(27, 178, 229, 0.15);
}

.pm-oss-entry {
  line-height: 1.6;
}

.pm-oss-link {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.8rem;
  color: var(--color-text-1);
  text-decoration: underline;
  text-underline-offset: 3px;
  text-decoration-thickness: 1px;
  text-decoration-color: rgba(27, 178, 229, 0.35);
  transition: color 0.15s ease, text-decoration-color 0.15s ease;
}

.pm-oss-link:hover {
  color: var(--color-accent);
  text-decoration-color: var(--color-accent);
}

.pm-oss-desc {
  font-family: Georgia, 'Times New Roman', serif;
  font-size: 0.84rem;
  color: var(--color-text-3);
}

/* ── Archived entries: visually de-emphasized ── */
.pm-entry--archived h2.pm-name { color: var(--color-text-3); }
.pm-entry--archived .pm-tagline,
.pm-entry--archived .pm-stack {
  opacity: 0.6;
}
.pm-entry--archived:hover h2.pm-name { color: var(--color-text-1); }

/* ── Reduced motion ── */
@media (prefers-reduced-motion: reduce) {
  .pm-entry { animation: none; }
  .pm-link::before { display: none; }
}

/* ── Responsive ── */
@media (max-width: 480px) {
  .pm-idx { display: none; }
  .pm-link { padding: 0.9rem 0.5rem; margin: 0; }

  .pm-entry--featured .pm-link {
    padding-left: 0.75rem;
  }

  h2.pm-name { font-size: 1rem; }
  .pm-entry--featured h2.pm-name { font-size: 1.1rem; }

  .pm-oss-list {
    padding-left: 0.65rem;
  }
}
</style>
