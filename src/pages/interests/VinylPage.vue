<template>
  <div class="vinyl-root">
    <!-- Terminal window -->
    <div class="vinyl-window">
      <!-- Title bar -->
      <div class="vinyl-titlebar">
        <div class="vinyl-buttons">
          <span class="vinyl-btn vinyl-btn--close" aria-hidden="true"></span>
          <span class="vinyl-btn vinyl-btn--minimize" aria-hidden="true"></span>
          <span class="vinyl-btn vinyl-btn--maximize" aria-hidden="true"></span>
        </div>
        <span class="vinyl-title">janis@phyberapex: ~/interests/vinyl</span>
      </div>

      <!-- Terminal content -->
      <div class="vinyl-content">
        <!-- Header prompt -->
        <div class="vinyl-prompt">
          <span class="vinyl-user">janis@phyberapex</span>:<span class="vinyl-path">~/interests/vinyl</span>$ <span class="vinyl-cmd">cat README</span>
        </div>

        <div class="vinyl-output">
          <div class="vinyl-readme">
            <div class="vinyl-readme-title"># Vinyl Collection</div>
            <div class="vinyl-readme-text">Game &amp; anime OSTs. All wall-mounted. A listening collection and a display.</div>
          </div>
        </div>

        <!-- Crate listing -->
        <div class="vinyl-prompt">
          <span class="vinyl-user">janis@phyberapex</span>:<span class="vinyl-path">~/interests/vinyl</span>$ <span class="vinyl-cmd">crate --list</span>
        </div>

        <div class="vinyl-output">
          <div
            v-for="(record, i) in records"
            :key="record.title"
            class="vinyl-record"
            :class="{ 'vinyl-record--spinning': record.featured }"
          >
            <span class="vinyl-swatch" :style="{ background: record.color }" aria-hidden="true"></span>
            <span class="vinyl-slot">{{ String(i + 1).padStart(2, '0') }}.</span>
            <span class="vinyl-record-title">{{ record.title }}</span>
            <span v-if="record.featured" class="vinyl-spinning-tag" aria-hidden="true">▶ spinning</span>
            <div class="vinyl-record-meta">
              <span class="vinyl-artist">{{ record.artist }}</span>
              <span class="vinyl-sep" aria-hidden="true">·</span>
              <span class="vinyl-note">{{ record.note }}</span>
            </div>
          </div>
        </div>

        <!-- Closing -->
        <div class="vinyl-prompt">
          <span class="vinyl-user">janis@phyberapex</span>:<span class="vinyl-path">~/interests/vinyl</span>$ <span class="vinyl-cursor" aria-hidden="true">█</span>
        </div>

        <div class="vinyl-prompt">
          <span class="vinyl-user">janis@phyberapex</span>:<span class="vinyl-path">~/interests/vinyl</span>$ <span class="vinyl-cmd">cat CONTACT.txt</span>
        </div>

        <div class="vinyl-output">
          <div class="vinyl-contact">
            Playing anything from the Cyberpunk 2077 or Hades OST? Tell me what I'm missing — <a href="https://www.linkedin.com/in/janis-walliser-41687278/" target="_blank" rel="noopener noreferrer">find me on LinkedIn</a>.
          </div>
        </div>
      </div>
    </div>
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
/* ── Root ── */
.vinyl-root {
  padding: 2rem 1rem 3rem;
  display: flex;
  justify-content: center;
  min-height: calc(100vh - var(--navbar-height));
}

/* ── Terminal window ── */
.vinyl-window {
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
.vinyl-titlebar {
  background: #161b22;
  border-bottom: 1px solid #30363d;
  padding: 0.65rem 1rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.vinyl-buttons {
  display: flex;
  gap: 0.45rem;
}

.vinyl-btn {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  display: block;
  opacity: 0.5;
  transition: opacity 0.2s ease;
  cursor: default;
}

.vinyl-btn--close { background: #ff5f57; }
.vinyl-btn--minimize { background: #febc2e; }
.vinyl-btn--maximize { background: #28c840; }

.vinyl-titlebar:hover .vinyl-btn { opacity: 0.7; }

.vinyl-title {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.75rem;
  color: var(--color-text-3);
  flex: 1;
  text-align: center;
  margin-right: 60px;
}

/* ── Terminal content ── */
.vinyl-content {
  padding: 1.5rem 1.5rem;
  font-family: 'JetBrains Mono', 'Fira Code', 'Cascadia Code', monospace;
  font-size: 0.875rem;
  line-height: 1.6;
}

/* ── Prompt ── */
.vinyl-prompt {
  color: var(--color-text-2);
  margin: 1.75rem 0 0.65rem;
}

.vinyl-prompt:first-child {
  margin-top: 0;
}

.vinyl-user {
  color: #56d364;
  font-weight: 600;
}

.vinyl-path {
  color: #1bb2e5;
  font-weight: 600;
}

.vinyl-cmd {
  color: var(--color-text-1);
}

.vinyl-cursor {
  color: #1bb2e5;
  animation: vinyl-blink 1.5s step-end infinite;
}

@keyframes vinyl-blink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
}

/* ── Output ── */
.vinyl-output {
  margin-bottom: 0.75rem;
}

.vinyl-readme {
  padding: 0.75rem 0;
}

.vinyl-readme-title {
  color: var(--color-accent);
  font-weight: 700;
  font-size: 1.15rem;
  margin-bottom: 0.5rem;
}

.vinyl-readme-text {
  font-family: Georgia, 'Times New Roman', serif;
  color: var(--color-text-2);
  font-size: 0.95rem;
  line-height: 1.6;
}

/* ── Record ── */
.vinyl-record {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 0.5rem;
  padding: 0.65rem 0.75rem;
  border-left: 2px solid transparent;
  transition: border-color 0.15s ease, background 0.15s ease;
  border-radius: 3px;
}

.vinyl-record:hover {
  background: rgba(27, 178, 229, 0.05);
  border-left-color: rgba(27, 178, 229, 0.2);
}

.vinyl-record--spinning {
  background: rgba(27, 178, 229, 0.08);
  border-left-color: rgba(27, 178, 229, 0.3);
}

.vinyl-record--spinning:hover {
  background: rgba(27, 178, 229, 0.12);
  border-left-color: rgba(27, 178, 229, 0.4);
}

.vinyl-swatch {
  width: 16px;
  height: 16px;
  border-radius: 3px;
  flex-shrink: 0;
  margin-top: 0.2rem;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.2);
}

.vinyl-slot {
  color: var(--color-text-3);
  font-size: 0.8rem;
  min-width: 2rem;
}

.vinyl-record-title {
  color: #1bb2e5;
  font-weight: 600;
  font-size: 0.9rem;
}

.vinyl-spinning-tag {
  color: var(--color-accent);
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  animation: vinyl-pulse 2s ease-in-out infinite;
}

@keyframes vinyl-pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
}

.vinyl-record-meta {
  flex: 1 1 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 0.4rem;
  padding-left: 2.5rem;
  margin-top: 0.15rem;
}

.vinyl-artist {
  color: #88c0d0;
  font-size: 0.8rem;
  font-weight: 600;
}

.vinyl-sep {
  color: var(--color-border);
  font-size: 0.75rem;
}

.vinyl-note {
  font-family: Georgia, 'Times New Roman', serif;
  color: var(--color-text-3);
  font-size: 0.85rem;
  line-height: 1.5;
}

/* ── Contact ── */
.vinyl-contact {
  font-family: Georgia, 'Times New Roman', serif;
  color: var(--color-text-2);
  font-size: 0.875rem;
  line-height: 1.6;
  padding-left: 0.65rem;
  border-left: 1px solid rgba(27, 178, 229, 0.12);
}

.vinyl-contact a {
  color: var(--color-accent);
  text-decoration: underline;
  text-underline-offset: 2px;
  text-decoration-thickness: 1px;
  text-decoration-color: rgba(27, 178, 229, 0.4);
  transition: text-decoration-color 0.15s ease;
}

.vinyl-contact a:hover {
  text-decoration-color: var(--color-accent);
}

/* ── Responsive ── */
@media (max-width: 768px) {
  .vinyl-content {
    padding: 1.25rem 1rem;
    font-size: 0.8rem;
  }

  .vinyl-record-meta {
    padding-left: 2rem;
  }
}

@media (max-width: 480px) {
  .vinyl-content {
    font-size: 0.75rem;
  }

  .vinyl-record-meta {
    padding-left: 0;
  }

  .vinyl-record {
    flex-direction: column;
    gap: 0.35rem;
  }
}

/* ── Reduced motion ── */
@media (prefers-reduced-motion: reduce) {
  .vinyl-cursor { animation: none; opacity: 1; }
}
</style>
