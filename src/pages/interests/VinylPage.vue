<template>
  <div class="vinyl-page">
    <header class="vp-header">
      <p class="vp-kicker">CRATE · {{ records.length }} records</p>
      <h1 class="vp-title">Vinyl</h1>
      <p class="vp-subtitle">Game &amp; anime OSTs. All wall-mounted. A listening collection and a display.</p>
    </header>

    <ul class="vp-crate" role="list" aria-label="Record collection">
      <li
        v-for="(record, i) in records"
        :key="record.title"
        class="vp-record"
        :class="{ 'vp-record--featured': record.featured }"
      >
        <div class="vp-sleeve" :style="{ '--sleeve-color': record.color }" aria-hidden="true">
          <span class="vp-slot-num">{{ String(i + 1).padStart(2, '0') }}</span>
        </div>
        <div class="vp-record-info">
          <div class="vp-record-top">
            <span class="vp-record-title">{{ record.title }}</span>
            <span v-if="record.featured" class="vp-tag vp-tag--spinning">▶ spinning</span>
          </div>
          <span class="vp-record-artist">{{ record.artist }}</span>
          <span class="vp-record-note">{{ record.note }}</span>
        </div>
      </li>
    </ul>

    <p class="vp-closing">Playing anything from the Cyberpunk 2077 or Hades OST? Tell me what I'm missing — <a href="https://www.linkedin.com/in/janis-walliser-41687278/" target="_blank" rel="noopener noreferrer">LinkedIn</a> is the best place to find me.</p>
  </div>
</template>

<script setup>
const records = [
  { title: 'Transistor', artist: 'Darren Korb', note: 'Unique blend of electronic and acoustic. Absolute favorite.', color: '#c0392b', featured: false },
  { title: 'VA-11 HALL-A', artist: 'Garoad', note: 'Cyberpunk bar atmosphere, perfectly captured.', color: '#1bb2e5', featured: true },
  { title: 'Borderlands 2', artist: 'Jesper Kyd et al.', note: 'Brings Pandora to life.', color: '#e67e22', featured: false },
  { title: 'Guild Wars', artist: 'Jeremy Soule', note: 'Epic fantasy themes.', color: '#8e44ad', featured: false },
  { title: 'Megalo Box', artist: 'mabanua', note: 'Gritty, hip-hop infused. Matches the anime\'s style exactly.', color: '#e74c3c', featured: false },
  { title: 'My Neighbor Totoro', artist: 'Joe Hisaishi', note: 'A beautiful, whimsical Ghibli score.', color: '#27ae60', featured: false },
  { title: 'Steins;Gate', artist: 'Takeshi Abo', note: 'Haunting and emotional.', color: '#2980b9', featured: false },
]
</script>

<style scoped>
.vinyl-page {
  background-color: var(--color-bg);
  min-height: calc(100vh - var(--navbar-height));
  padding: 2.5rem 2rem 4rem;
  max-width: 780px;
}

/* ── Header ── */
.vp-header {
  margin-bottom: 2.5rem;
}

.vp-kicker {
  font-family: var(--font-mono);
  font-size: 0.68rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--color-accent);
  margin: 0 0 0.6rem;
  opacity: 0.8;
}

.vp-title {
  font-family: Georgia, 'Times New Roman', serif;
  font-size: 2.25rem;
  font-weight: 700;
  color: var(--color-text-1);
  margin: 0 0 0.5rem;
  letter-spacing: -0.01em;
}

.vp-subtitle {
  font-family: var(--font-serif);
  font-size: 1rem;
  color: var(--color-text-2);
  margin: 0;
  line-height: 1.6;
}

/* ── Crate ── */
.vp-crate {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
}

.vp-record {
  display: flex;
  align-items: stretch;
  border-bottom: 1px solid var(--color-border);
  background: #0d1117;
  transition: background 0.15s ease;
}

.vp-record:last-child { border-bottom: none; }
.vp-record:hover { background: #161b22; }

.vp-record--featured {
  background: #101722;
}

/* ── Sleeve swatch ── */
.vp-sleeve {
  width: 52px;
  flex-shrink: 0;
  background: var(--sleeve-color, #30363d);
  display: flex;
  align-items: flex-end;
  justify-content: flex-start;
  padding: 0.5rem 0.4rem;
  opacity: 0.9;
}

.vp-slot-num {
  font-family: var(--font-mono);
  font-size: 0.65rem;
  color: rgba(255, 255, 255, 0.6);
  font-weight: 700;
  letter-spacing: 0.05em;
}

/* ── Record info ── */
.vp-record-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0.85rem 1rem;
  gap: 0.15rem;
  flex: 1;
  min-width: 0;
}

.vp-record-top {
  display: flex;
  align-items: baseline;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.vp-record-title {
  font-family: var(--font-mono);
  font-size: 0.925rem;
  font-weight: 600;
  color: var(--color-text-1);
}

.vp-record-artist {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--color-accent);
  letter-spacing: 0.03em;
}

.vp-record-note {
  font-family: var(--font-serif);
  font-size: 0.875rem;
  color: var(--color-text-2);
  line-height: 1.45;
  margin-top: 0.1rem;
}

/* ── Tags ── */
.vp-tag {
  font-family: var(--font-mono);
  font-size: 0.65rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  padding: 0.15rem 0.45rem;
  border-radius: 3px;
  border: 1px solid;
  white-space: nowrap;
}

.vp-tag--spinning {
  color: var(--color-accent);
  border-color: rgba(27, 178, 229, 0.3);
  background: rgba(27, 178, 229, 0.07);
}

/* ── Closing line ── */
.vp-closing {
  margin-top: 2rem;
  font-family: var(--font-serif);
  font-size: 0.875rem;
  color: var(--color-text-3);
  line-height: 1.6;
}

.vp-closing a {
  color: var(--color-accent);
  text-decoration: none;
}

.vp-closing a:hover { text-decoration: underline; }
</style>
