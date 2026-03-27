<template>
  <div class="gaming-page">
    <header class="gp-header">
      <p class="gp-kicker">$ session log</p>
      <h1 class="gp-title">Tabletop Gaming</h1>
      <p class="gp-subtitle">Cooperative, legacy, miniature-based. Preferably all three at once.</p>
    </header>

    <section class="gp-section">
      <h2 class="gp-section-label">
        <span class="gp-section-prefix">$</span> ttrpg --status
      </h2>
      <div class="gp-ttrpg-block">
        <p class="gp-ttrpg-line"><span class="gp-out-label">sessions:</span> a few in so far. early stage.</p>
        <p class="gp-ttrpg-line"><span class="gp-out-label">systems:</span> Bunkers and Badasses, Kids on Bikes, D&amp;D 5e</p>
        <p class="gp-ttrpg-line"><span class="gp-out-label">brewing:</span> quirky elf ranger · brooding dwarf cleric</p>
      </div>
    </section>

    <section class="gp-section">
      <h2 class="gp-section-label">
        <span class="gp-section-prefix">$</span> active_campaigns
      </h2>
      <ul class="gp-game-list" role="list">
        <li v-for="game in games" :key="game.title" class="gp-game">
          <div class="gp-game-status-col">
            <span class="gp-status-badge" :class="`gp-status--${game.status}`">{{ STATUS_LABELS[game.status] }}</span>
          </div>
          <div class="gp-game-info">
            <span class="gp-game-title">{{ game.title }}</span>
            <span class="gp-game-desc">{{ game.desc }}</span>
          </div>
          <div class="gp-game-tags">
            <span v-for="tag in game.tags" :key="tag" class="gp-tag">{{ tag }}</span>
          </div>
        </li>
      </ul>
    </section>

    <section class="gp-section">
      <h2 class="gp-section-label">
        <span class="gp-section-prefix">$</span> preferred_mechanics
      </h2>
      <ul class="gp-mechanic-list" role="list">
        <li v-for="m in mechanics" :key="m.label" class="gp-mechanic">
          <span class="gp-mechanic-icon" aria-hidden="true">{{ m.icon }}</span>
          <div>
            <span class="gp-mechanic-label">{{ m.label }}</span>
            <span class="gp-mechanic-desc">{{ m.desc }}</span>
          </div>
        </li>
      </ul>
    </section>

    <p class="gp-closing">If you're somewhere in the Rhine Valley with a Gloomhaven box and a free Saturday, I'm already interested — <a href="https://www.linkedin.com/in/janis-walliser-41687278/" target="_blank" rel="noopener noreferrer">find me here.</a></p>
  </div>
</template>

<script setup>
const STATUS_LABELS = {
  active: 'ACTIVE',
  shelved: 'SHELVED',
  wip: 'IN PROGRESS',
}

const games = [
  {
    title: 'Gloomhaven',
    status: 'active',
    desc: 'Epic campaign with deep strategy and a story that evolves permanently.',
    tags: ['legacy', 'cooperative', 'miniatures'],
  },
  {
    title: 'Zombicide',
    status: 'active',
    desc: 'Cooperative zombie-slaying. Love the miniatures and the intensity.',
    tags: ['cooperative', 'miniatures', 'survival'],
  },
  {
    title: 'Final Girl',
    status: 'shelved',
    desc: 'Solo horror movie-inspired game. Surprisingly tense every run.',
    tags: ['solo', 'horror', 'variable setup'],
  },
]

const mechanics = [
  { icon: '▶', label: 'Cooperative', desc: 'Working together against the game, not each other.' },
  { icon: '⊞', label: 'Legacy / Deck building', desc: 'Games that change permanently as you play.' },
  { icon: '◎', label: 'Miniature-based', desc: 'Painting the pieces makes everything feel more personal.' },
]
</script>

<style scoped>
.gaming-page {
  background-color: var(--color-bg);
  min-height: calc(100vh - var(--navbar-height));
  padding: 2.5rem 2rem 4rem;
  max-width: 780px;
}

/* ── Header ── */
.gp-header {
  margin-bottom: 2.5rem;
}

.gp-kicker {
  font-family: var(--font-mono);
  font-size: 0.78rem;
  color: var(--color-accent);
  margin: 0 0 0.5rem;
  letter-spacing: 0.04em;
  opacity: 0.7;
}

.gp-title {
  font-family: Georgia, 'Times New Roman', serif;
  font-size: 2.25rem;
  font-weight: 700;
  color: var(--color-text-1);
  margin: 0 0 0.5rem;
  letter-spacing: -0.01em;
}

.gp-subtitle {
  font-family: var(--font-serif);
  font-size: 1rem;
  color: var(--color-text-2);
  margin: 0;
  line-height: 1.6;
}

/* ── Sections ── */
.gp-section {
  margin-bottom: 2.25rem;
}

.gp-section-label {
  font-family: var(--font-mono);
  font-size: 0.8rem;
  color: var(--color-text-3);
  font-weight: 400;
  margin: 0 0 1rem;
  letter-spacing: 0.04em;
}

.gp-section-prefix {
  color: var(--color-accent);
  margin-right: 0.4rem;
}

/* ── Game list ── */
.gp-game-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
}

.gp-game {
  display: grid;
  grid-template-columns: 110px 1fr auto;
  align-items: start;
  gap: 0.75rem 1rem;
  padding: 0.85rem 1rem;
  border-bottom: 1px solid var(--color-border);
  background: #0d1117;
  transition: background 0.15s ease;
}

.gp-game:last-child { border-bottom: none; }
.gp-game:hover { background: #161b22; }

.gp-game-status-col {
  display: flex;
  align-items: flex-start;
  padding-top: 0.1rem;
}

.gp-status-badge {
  font-family: var(--font-mono);
  font-size: 0.63rem;
  letter-spacing: 0.1em;
  font-weight: 700;
  padding: 0.2rem 0.5rem;
  border-radius: 3px;
  border: 1px solid;
  white-space: nowrap;
}

.gp-status--active {
  color: #56d364;
  border-color: rgba(86, 211, 100, 0.3);
  background: rgba(86, 211, 100, 0.06);
}

.gp-status--shelved {
  color: var(--color-text-3);
  border-color: var(--color-border);
  background: transparent;
}

.gp-status--wip {
  color: #e3b341;
  border-color: rgba(227, 179, 65, 0.3);
  background: rgba(227, 179, 65, 0.06);
}

.gp-game-info {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.gp-game-title {
  font-family: var(--font-mono);
  font-size: 0.925rem;
  font-weight: 600;
  color: var(--color-text-1);
}

.gp-game-desc {
  font-family: var(--font-serif);
  font-size: 0.875rem;
  color: var(--color-text-2);
  line-height: 1.5;
}

.gp-game-tags {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  align-items: flex-end;
}

.gp-tag {
  font-family: var(--font-mono);
  font-size: 0.62rem;
  color: var(--color-text-3);
  letter-spacing: 0.06em;
  white-space: nowrap;
}

/* ── Mechanics ── */
.gp-mechanic-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.gp-mechanic {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
}

.gp-mechanic-icon {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--color-accent);
  margin-top: 0.3rem;
  flex-shrink: 0;
  width: 1.2rem;
  text-align: center;
}

.gp-mechanic-label {
  font-family: var(--font-mono);
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--color-text-1);
  display: block;
  margin-bottom: 0.1rem;
}

.gp-mechanic-desc {
  font-family: var(--font-serif);
  font-size: 0.875rem;
  color: var(--color-text-2);
  display: block;
  line-height: 1.5;
}

/* ── TTRPG block ── */
.gp-ttrpg-block {
  font-family: var(--font-mono);
  font-size: 0.875rem;
  background: #0d1117;
  border: 1px solid var(--color-border);
  border-radius: 6px;
  padding: 1rem 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.gp-ttrpg-line {
  margin: 0;
  color: var(--color-text-2);
}

.gp-out-label {
  color: var(--color-accent);
  margin-right: 0.6rem;
}

/* ── Closing line ── */
.gp-closing {
  margin-top: 2rem;
  font-family: var(--font-serif);
  font-size: 0.875rem;
  color: var(--color-text-3);
  line-height: 1.6;
}

.gp-closing a {
  color: var(--color-accent);
  text-decoration: none;
}

.gp-closing a:hover { text-decoration: underline; }

/* ── Responsive ── */
@media (max-width: 560px) {
  .gp-game {
    grid-template-columns: 1fr;
  }
  .gp-game-tags {
    flex-direction: row;
    align-items: flex-start;
    flex-wrap: wrap;
    gap: 0.3rem 0.75rem;
  }
}
</style>
