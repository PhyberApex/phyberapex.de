<template>
  <div class="cs-root">
    <div class="cs-sheet">

      <!-- Top rule -->
      <div class="cs-top-rule" aria-hidden="true">
        <span class="cs-diamond">◈</span>
        <span class="cs-rule-line"></span>
        <span class="cs-rule-label">CHARACTER RECORD SHEET</span>
        <span class="cs-rule-line"></span>
        <span class="cs-diamond">◈</span>
      </div>

      <!-- Header -->
      <header class="cs-header">
        <div class="cs-portrait-wrap">
          <img src="/images/me1.jpg" alt="Portrait of Janis Walliser" class="cs-portrait" />
        </div>
        <div class="cs-identity">
          <h1 class="cs-name">Janis Walliser</h1>
          <div class="cs-meta-grid">
            <div v-for="field in META_FIELDS" :key="field.label" class="cs-meta-field">
              <span class="cs-field-label">{{ field.label }}</span>
              <span class="cs-field-value">{{ field.value }}</span>
            </div>
          </div>
        </div>
      </header>

      <div class="cs-sep" aria-hidden="true"><span>✦</span></div>

      <!-- Body -->
      <div class="cs-body">

        <!-- Sidebar -->
        <aside class="cs-sidebar">

          <!-- Ability Scores -->
          <section class="cs-section">
            <h2 class="cs-section-title">Ability Scores</h2>
            <div class="cs-scores-grid">
              <div
                v-for="stat in STATS"
                :key="stat.abbr"
                class="cs-score-block"
                tabindex="0"
                :aria-label="`${stat.name}: ${stat.value} (${stat.mod}). ${stat.flavor}`"
              >
                <span class="cs-score-abbr">{{ stat.abbr }}</span>
                <span class="cs-score-val">{{ stat.value }}</span>
                <span class="cs-score-mod" :class="{ 'cs-score-mod--neg': stat.neg }">{{ stat.mod }}</span>
                <div class="cs-tooltip" role="tooltip">{{ stat.flavor }}</div>
              </div>
            </div>
          </section>

          <!-- Equipment -->
          <section class="cs-section">
            <h2 class="cs-section-title">Equipment</h2>
            <ul class="cs-plain-list">
              <li v-for="item in EQUIPMENT" :key="item">
                <span class="cs-bullet" aria-hidden="true">▸</span>{{ item }}
              </li>
            </ul>
          </section>

          <!-- Active Quests -->
          <section class="cs-section">
            <h2 class="cs-section-title">Active Quests</h2>
            <ul class="cs-quest-list">
              <li v-for="q in QUESTS" :key="q.label">
                <span class="cs-quest-label">{{ q.label }}</span>
                <span class="cs-quest-text">{{ q.text }}</span>
                <span class="cs-quest-flavor">{{ q.flavor }}</span>
              </li>
            </ul>
          </section>

        </aside>

        <!-- Main -->
        <main class="cs-main">

          <!-- Lore -->
          <section class="cs-section cs-section--lore">
            <h2 class="cs-section-title">Background Lore</h2>
            <p class="cs-prose">Principal Member of Technical Staff at Salesforce — the kind of engineer who becomes the unofficial security oracle for multiple teams without meaning to. Architects scalable frontends, reviews code for vulnerabilities, and mentors engineers who will someday write better code than him. Considers that a win.</p>
            <p class="cs-prose">Certified Vue Developer. TypeScript devotee. The person colleagues ping when a JWT looks suspicious or a Content-Security-Policy is misbehaving.</p>
            <p class="cs-prose">Off the clock: painting Zombicide miniatures one survivor at a time, curating video game OSTs on vinyl, and strategically losing board game sessions to maintain household morale.</p>
          </section>

          <!-- Skills -->
          <section class="cs-section" ref="skillsRef">
            <h2 class="cs-section-title">Skills &amp; Proficiencies</h2>
            <div class="cs-skills">
              <div v-for="skill in SKILLS" :key="skill.name" class="cs-skill-row">
                <span class="cs-skill-name">{{ skill.name }}</span>
                <div class="cs-pips" :class="{ 'cs-pips--on': skillsVisible }" aria-hidden="true">
                  <span
                    v-for="n in 5"
                    :key="n"
                    class="cs-pip"
                    :class="n <= skill.pips ? 'cs-pip--filled' : 'cs-pip--empty'"
                    :style="{ '--pip-delay': `${(n - 1) * 90}ms` }"
                  >{{ n <= skill.pips ? '◉' : '○' }}</span>
                </div>
                <span class="cs-skill-rank">{{ skill.level }}</span>
              </div>
            </div>
          </section>

          <!-- Contact -->
          <section class="cs-section">
            <h2 class="cs-section-title">Summon Via</h2>
            <div class="cs-summon-links">
              <a
                href="https://www.linkedin.com/in/janis-walliser-41687278/"
                class="cs-summon-btn cs-summon-btn--primary"
                target="_blank"
                rel="noopener noreferrer"
              >LinkedIn</a>
              <a
                href="https://github.com/PhyberApex"
                class="cs-summon-btn"
                target="_blank"
                rel="noopener noreferrer"
              >GitHub</a>
            </div>
          </section>

        </main>
      </div>

      <div class="cs-sep" aria-hidden="true"><span>✦</span></div>

      <!-- Party Members -->
      <section class="cs-section cs-party-section">
        <h2 class="cs-section-title cs-section-title--center">Party Members</h2>
        <div class="cs-party-grid">
          <div v-for="member in PARTY" :key="member.name" class="cs-party-member">

            <div v-if="member.photo" class="cs-polaroid" :style="{ '--rot': member.rot + 'deg' }">
              <img :src="member.photo" :alt="member.name" class="cs-polaroid-img" loading="lazy" />
              <p class="cs-polaroid-cap">{{ member.caption }}</p>
            </div>

            <div v-else class="cs-party-text-card">
              <span class="cs-party-heart" aria-hidden="true">♥</span>
              <strong class="cs-party-name">{{ member.name }}</strong>
              <span class="cs-party-role">{{ member.role }}</span>
              <span class="cs-party-note">{{ member.note }}</span>
            </div>

          </div>
        </div>
      </section>

      <!-- Bottom rule -->
      <div class="cs-bottom-rule" aria-hidden="true">
        <span class="cs-diamond">◈</span>
        <span class="cs-rule-line"></span>
        <span class="cs-rule-label">phyberapex.de</span>
        <span class="cs-rule-line"></span>
        <span class="cs-diamond">◈</span>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const META_FIELDS = [
  { label: 'Class',      value: 'PMTS Software Engineer' },
  { label: 'Subclass',   value: 'Security Warden' },
  { label: 'Background', value: 'Rhine Valley Tinkerer' },
  { label: 'Alignment',  value: 'Chaotic Good' },
  { label: 'Level',      value: 'PMTS (≈ 15)' },
  { label: 'Location',   value: 'Kaiserslautern, DE' },
]

const STATS = [
  { abbr: 'STR', name: 'Strength',     value: 8,  mod: '−1', flavor: 'Prefers keyboard to kettlebells.', neg: true },
  { abbr: 'DEX', name: 'Dexterity',    value: 12, mod: '+1', flavor: 'Steady enough to paint 28mm eyes.' },
  { abbr: 'CON', name: 'Constitution', value: 14, mod: '+2', flavor: 'Survives multi-year Gloomhaven campaigns.' },
  { abbr: 'INT', name: 'Intelligence', value: 18, mod: '+4', flavor: 'Primary stat. Does not apologize.' },
  { abbr: 'WIS', name: 'Wisdom',       value: 15, mod: '+2', flavor: 'Knows which PR needs the security review.' },
  { abbr: 'CHA', name: 'Charisma',     value: 16, mod: '+3', flavor: 'Senior engineers still answer his Slack.' },
]

const SKILLS = [
  { name: 'Board Games',        pips: 5, level: 'Master' },
  { name: 'Vue.js',             pips: 5, level: 'Master' },
  { name: 'TypeScript',         pips: 4, level: 'Expert' },
  { name: 'App Security',       pips: 4, level: 'Expert' },
  { name: 'Vinyl Curation',     pips: 4, level: 'Expert' },
  { name: 'NestJS / Node',      pips: 3, level: 'Proficient' },
  { name: 'Miniature Painting', pips: 2, level: 'Adept' },
]

const EQUIPMENT = [
  'TypeScript 5.x',
  'Vue 3 + Composition API',
  'NestJS',
  'Vite',
  'Node.js',
  'OWASP Toolkit',
  'Citadel Paints (Contrast)',
]

const QUESTS = [
  { label: 'Spinning',   text: 'VA-11 HALL-A OST',       flavor: 'quest giver: rainy afternoon' },
  { label: 'Painting',   text: 'Zombicide survivors',      flavor: 'status: base coat in progress' },
  { label: 'Collecting', text: '16 Salesforce plushies', flavor: 'reward: unclear. still going.' },
]

const PARTY = [
  { name: 'Morty',           caption: 'Morty · Good Boy · Age 7',  photo: '/images/morty1.jpg',  rot: -2,   role: null, note: null },
  { name: 'Morty (Cosplay)', caption: 'Halloween specialist',        photo: '/images/morty2.jpeg', rot:  1.5, role: null, note: null },
  { name: 'Morty (Reveal)',  caption: 'The big reveal',              photo: '/images/morty3.jpg',  rot: -1,   role: null, note: null },
  { name: 'The Family',      caption: null, photo: null, rot: 0,
    role: 'Wife · Son · Young Child',
    note: 'Support party. Healers. The reason to ship clean code.' },
]

const skillsVisible = ref(false)
const skillsRef = ref(null)
let observer = null

onMounted(() => {
  const prefersReduced =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (prefersReduced) {
    skillsVisible.value = true
    return
  }

  observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        skillsVisible.value = true
        observer?.disconnect()
      }
    },
    { threshold: 0.15 }
  )

  if (skillsRef.value) observer.observe(skillsRef.value)
})

onUnmounted(() => {
  observer?.disconnect()
})
</script>

<style scoped>
/* (no animated custom property needed — using pip system) */

/* ── Root ── */
.cs-root {
  min-height: calc(100vh - var(--navbar-height, 3.6rem));
  background-color: var(--color-bg);
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 3rem 1.5rem 5rem;
}

/* ── Sheet ── */
.cs-sheet {
  width: 100%;
  max-width: 920px;
  background: #111827;
  border: 1px solid #30363d;
  border-radius: 10px;
  box-shadow:
    0 28px 64px rgba(0, 0, 0, 0.65),
    0 0 0 1px rgba(27, 178, 229, 0.18),
    inset 0 0 0 5px var(--color-bg),
    inset 0 0 0 6px rgba(27, 178, 229, 0.2);
  overflow: hidden;
}

/* ── Top / Bottom rules ── */
.cs-top-rule,
.cs-bottom-rule {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.9rem 2rem;
  font-family: 'JetBrains Mono', 'Fira Code', 'Cascadia Code', monospace;
  font-size: 0.62rem;
  letter-spacing: 0.22em;
  color: var(--color-accent);
  text-transform: uppercase;
}

.cs-bottom-rule {
  margin-top: 0;
  border-top: 1px solid var(--color-border-subtle);
}

.cs-rule-line {
  flex: 1;
  height: 1px;
  background: linear-gradient(to right, transparent, rgba(27, 178, 229, 0.4), transparent);
}

.cs-diamond { flex-shrink: 0; opacity: 0.6; }
.cs-rule-label { flex-shrink: 0; }

/* ── Header ── */
.cs-header {
  display: flex;
  gap: 1.75rem;
  align-items: flex-start;
  padding: 1.1rem 2rem 1.9rem;
  border-bottom: 1px solid var(--color-border-subtle);
}

.cs-portrait {
  width: 96px;
  height: 96px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #88c0d0;
  box-shadow: 0 0 0 4px rgba(136, 192, 208, 0.12), 0 4px 20px rgba(0, 0, 0, 0.5);
  flex-shrink: 0;
}

.cs-identity { flex: 1; min-width: 0; }

.cs-name {
  font-family: Georgia, 'Times New Roman', serif;
  font-size: 1.9rem;
  font-weight: 700;
  color: #e6edf3;
  margin: 0 0 0.7rem;
  line-height: 1.1;
  letter-spacing: -0.01em;
}

.cs-meta-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.45rem 1.25rem;
}

.cs-meta-field { display: flex; flex-direction: column; gap: 0.08rem; }

.cs-field-label {
  font-family: 'JetBrains Mono', 'Fira Code', monospace;
  font-size: 0.58rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: #8b949e;
}

.cs-field-value {
  font-family: 'JetBrains Mono', 'Fira Code', monospace;
  font-size: 0.77rem;
  color: #c9d1d9;
  font-weight: 500;
}

/* ── Separator ── */
.cs-sep {
  text-align: center;
  color: #1bb2e5;
  font-size: 0.75rem;
  padding: 0.9rem 0;
  opacity: 0.55;
}

/* ── Body ── */
.cs-body {
  display: flex;
  padding: 0 2rem 0.5rem;
  align-items: flex-start;
}

.cs-sidebar {
  width: 255px;
  flex-shrink: 0;
  border-right: 1px solid #21262d;
  padding-right: 1.75rem;
  padding-top: 0.5rem;
  padding-bottom: 1rem;
}

.cs-main {
  flex: 1;
  min-width: 0;
  padding-left: 1.75rem;
  padding-top: 0.5rem;
  padding-bottom: 1rem;
}

/* ── Section ── */
.cs-section { margin-bottom: 1.6rem; }
.cs-section--lore { margin-bottom: 2.25rem; }

.cs-section-title {
  font-family: 'JetBrains Mono', 'Fira Code', monospace;
  font-size: 0.6rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: #1bb2e5;
  margin: 0 0 0.7rem;
  padding-bottom: 0.3rem;
  border-bottom: 1px solid rgba(27, 178, 229, 0.2);
  font-weight: 600;
}

.cs-section-title--center { text-align: center; }

/* ── Ability Scores ── */
.cs-scores-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.45rem;
}

.cs-score-block {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.5rem 0.25rem 0.4rem;
  background: #161b22;
  border: 1px solid #30363d;
  border-radius: 5px;
  cursor: default;
  transition: border-color 0.15s ease, box-shadow 0.15s ease;
  line-height: 1.15;
}

.cs-score-block:hover,
.cs-score-block:focus-visible {
  border-color: #1bb2e5;
  box-shadow: 0 0 0 2px rgba(27, 178, 229, 0.12);
  outline: none;
  z-index: 5;
}

.cs-score-abbr {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.56rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: #8b949e;
  font-weight: 600;
}

.cs-score-val {
  font-family: Georgia, 'Times New Roman', serif;
  font-size: 1.45rem;
  font-weight: 700;
  color: #e6edf3;
  line-height: 1.1;
}

.cs-score-mod {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.68rem;
  color: #1bb2e5;
  font-weight: 600;
}

.cs-score-mod--neg { color: #c97b8c; }

/* ── Tooltip ── */
.cs-tooltip {
  position: absolute;
  bottom: calc(100% + 7px);
  left: 50%;
  transform: translateX(-50%);
  background: #161b22;
  border: 1px solid #1bb2e5;
  border-radius: 5px;
  padding: 0.3rem 0.55rem;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.67rem;
  color: #c9d1d9;
  white-space: nowrap;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.15s ease;
  z-index: 20;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.6);
}

.cs-tooltip::after {
  content: '';
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  border: 5px solid transparent;
  border-top-color: #1bb2e5;
}

.cs-score-block:hover .cs-tooltip,
.cs-score-block:focus-visible .cs-tooltip {
  opacity: 1;
}

/* Left column — pin tooltip to left edge of block */
.cs-score-block:nth-child(3n+1) .cs-tooltip {
  left: 0;
  transform: none;
}
.cs-score-block:nth-child(3n+1) .cs-tooltip::after {
  left: 1rem;
  transform: none;
}

/* Right column — pin tooltip to right edge of block */
.cs-score-block:nth-child(3n) .cs-tooltip {
  left: auto;
  right: 0;
  transform: none;
}
.cs-score-block:nth-child(3n) .cs-tooltip::after {
  left: auto;
  right: 1rem;
  transform: none;
}

/* ── Plain list (equipment) ── */
.cs-plain-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.28rem;
}

.cs-plain-list li {
  display: flex;
  align-items: baseline;
  gap: 0.4rem;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.76rem;
  color: #c9d1d9;
}

.cs-bullet { color: rgba(27, 178, 229, 0.6); font-size: 0.6rem; flex-shrink: 0; }

/* ── Quest list ── */
.cs-quest-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.cs-quest-list li { display: flex; flex-direction: column; gap: 0.05rem; }

.cs-quest-label {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.57rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #8b949e;
}

.cs-quest-text {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.76rem;
  color: #c9d1d9;
}

.cs-quest-flavor {
  font-family: Georgia, serif;
  font-size: 0.67rem;
  color: #6e7681;
  font-style: italic;
  margin-top: 0.05rem;
}

/* ── Prose ── */
.cs-prose {
  font-family: Georgia, 'Times New Roman', serif;
  font-size: 0.9rem;
  line-height: 1.72;
  color: #c9d1d9;
  margin: 0 0 0.8rem;
}

.cs-prose:last-child { margin-bottom: 0; }

/* ── Skills ── */
.cs-skills { display: flex; flex-direction: column; gap: 0.55rem; }

.cs-skill-row {
  display: grid;
  grid-template-columns: 155px 1fr 78px;
  align-items: center;
  gap: 0.7rem;
}

.cs-skill-name {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.77rem;
  color: #c9d1d9;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* ── Pips ── */
.cs-pips {
  display: flex;
  gap: 0.35rem;
  align-items: center;
}

.cs-pip {
  font-size: 0.7rem;
  transition: color 0.25s ease var(--pip-delay, 0ms), opacity 0.25s ease var(--pip-delay, 0ms);
}

.cs-pip--filled {
  color: var(--color-accent);
  opacity: 0;
}

.cs-pip--empty {
  color: #30363d;
  opacity: 1;
}

.cs-pips--on .cs-pip--filled { opacity: 1; }

.cs-skill-rank {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.62rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #8b949e;
  text-align: right;
}

/* ── Summon links ── */
.cs-summon-links { display: flex; gap: 0.65rem; flex-wrap: wrap; }

.cs-summon-btn {
  display: inline-block;
  padding: 0.45rem 1.1rem;
  border: 1px solid #30363d;
  border-radius: 5px;
  background: #161b22;
  color: #c9d1d9;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.82rem;
  text-decoration: none;
  transition: border-color 0.15s ease, color 0.15s ease;
}

.cs-summon-btn:hover { border-color: #1bb2e5; color: #1bb2e5; text-decoration: none; }

.cs-summon-btn--primary {
  background: #1bb2e5;
  border-color: #1bb2e5;
  color: #0b0f1a;
  font-weight: 600;
}

.cs-summon-btn--primary:hover {
  background: #0ea5d4;
  border-color: #0ea5d4;
  color: #0b0f1a;
}

/* ── Party section ── */
.cs-party-section { padding: 0 2rem; margin-bottom: 0; }

.cs-party-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  justify-content: center;
  padding: 0.5rem 0 2rem;
}

/* ── Polaroid ── */
.cs-polaroid {
  background: #f0ede8;
  padding: 0.55rem 0.55rem 2.2rem;
  box-shadow: 0 6px 24px rgba(0, 0, 0, 0.55), 0 1px 4px rgba(0, 0, 0, 0.3);
  rotate: var(--rot);
  transition:
    rotate 0.28s cubic-bezier(0.22, 1, 0.36, 1),
    scale 0.28s cubic-bezier(0.22, 1, 0.36, 1),
    box-shadow 0.28s ease;
  cursor: default;
  width: 155px;
  position: relative;
}

.cs-polaroid:hover {
  rotate: 0deg;
  scale: 1.06;
  box-shadow: 0 16px 48px rgba(0, 0, 0, 0.7), 0 2px 8px rgba(0, 0, 0, 0.4);
  z-index: 10;
}

.cs-polaroid-img {
  width: 100%;
  aspect-ratio: 1 / 1;
  object-fit: cover;
  display: block;
}

.cs-polaroid-cap {
  font-family: Georgia, serif;
  font-size: 0.68rem;
  color: #3a3028;
  text-align: center;
  margin: 0.45rem 0 0;
  line-height: 1.3;
}

/* ── Party text card ── */
.cs-party-text-card {
  width: 155px;
  min-height: 155px;
  background: #161b22;
  border: 1px solid #30363d;
  border-radius: 6px;
  padding: 1.1rem 0.75rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 0.3rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
}

.cs-party-heart { font-size: 1.4rem; color: #ff7b9c; display: block; margin-bottom: 0.1rem; }
.cs-party-name  { font-family: 'JetBrains Mono', monospace; font-size: 0.77rem; color: #e6edf3; font-weight: 600; }
.cs-party-role  { font-family: 'JetBrains Mono', monospace; font-size: 0.62rem; color: #8b949e; }
.cs-party-note  { font-family: Georgia, serif; font-size: 0.7rem; color: #c9d1d9; font-style: italic; margin-top: 0.2rem; line-height: 1.4; }

/* ── Reduced motion ── */
@media (prefers-reduced-motion: reduce) {
  .cs-skill-fill { transition: none; }
  .cs-polaroid, .cs-polaroid:hover { transition: none; rotate: 0deg; scale: 1; }
}

/* ── Responsive ── */
@media (max-width: 720px) {
  .cs-body { flex-direction: column; padding: 0 1.25rem 0.5rem; }
  .cs-sidebar { width: 100%; border-right: none; border-bottom: 1px solid #21262d; padding-right: 0; padding-bottom: 1.25rem; }
  .cs-main { padding-left: 0; }
  .cs-header { flex-direction: column; padding: 0.9rem 1.25rem 1.5rem; }
  .cs-meta-grid { grid-template-columns: repeat(2, 1fr); }
  .cs-skill-row { grid-template-columns: 120px 1fr 60px; }
  .cs-party-section { padding: 0 1.25rem; }
  .cs-top-rule, .cs-bottom-rule { padding: 0.9rem 1.25rem; }
}

@media (max-width: 480px) {
  .cs-name { font-size: 1.5rem; }
  .cs-skill-row { grid-template-columns: 100px 1fr 52px; }
  .cs-scores-grid { grid-template-columns: repeat(3, 1fr); gap: 0.35rem; }
}

@media (min-width: 1280px) {
  .cs-sheet { max-width: 1080px; }
  .cs-sidebar { width: 290px; }
  .cs-skill-row { grid-template-columns: 175px 1fr 88px; }
  .cs-name { font-size: 2.25rem; }
}

@media (min-width: 1600px) {
  .cs-sheet { max-width: 1240px; }
  .cs-sidebar { width: 320px; }
}
</style>
