<template>
  <div class="term-root">
    <!-- Terminal window for projects -->
    <div class="term-window">
      <!-- Title bar -->
      <div class="term-titlebar">
        <div class="term-buttons">
          <span class="term-btn term-btn--close" aria-hidden="true"></span>
          <span class="term-btn term-btn--minimize" aria-hidden="true"></span>
          <span class="term-btn term-btn--maximize" aria-hidden="true"></span>
        </div>
        <span class="term-title">janis@phyberapex: ~/projects</span>
      </div>

      <!-- Terminal content -->
      <div class="term-content">
        <!-- Command prompt -->
        <div class="term-prompt" aria-label="Command: list projects">
          <span class="term-user">janis@phyberapex</span>:<span class="term-path">~/projects</span>$ <span class="term-cmd">ls -la</span>
        </div>

        <!-- Project listing -->
        <div class="term-output">
          <router-link
            v-for="(project, i) in PROJECTS"
            :key="project.slug"
            :to="`/projects/${project.slug}`"
            class="term-line"
            :class="[`term-line--${project.status}`, { 'term-line--featured': project.featured }]"
            :style="{ '--delay': `${i * 40}ms` }"
          >
            <span class="term-perms" aria-hidden="true">drwxr-xr-x</span>
            <span class="term-links" aria-hidden="true">8</span>
            <span class="term-status">{{ project.status.padEnd(10) }}</span>
            <span class="term-project">{{ project.slug }}/</span>
            <div class="term-desc">→ {{ project.tagline }}</div>
            <div class="term-stack">[{{ project.stack.join(' · ') }}]</div>
          </router-link>
        </div>

        <!-- Cursor -->
        <div class="term-prompt">
          <span class="term-user">janis@phyberapex</span>:<span class="term-path">~/projects</span>$ <span class="term-cursor" aria-hidden="true">█</span>
        </div>
      </div>
    </div>

    <!-- OSS terminal window -->
    <div class="term-window">
      <div class="term-titlebar">
        <div class="term-buttons">
          <span class="term-btn term-btn--close" aria-hidden="true"></span>
          <span class="term-btn term-btn--minimize" aria-hidden="true"></span>
          <span class="term-btn term-btn--maximize" aria-hidden="true"></span>
        </div>
        <span class="term-title">janis@phyberapex: ~/oss</span>
      </div>

      <div class="term-content">
        <div class="term-prompt" aria-label="Command: show contributions">
          <span class="term-user">janis@phyberapex</span>:<span class="term-path">~/oss</span>$ <span class="term-cmd">cat CONTRIBUTIONS</span>
        </div>

        <div class="term-output">
          <a
            v-for="c in CONTRIB"
            :key="c.name"
            :href="c.url"
            class="term-line term-oss-line"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span class="term-oss-bullet" aria-hidden="true">▸</span>
            <span class="term-oss-name">{{ c.name }}</span>
            <span class="term-external-icon" aria-label="External link">↗</span>
            <div class="term-oss-desc">  {{ c.desc }}</div>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { PROJECTS, CONTRIB } from '../../data/projects.js'
</script>

<style scoped>
/* ── Root ── */
.term-root {
  padding: 2rem 1rem 3rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

/* ── Terminal window ── */
.term-window {
  background: #0d1117;
  border: 1px solid #30363d;
  border-radius: 8px;
  box-shadow:
    0 20px 50px rgba(0, 0, 0, 0.5),
    0 0 0 1px rgba(27, 178, 229, 0.1);
  overflow: hidden;
  animation: term-enter 0.6s cubic-bezier(0.22, 1, 0.36, 1) both;
}

@keyframes term-enter {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

/* ── Title bar ── */
.term-titlebar {
  background: #161b22;
  border-bottom: 1px solid #30363d;
  padding: 0.65rem 1rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.term-buttons {
  display: flex;
  gap: 0.45rem;
}

.term-btn {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  display: block;
  opacity: 0.4;
  transition: opacity 0.2s ease;
  cursor: default;
}

.term-btn--close {
  background: #ff5f57;
}

.term-btn--minimize {
  background: #febc2e;
}

.term-btn--maximize {
  background: #28c840;
}

.term-titlebar:hover .term-btn {
  opacity: 0.7;
}

.term-title {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.75rem;
  color: var(--color-text-3);
  flex: 1;
  text-align: center;
  margin-right: 60px; /* offset buttons width */
}

/* ── Terminal content ── */
.term-content {
  padding: 1.5rem 1.5rem;
  font-family: 'JetBrains Mono', 'Fira Code', 'Cascadia Code', monospace;
  font-size: 0.875rem;
  line-height: 1.6;
}

/* OSS window - more compact */
.term-window:last-child .term-content {
  padding: 1rem 1.5rem;
}

/* ── Prompt ── */
.term-prompt {
  color: var(--color-text-2);
  margin-bottom: 0.75rem;
}

.term-user {
  color: #56d364;
  font-weight: 600;
}

.term-path {
  color: #1bb2e5;
  font-weight: 600;
}

.term-cmd {
  color: var(--color-text-1);
}

.term-cursor {
  color: #1bb2e5;
  animation: term-blink 1.2s step-end infinite;
}

@keyframes term-blink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
}

/* ── Output ── */
.term-output {
  display: flex;
  flex-direction: column;
  gap: 0;
  margin-bottom: 1rem;
}

/* ── Project line ── */
.term-line {
  display: flex;
  flex-wrap: wrap;
  padding: 0.4rem 0.5rem;
  text-decoration: none;
  color: var(--color-text-1);
  border-radius: 3px;
  transition: background 0.15s ease;
  animation: term-line-enter 0.4s cubic-bezier(0.22, 1, 0.36, 1) both;
  animation-delay: var(--delay, 0ms);
  position: relative;
}

@keyframes term-line-enter {
  from { opacity: 0; transform: translateX(-10px); }
  to { opacity: 1; transform: translateX(0); }
}

.term-line:hover {
  background: rgba(27, 178, 229, 0.08);
}

.term-line--featured {
  background: rgba(27, 178, 229, 0.12);
  border-left: 3px solid rgba(27, 178, 229, 0.4);
  padding-left: 1rem;
  padding-top: 0.6rem;
  padding-bottom: 0.6rem;
}

.term-line--featured:hover {
  background: rgba(27, 178, 229, 0.18);
  border-left-color: rgba(27, 178, 229, 0.6);
}

.term-line--featured .term-project {
  font-size: 1.05em;
  font-weight: 700;
}

.term-line--featured .term-desc {
  font-size: 0.9rem;
  color: var(--color-text-1);
}

/* ── Line columns ── */
.term-perms {
  color: var(--color-text-3);
  margin-right: 0.75rem;
  font-size: 0.8rem;
}

.term-links {
  color: var(--color-text-3);
  margin-right: 0.75rem;
  width: 1.5rem;
  text-align: right;
  font-size: 0.8rem;
}

.term-status {
  margin-right: 0.75rem;
  font-weight: 600;
  min-width: 80px;
}

.term-line--active .term-status {
  color: #56d364;
}

.term-line--maintained .term-status {
  color: #88c0d0;
}

.term-line--archived .term-status {
  color: var(--color-text-3);
  opacity: 0.7;
}

.term-project {
  color: #1bb2e5;
  font-weight: 600;
  margin-right: 1rem;
}

.term-desc {
  flex: 1 1 100%;
  font-family: Georgia, 'Times New Roman', serif;
  color: var(--color-text-2);
  padding-left: 9.5rem;
  margin-top: 0.15rem;
  font-size: 0.85rem;
  line-height: 1.5;
}

.term-stack {
  flex: 1 1 100%;
  color: var(--color-text-3);
  padding-left: 9.5rem;
  margin-top: 0.15rem;
  font-size: 0.75rem;
}

/* ── OSS lines ── */
.term-oss-line {
  display: block;
  padding: 0.35rem 0.5rem;
  text-decoration: none;
  color: var(--color-text-1);
  border-radius: 3px;
  transition: background 0.15s ease;
}

.term-oss-line:hover {
  background: rgba(27, 178, 229, 0.08);
}

.term-oss-bullet {
  color: #1bb2e5;
  margin-right: 0.5rem;
}

.term-oss-name {
  color: #1bb2e5;
  font-weight: 600;
}

.term-external-icon {
  color: var(--color-text-3);
  font-size: 0.75rem;
  margin-left: 0.3rem;
  opacity: 0.6;
  transition: opacity 0.15s ease;
}

.term-oss-line:hover .term-external-icon {
  opacity: 1;
  color: #56d364;
}

.term-oss-desc {
  font-family: Georgia, 'Times New Roman', serif;
  color: var(--color-text-3);
  font-size: 0.85rem;
  padding-left: 1.5rem;
  margin-top: 0.1rem;
  line-height: 1.5;
}

/* ── Archived styling ── */
.term-line--archived .term-status,
.term-line--archived .term-project {
  opacity: 0.6;
}

.term-line--archived .term-desc,
.term-line--archived .term-stack {
  opacity: 0.7;
}

.term-line--archived:hover .term-status,
.term-line--archived:hover .term-project {
  opacity: 0.85;
}

.term-line--archived:hover .term-desc,
.term-line--archived:hover .term-stack {
  opacity: 0.9;
}

/* ── Reduced motion ── */
@media (prefers-reduced-motion: reduce) {
  .term-window { animation: none; }
  .term-line { animation: none; }
  .term-cursor { animation: none; opacity: 1; }
}

/* ── Responsive ── */
@media (max-width: 768px) {
  .term-root {
    padding: 1.5rem 0.75rem 2.5rem;
  }

  .term-content {
    padding: 1rem 1rem;
    font-size: 0.8rem;
  }

  .term-title {
    font-size: 0.7rem;
  }

  .term-perms,
  .term-links {
    display: none;
  }

  .term-desc,
  .term-stack {
    padding-left: 6rem;
  }
}

@media (max-width: 480px) {
  .term-content {
    font-size: 0.75rem;
  }

  .term-status {
    min-width: 70px;
  }

  .term-desc,
  .term-stack {
    padding-left: 0;
    margin-left: 0;
  }

  .term-line {
    flex-direction: column;
    gap: 0.25rem;
  }

  .term-line--featured {
    padding-left: 0.75rem;
    border-left-width: 2px;
  }
}
</style>
