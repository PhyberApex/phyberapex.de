<template>
  <div class="mini-root">
    <!-- Terminal window -->
    <div class="mini-window">
      <!-- Title bar -->
      <div class="mini-titlebar">
        <div class="mini-buttons">
          <span class="mini-btn mini-btn--close" aria-hidden="true"></span>
          <span class="mini-btn mini-btn--minimize" aria-hidden="true"></span>
          <span class="mini-btn mini-btn--maximize" aria-hidden="true"></span>
        </div>
        <span class="mini-title">janis@phyberapex: ~/interests/miniatures</span>
      </div>

      <!-- Terminal content -->
      <div class="mini-content">
        <!-- Header prompt -->
        <div class="mini-prompt">
          <span class="mini-user">janis@phyberapex</span>:<span class="mini-path">~/interests/miniatures</span>$ <span class="mini-cmd">cat README</span>
        </div>

        <div class="mini-output">
          <div class="mini-readme">
            <div class="mini-readme-title"># Miniature Painting</div>
            <div class="mini-readme-text">Methodical work at the opposite end of software engineering. Size 0 brush, not a keyboard.</div>
          </div>
        </div>

        <!-- Active batches -->
        <div class="mini-prompt">
          <span class="mini-user">janis@phyberapex</span>:<span class="mini-path">~/interests/miniatures</span>$ <span class="mini-cmd">ls -l active_batches/</span>
        </div>

        <div class="mini-output">
          <div class="mini-legend">
            <span class="mini-legend-label">legend:</span>
            <span class="mini-legend-item mini-legend-item--done"><span class="mini-legend-dot">◉</span> done</span>
            <span class="mini-legend-item mini-legend-item--current"><span class="mini-legend-dot">◎</span> current</span>
            <span class="mini-legend-item mini-legend-item--pending"><span class="mini-legend-dot">○</span> pending</span>
          </div>
        </div>

        <div class="mini-output">
          <div
            v-for="proj in projects"
            :key="proj.name"
            class="mini-project"
          >
            <div class="mini-project-header">
              <span class="mini-project-name">{{ proj.name.toLowerCase().replace(/\s+/g, '-') }}/</span>
              <span class="mini-project-count">{{ proj.count }}</span>
            </div>
            <div class="mini-project-desc">{{ proj.desc }}</div>
            <div class="mini-pipeline">
              <span
                v-for="(stage, si) in STAGES"
                :key="stage.key"
                class="mini-stage"
                :class="{
                  'mini-stage--done': si < proj.stage,
                  'mini-stage--current': si === proj.stage,
                  'mini-stage--pending': si > proj.stage,
                }"
              >
                <span class="mini-stage-dot" aria-hidden="true">{{ si < proj.stage ? '◉' : si === proj.stage ? '◎' : '○' }}</span>
                <span class="mini-stage-label">{{ stage.label }}</span>
                <span v-if="si < STAGES.length - 1" class="mini-connector" aria-hidden="true">─</span>
              </span>
            </div>
          </div>
        </div>

        <!-- Tools -->
        <div class="mini-prompt">
          <span class="mini-user">janis@phyberapex</span>:<span class="mini-path">~/interests/miniatures</span>$ <span class="mini-cmd">tools --list</span>
        </div>

        <div class="mini-output">
          <div class="mini-tool-line">
            <span class="mini-tool-label">Paints:</span>
            <span class="mini-tool-value">Citadel — Contrast line for base layers</span>
          </div>
          <div class="mini-tool-line">
            <span class="mini-tool-label">Storage:</span>
            <span class="mini-tool-value">OMNI 2 · ModiBOXI 3D printed systems</span>
          </div>
          <div class="mini-tool-line">
            <span class="mini-tool-label">Display:</span>
            <span class="mini-tool-value">IKEA HARVMATTA shelves + wall mounts</span>
          </div>
        </div>

        <!-- Closing -->
        <div class="mini-prompt">
          <span class="mini-user">janis@phyberapex</span>:<span class="mini-path">~/interests/miniatures</span>$ <span class="mini-cursor" aria-hidden="true">█</span>
        </div>

        <div class="mini-prompt">
          <span class="mini-user">janis@phyberapex</span>:<span class="mini-path">~/interests/miniatures</span>$ <span class="mini-cmd">cat CONTACT.txt</span>
        </div>

        <div class="mini-output">
          <div class="mini-contact">
            Send me photos of your minis — genuinely. Good painting is meant to be seen. <a href="https://www.linkedin.com/in/janis-walliser-41687278/" target="_blank" rel="noopener noreferrer">Find me on LinkedIn</a>.
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const STAGES = [
  { key: 'primed',    label: 'Primed' },
  { key: 'base',      label: 'Base' },
  { key: 'wash',      label: 'Wash' },
  { key: 'layer',     label: 'Layer' },
  { key: 'highlight', label: 'Highlight' },
  { key: 'done',      label: 'Done' },
]

const projects = [
  {
    name: 'Zombicide Survivors',
    count: 'ongoing',
    desc: 'The current focus. Chipping away between sessions — each one gets enough detail to feel distinct on the board.',
    stage: 1,
  },
  {
    name: 'Zombicide Zombies',
    count: 'batch painting',
    desc: 'Quantity over quality — they\'re supposed to look like hordes.',
    stage: 1,
  },
  {
    name: 'Gloomhaven Heroes',
    count: '12 minis',
    desc: 'Not started yet. Waiting until the Zombicide backlog clears.',
    stage: 0,
  },
]
</script>

<style scoped>
/* ── Root ── */
.mini-root {
  padding: 2rem 1rem 3rem;
  display: flex;
  justify-content: center;
  min-height: calc(100vh - var(--navbar-height));
}

/* ── Terminal window ── */
.mini-window {
  width: 100%;
  max-width: 920px;
  background: #0d1117;
  border: 1px solid #30363d;
  border-radius: 8px;
  box-shadow:
    0 20px 50px rgba(0, 0, 0, 0.5),
    0 0 0 1px rgba(27, 178, 229, 0.1);
  overflow: hidden;
  align-self: flex-start;
}

/* ── Title bar ── */
.mini-titlebar {
  background: #161b22;
  border-bottom: 1px solid #30363d;
  padding: 0.65rem 1rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.mini-buttons {
  display: flex;
  gap: 0.45rem;
}

.mini-btn {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  display: block;
  opacity: 0.5;
  transition: opacity 0.2s ease;
  cursor: default;
}

.mini-btn--close { background: #ff5f57; }
.mini-btn--minimize { background: #febc2e; }
.mini-btn--maximize { background: #28c840; }

.mini-titlebar:hover .mini-btn { opacity: 0.7; }

.mini-title {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.75rem;
  color: var(--color-text-3);
  flex: 1;
  text-align: center;
  margin-right: 60px;
}

/* ── Terminal content ── */
.mini-content {
  padding: 1.5rem 1.5rem;
  font-family: 'JetBrains Mono', 'Fira Code', 'Cascadia Code', monospace;
  font-size: 0.875rem;
  line-height: 1.6;
}

/* ── Prompt ── */
.mini-prompt {
  color: var(--color-text-2);
  margin: 1.75rem 0 0.65rem;
}

.mini-prompt:first-child {
  margin-top: 0;
}

.mini-user {
  color: #56d364;
  font-weight: 600;
}

.mini-path {
  color: #1bb2e5;
  font-weight: 600;
}

.mini-cmd {
  color: var(--color-text-1);
}

.mini-cursor {
  color: #1bb2e5;
  animation: mini-blink 1.5s step-end infinite;
}

@keyframes mini-blink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
}

/* ── Output ── */
.mini-output {
  margin-bottom: 0.75rem;
}

/* ── Legend ── */
.mini-legend {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.5rem 0.65rem;
  font-size: 0.75rem;
  border-left: 1px solid rgba(27, 178, 229, 0.12);
  margin-bottom: 0.75rem;
}

.mini-legend-label {
  color: #88c0d0;
  font-weight: 600;
  margin-right: 0.25rem;
}

.mini-legend-item {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  color: var(--color-text-3);
}

.mini-legend-dot {
  font-size: 0.7rem;
}

.mini-legend-item--done .mini-legend-dot { color: #56d364; }
.mini-legend-item--current .mini-legend-dot { color: var(--color-accent); }
.mini-legend-item--pending .mini-legend-dot { color: #30363d; }

.mini-readme {
  padding: 0.75rem 0;
}

.mini-readme-title {
  color: var(--color-accent);
  font-weight: 700;
  font-size: 1.15rem;
  margin-bottom: 0.5rem;
}

.mini-readme-text {
  font-family: Georgia, 'Times New Roman', serif;
  color: var(--color-text-2);
  font-size: 0.95rem;
  line-height: 1.6;
}

/* ── Project ── */
.mini-project {
  padding: 0.75rem 1rem;
  border-left: 2px solid rgba(27, 178, 229, 0.2);
  margin-bottom: 1rem;
  transition: border-color 0.15s ease;
}

.mini-project:hover {
  border-left-color: rgba(27, 178, 229, 0.4);
}

.mini-project-header {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 0.4rem;
}

.mini-project-name {
  color: #1bb2e5;
  font-weight: 600;
  font-size: 0.9rem;
}

.mini-project-count {
  color: var(--color-text-3);
  font-size: 0.72rem;
  font-style: italic;
}

.mini-project-desc {
  font-family: Georgia, 'Times New Roman', serif;
  color: var(--color-text-2);
  font-size: 0.85rem;
  line-height: 1.5;
  margin-bottom: 0.75rem;
}

/* ── Pipeline ── */
.mini-pipeline {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.15rem;
}

.mini-stage {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 0.7rem;
}

.mini-stage-dot {
  font-size: 0.65rem;
}

.mini-connector {
  color: var(--color-border);
  margin: 0 0.15rem;
}

.mini-stage--done .mini-stage-dot { color: #56d364; }
.mini-stage--done .mini-stage-label { color: var(--color-text-3); }

.mini-stage--current .mini-stage-dot { color: var(--color-accent); }
.mini-stage--current .mini-stage-label { color: var(--color-accent); font-weight: 600; }

.mini-stage--pending .mini-stage-dot { color: #30363d; }
.mini-stage--pending .mini-stage-label { color: #30363d; }

/* ── Tools ── */
.mini-tool-line {
  display: flex;
  gap: 0.75rem;
  padding: 0.3rem 0;
}

.mini-tool-label {
  color: #88c0d0;
  font-weight: 600;
  min-width: 75px;
}

.mini-tool-value {
  font-family: Georgia, 'Times New Roman', serif;
  color: var(--color-text-2);
}

/* ── Contact ── */
.mini-contact {
  font-family: Georgia, 'Times New Roman', serif;
  color: var(--color-text-2);
  font-size: 0.875rem;
  line-height: 1.6;
  padding-left: 0.65rem;
  border-left: 1px solid rgba(27, 178, 229, 0.12);
}

.mini-contact a {
  color: var(--color-accent);
  text-decoration: underline;
  text-underline-offset: 2px;
  text-decoration-thickness: 1px;
  text-decoration-color: rgba(27, 178, 229, 0.4);
  transition: text-decoration-color 0.15s ease;
}

.mini-contact a:hover {
  text-decoration-color: var(--color-accent);
}

/* ── Responsive ── */
@media (max-width: 768px) {
  .mini-content {
    padding: 1.25rem 1rem;
    font-size: 0.8rem;
  }

  .mini-pipeline {
    gap: 0.3rem;
  }

  .mini-connector {
    display: none;
  }

  .mini-legend {
    flex-wrap: wrap;
    gap: 0.5rem;
  }
}

@media (max-width: 480px) {
  .mini-content {
    font-size: 0.75rem;
  }

  .mini-stage {
    font-size: 0.65rem;
  }
}

/* ── Reduced motion ── */
@media (prefers-reduced-motion: reduce) {
  .mini-cursor { animation: none; opacity: 1; }
}
</style>
