<template>
  <div class="gaming-root">
    <!-- Terminal window -->
    <div class="gaming-window">
      <!-- Title bar -->
      <div class="gaming-titlebar">
        <div class="gaming-buttons">
          <span class="gaming-btn gaming-btn--close" aria-hidden="true"></span>
          <span class="gaming-btn gaming-btn--minimize" aria-hidden="true"></span>
          <span class="gaming-btn gaming-btn--maximize" aria-hidden="true"></span>
        </div>
        <span class="gaming-title">janis@phyberapex: ~/interests/gaming</span>
      </div>

      <!-- Terminal content -->
      <div class="gaming-content">
        <!-- Header prompt -->
        <div class="gaming-prompt">
          <span class="gaming-user">janis@phyberapex</span>:<span class="gaming-path">~/interests/gaming</span>$ <span class="gaming-cmd">cat README</span>
        </div>

        <div class="gaming-output">
          <div class="gaming-readme">
            <div class="gaming-readme-title"># Tabletop Gaming</div>
            <div class="gaming-readme-text">Cooperative, legacy, miniature-based. Preferably all three at once.</div>
          </div>
        </div>

        <!-- TTRPG status -->
        <div class="gaming-prompt">
          <span class="gaming-user">janis@phyberapex</span>:<span class="gaming-path">~/interests/gaming</span>$ <span class="gaming-cmd">ttrpg --status</span>
        </div>

        <div class="gaming-output">
          <div class="gaming-info-line">
            <span class="gaming-label">sessions:</span>
            <span class="gaming-value">a few in so far. early stage.</span>
          </div>
          <div class="gaming-info-line">
            <span class="gaming-label">systems:</span>
            <span class="gaming-value">Bunkers and Badasses, Kids on Bikes, D&D 5e</span>
          </div>
          <div class="gaming-info-line">
            <span class="gaming-label">brewing:</span>
            <span class="gaming-value">quirky elf ranger · brooding dwarf cleric</span>
          </div>
        </div>

        <!-- Active campaigns -->
        <div class="gaming-prompt">
          <span class="gaming-user">janis@phyberapex</span>:<span class="gaming-path">~/interests/gaming</span>$ <span class="gaming-cmd">ls -l active_campaigns/</span>
        </div>

        <div class="gaming-output">
          <div
            v-for="game in games"
            :key="game.title"
            class="gaming-game-line"
            :class="`gaming-game--${game.status}`"
          >
            <span class="gaming-perms" aria-hidden="true">drwxr-xr-x</span>
            <span class="gaming-links" aria-hidden="true">4</span>
            <span class="gaming-status">{{ game.status.padEnd(8) }}</span>
            <span class="gaming-game-name">{{ game.title.toLowerCase().replace(/\s+/g, '-') }}/</span>
            <div class="gaming-game-desc">→ {{ game.desc }}</div>
            <div class="gaming-game-tags">[{{ game.tags.join(', ') }}]</div>
          </div>
        </div>

        <!-- Preferred mechanics -->
        <div class="gaming-prompt">
          <span class="gaming-user">janis@phyberapex</span>:<span class="gaming-path">~/interests/gaming</span>$ <span class="gaming-cmd">cat preferred_mechanics.txt</span>
        </div>

        <div class="gaming-output">
          <div v-for="m in mechanics" :key="m.label" class="gaming-mechanic">
            <span class="gaming-mechanic-icon" aria-hidden="true">{{ m.icon }}</span>
            <span class="gaming-mechanic-label">{{ m.label }}</span>
            <div class="gaming-mechanic-desc">{{ m.desc }}</div>
          </div>
        </div>

        <!-- Closing -->
        <div class="gaming-prompt">
          <span class="gaming-user">janis@phyberapex</span>:<span class="gaming-path">~/interests/gaming</span>$ <span class="gaming-cursor" aria-hidden="true">█</span>
        </div>

        <div class="gaming-prompt">
          <span class="gaming-user">janis@phyberapex</span>:<span class="gaming-path">~/interests/gaming</span>$ <span class="gaming-cmd">cat CONTACT.txt</span>
        </div>

        <div class="gaming-output">
          <div class="gaming-contact">
            If you're somewhere in the Rhine Valley want to slay some Zombies and have a free Saturday, I'm already interested — <a href="https://www.linkedin.com/in/janis-walliser-41687278/" target="_blank" rel="noopener noreferrer">find me here</a>.
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const games = [
  {
    title: 'Dragons of Stormwreck Isle',
    status: 'active',
    desc: 'D&D campaign led by my wife',
    tags: ['d&d', 'fantasy', 'beginner'],
  },
  {
    title: 'Zombicide',
    status: 'active',
    desc: 'Cooperative zombie-slaying. Love the miniatures and the intensity',
    tags: ['cooperative', 'miniatures', 'survival'],
  },
  {
    title: 'Final Girl',
    status: 'active',
    desc: 'Solo horror movie-inspired game. Surprisingly tense every run',
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
/* ── Root ── */
.gaming-root {
  padding: 2rem 1rem 3rem;
  display: flex;
  justify-content: center;
  min-height: calc(100vh - var(--navbar-height));
}

/* ── Terminal window ── */
.gaming-window {
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
.gaming-titlebar {
  background: #161b22;
  border-bottom: 1px solid #30363d;
  padding: 0.65rem 1rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.gaming-buttons {
  display: flex;
  gap: 0.45rem;
}

.gaming-btn {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  display: block;
  opacity: 0.5;
  transition: opacity 0.2s ease;
  cursor: default;
}

.gaming-btn--close { background: #ff5f57; }
.gaming-btn--minimize { background: #febc2e; }
.gaming-btn--maximize { background: #28c840; }

.gaming-titlebar:hover .gaming-btn { opacity: 0.7; }

.gaming-title {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.75rem;
  color: var(--color-text-3);
  flex: 1;
  text-align: center;
  margin-right: 60px;
}

/* ── Terminal content ── */
.gaming-content {
  padding: 1.5rem 1.5rem;
  font-family: 'JetBrains Mono', 'Fira Code', 'Cascadia Code', monospace;
  font-size: 0.875rem;
  line-height: 1.6;
}

/* ── Prompt ── */
.gaming-prompt {
  color: var(--color-text-2);
  margin: 1.75rem 0 0.65rem;
}

.gaming-prompt:first-child {
  margin-top: 0;
}

.gaming-user {
  color: #56d364;
  font-weight: 600;
}

.gaming-path {
  color: #1bb2e5;
  font-weight: 600;
}

.gaming-cmd {
  color: var(--color-text-1);
}

.gaming-cursor {
  color: #1bb2e5;
  animation: gaming-blink 1.5s step-end infinite;
}

@keyframes gaming-blink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
}

/* ── Output ── */
.gaming-output {
  margin-bottom: 0.75rem;
}

.gaming-readme {
  padding: 0.75rem 0;
}

.gaming-readme-title {
  color: var(--color-accent);
  font-weight: 700;
  font-size: 1.15rem;
  margin-bottom: 0.5rem;
}

.gaming-readme-text {
  font-family: Georgia, 'Times New Roman', serif;
  color: var(--color-text-2);
  font-size: 0.95rem;
  line-height: 1.6;
}

.gaming-info-line {
  display: flex;
  gap: 0.75rem;
  padding: 0.25rem 0;
}

.gaming-label {
  color: #88c0d0;
  font-weight: 600;
  min-width: 85px;
}

.gaming-value {
  font-family: Georgia, 'Times New Roman', serif;
  color: var(--color-text-2);
}

/* ── Game lines ── */
.gaming-game-line {
  display: flex;
  flex-wrap: wrap;
  padding: 0.5rem 0.75rem;
  border-radius: 3px;
  transition: background 0.15s ease;
  margin-bottom: 0.1rem;
}

.gaming-game-line:hover {
  background: rgba(27, 178, 229, 0.08);
}

.gaming-perms {
  color: var(--color-text-3);
  margin-right: 0.75rem;
  font-size: 0.8rem;
}

.gaming-links {
  color: var(--color-text-3);
  margin-right: 0.75rem;
  width: 1.5rem;
  text-align: right;
  font-size: 0.8rem;
}

.gaming-status {
  margin-right: 0.75rem;
  font-weight: 600;
  min-width: 70px;
}

.gaming-game--active .gaming-status {
  color: #56d364;
}

.gaming-game--shelved .gaming-status {
  color: var(--color-text-3);
  opacity: 0.7;
}

.gaming-game--wip .gaming-status {
  color: #e3b341;
}

.gaming-game-name {
  color: #1bb2e5;
  font-weight: 600;
  margin-right: 1rem;
}

.gaming-game-desc {
  flex: 1 1 100%;
  font-family: Georgia, 'Times New Roman', serif;
  color: var(--color-text-2);
  padding-left: 8rem;
  margin-top: 0.15rem;
  font-size: 0.85rem;
}

.gaming-game-tags {
  flex: 1 1 100%;
  color: var(--color-text-3);
  padding-left: 8rem;
  margin-top: 0.15rem;
  font-size: 0.75rem;
}

/* ── Mechanics ── */
.gaming-mechanic {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 0.5rem;
  padding: 0.35rem 0;
}

.gaming-mechanic-icon {
  color: #1bb2e5;
  font-size: 0.7rem;
  width: 1.5rem;
  text-align: center;
}

.gaming-mechanic-label {
  color: var(--color-text-1);
  font-weight: 600;
  margin-right: 0.5rem;
}

.gaming-mechanic-desc {
  flex: 1 1 100%;
  font-family: Georgia, 'Times New Roman', serif;
  color: var(--color-text-3);
  font-size: 0.85rem;
  padding-left: 2rem;
}

/* ── Contact ── */
.gaming-contact {
  font-family: Georgia, 'Times New Roman', serif;
  color: var(--color-text-2);
  font-size: 0.875rem;
  line-height: 1.6;
  padding-left: 0.65rem;
  border-left: 1px solid rgba(27, 178, 229, 0.12);
}

.gaming-contact a {
  color: var(--color-accent);
  text-decoration: underline;
  text-underline-offset: 2px;
  text-decoration-thickness: 1px;
  text-decoration-color: rgba(27, 178, 229, 0.4);
  transition: text-decoration-color 0.15s ease;
}

.gaming-contact a:hover {
  text-decoration-color: var(--color-accent);
}

/* ── Responsive ── */
@media (max-width: 768px) {
  .gaming-content {
    padding: 1.25rem 1rem;
    font-size: 0.8rem;
  }

  .gaming-perms,
  .gaming-links {
    display: none;
  }

  .gaming-game-desc,
  .gaming-game-tags {
    padding-left: 5rem;
  }
}

@media (max-width: 480px) {
  .gaming-content {
    font-size: 0.75rem;
  }

  .gaming-status {
    min-width: 60px;
  }

  .gaming-game-desc,
  .gaming-game-tags {
    padding-left: 0;
  }

  .gaming-game-line {
    flex-direction: column;
    gap: 0.25rem;
  }
}

/* ── Reduced motion ── */
@media (prefers-reduced-motion: reduce) {
  .gaming-cursor { animation: none; opacity: 1; }
}
</style>
