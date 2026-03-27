<template>
  <div class="mini-page">
    <header class="mp-header">
      <p class="mp-kicker">PAINTING QUEUE</p>
      <h1 class="mp-title">Miniature Painting</h1>
      <p class="mp-subtitle">Methodical work at the opposite end of software engineering. Size 0 brush, not a keyboard.</p>
    </header>

    <section class="mp-section">
      <h2 class="mp-section-label">
        <span class="mp-prefix">$</span> active_batches
      </h2>

      <ul class="mp-project-list" role="list">
        <li v-for="proj in projects" :key="proj.name" class="mp-project">
          <div class="mp-project-header">
            <span class="mp-project-name">{{ proj.name }}</span>
            <span class="mp-project-count">{{ proj.count }}</span>
          </div>
          <p class="mp-project-desc">{{ proj.desc }}</p>
          <div class="mp-pipeline" role="list" :aria-label="`Painting stages for ${proj.name}`">
            <div
              v-for="(stage, si) in STAGES"
              :key="stage.key"
              class="mp-stage"
              :class="{
                'mp-stage--done': si < proj.stage,
                'mp-stage--current': si === proj.stage,
                'mp-stage--pending': si > proj.stage,
              }"
              role="listitem"
            >
              <span class="mp-stage-dot" aria-hidden="true">{{ si < proj.stage ? '◉' : si === proj.stage ? '◎' : '○' }}</span>
              <span class="mp-stage-label">{{ stage.label }}</span>
            </div>
          </div>
        </li>
      </ul>
    </section>

    <section class="mp-section">
      <h2 class="mp-section-label">
        <span class="mp-prefix">$</span> tools --list
      </h2>
      <dl class="mp-tools">
        <div class="mp-tool-row">
          <dt>Paints</dt>
          <dd>Citadel — Contrast line for base layers</dd>
        </div>
        <div class="mp-tool-row">
          <dt>Storage</dt>
          <dd>OMNI 2 · ModiBOXI 3D printed systems</dd>
        </div>
        <div class="mp-tool-row">
          <dt>Display</dt>
          <dd>IKEA HARVMATTA shelves + wall mounts</dd>
        </div>
      </dl>
    </section>

    <p class="mp-closing">Send me photos of your minis — genuinely. Good painting is meant to be seen. <a href="https://www.linkedin.com/in/janis-walliser-41687278/" target="_blank" rel="noopener noreferrer">Find me on LinkedIn.</a></p>
  </div>
</template>

<script setup>
const STAGES = [
  { key: 'primed',    label: 'Primed' },
  { key: 'base',      label: 'Base coat' },
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
.mini-page {
  background-color: var(--color-bg);
  min-height: calc(100vh - var(--navbar-height));
  padding: 2.5rem 2rem 4rem;
  max-width: 780px;
}

/* ── Header ── */
.mp-header {
  margin-bottom: 2.5rem;
}

.mp-kicker {
  font-family: var(--font-mono);
  font-size: 0.68rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--color-accent);
  opacity: 0.8;
  margin: 0 0 0.6rem;
}

.mp-title {
  font-family: Georgia, 'Times New Roman', serif;
  font-size: 2.25rem;
  font-weight: 700;
  color: var(--color-text-1);
  margin: 0.5rem 0 0.5rem;
  letter-spacing: -0.01em;
}

.mp-subtitle {
  font-family: var(--font-serif);
  font-size: 1rem;
  color: var(--color-text-2);
  margin: 0;
  line-height: 1.7;
}

/* ── Sections ── */
.mp-section {
  margin-bottom: 2.25rem;
}

.mp-section-label {
  font-family: var(--font-mono);
  font-size: 0.8rem;
  color: var(--color-text-3);
  font-weight: 400;
  margin: 0 0 1rem;
  letter-spacing: 0.04em;
}

.mp-prefix {
  color: var(--color-accent);
  margin-right: 0.4rem;
}

/* ── Project list ── */
.mp-project-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0;
}

.mp-project {
  padding: 1rem 1.25rem 1.1rem;
  border-bottom: 1px solid var(--color-border);
  background: #0d1117;
}

.mp-project:last-child { border-bottom: none; }

.mp-project-header {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 0.25rem;
}

.mp-project-name {
  font-family: var(--font-mono);
  font-size: 0.925rem;
  font-weight: 600;
  color: var(--color-text-1);
}

.mp-project-count {
  font-family: var(--font-mono);
  font-size: 0.72rem;
  color: var(--color-text-3);
  letter-spacing: 0.04em;
}

.mp-project-desc {
  font-family: var(--font-serif);
  font-size: 0.875rem;
  color: var(--color-text-2);
  margin: 0 0 0.85rem;
  line-height: 1.5;
}

/* ── Pipeline ── */
.mp-pipeline {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.1rem;
}

.mp-stage {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  font-family: var(--font-mono);
  font-size: 0.68rem;
  letter-spacing: 0.03em;
}

/* connector line between stages */
.mp-stage:not(:last-child)::after {
  content: '';
  display: inline-block;
  width: 0.8rem;
  height: 1px;
  background: var(--color-border);
  margin-left: 0.3rem;
  vertical-align: middle;
}

.mp-stage--done .mp-stage-dot { color: #56d364; }
.mp-stage--done .mp-stage-label { color: var(--color-text-3); }

.mp-stage--current .mp-stage-dot { color: var(--color-accent); }
.mp-stage--current .mp-stage-label { color: var(--color-accent); font-weight: 600; }

.mp-stage--pending .mp-stage-dot { color: #30363d; }
.mp-stage--pending .mp-stage-label { color: #30363d; }

.mp-stage-dot {
  font-size: 0.6rem;
  flex-shrink: 0;
}

/* ── Tools ── */
.mp-tools {
  background: #0d1117;
  border: 1px solid var(--color-border);
  border-radius: 6px;
  overflow: hidden;
}

.mp-tool-row {
  display: grid;
  grid-template-columns: 80px 1fr;
  gap: 1rem;
  padding: 0.7rem 1.25rem;
  border-bottom: 1px solid var(--color-border);
  font-family: var(--font-mono);
  font-size: 0.85rem;
}

.mp-tool-row:last-child { border-bottom: none; }

.mp-tool-row dt {
  color: var(--color-accent);
  font-weight: 500;
}

.mp-tool-row dd {
  color: var(--color-text-2);
  margin: 0;
  font-family: var(--font-serif);
}

/* ── Closing line ── */
.mp-closing {
  margin-top: 2rem;
  font-family: var(--font-serif);
  font-size: 0.875rem;
  color: var(--color-text-3);
  line-height: 1.6;
}

.mp-closing a {
  color: var(--color-accent);
  text-decoration: none;
}

.mp-closing a:hover { text-decoration: underline; }

/* ── Responsive ── */
@media (max-width: 520px) {
  .mp-pipeline { gap: 0.4rem; }
  .mp-stage::after { display: none; }
}
</style>
