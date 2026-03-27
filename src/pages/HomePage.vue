<template>
  <div class="th-root">
    <!-- macOS-style terminal window -->
    <div class="th-window">
      <div class="th-titlebar">
        <div class="th-dots">
          <span class="th-dot th-dot--r" aria-hidden="true"></span>
          <span class="th-dot th-dot--y" aria-hidden="true"></span>
          <span class="th-dot th-dot--g" aria-hidden="true"></span>
        </div>
        <span class="th-title" aria-hidden="true">phyberapex — zsh</span>
      </div>

      <div class="th-body" aria-label="Terminal session">
        <!-- Static prompt header -->
        <div class="th-header-prompt" aria-hidden="true">
          <span class="th-host">phyberapex</span><span class="th-sym">@</span><span class="th-host">home</span><span class="th-sym">:</span><span class="th-path">~</span>
        </div>

        <!-- Rendered history lines -->
        <div
          v-for="(line, i) in lines"
          :key="i"
          class="th-line"
          :class="`th-line--${line.type}`"
        >
          <template v-if="line.type === 'cmd'">
            <span class="th-chevron" aria-hidden="true">❯ </span>{{ line.text }}
          </template>
          <template v-else-if="line.type === 'dirs'">
            <span v-for="d in line.items" :key="d" class="th-dir">{{ d }}</span>
          </template>
          <template v-else-if="line.type === 'out'">{{ line.text }}</template>
          <!-- gap: empty by design -->
        </div>

        <!-- Line currently being typed -->
        <div v-if="typing !== null" class="th-line th-line--cmd" aria-live="polite">
          <span class="th-chevron" aria-hidden="true">❯ </span>{{ typing }}<span class="th-cursor" aria-hidden="true">█</span>
        </div>

        <!-- Final blinking cursor (idle, waiting for input) -->
        <div v-else-if="blinking" class="th-line th-line--cmd">
          <span class="th-chevron" aria-hidden="true">❯ </span><span class="th-cursor th-cursor--blink" aria-hidden="true">█</span>
        </div>
      </div>
    </div>

    <!-- Navigation links revealed after animation completes -->
    <nav class="th-nav" :class="{ 'th-nav--visible': blinking }" aria-label="Site navigation">
      <router-link to="/cv" class="th-btn th-btn--primary" style="--i:0">English CV →</router-link>
      <div class="th-links" aria-label="More pages">
        <router-link to="/about" class="th-link" style="--i:1">About</router-link>
        <span class="th-link-sep" aria-hidden="true">·</span>
        <router-link to="/projects" class="th-link" style="--i:2">Projects</router-link>
        <span class="th-link-sep" aria-hidden="true">·</span>
        <router-link to="/lebenslauf" class="th-link" style="--i:3">Lebenslauf</router-link>
      </div>
    </nav>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const lines = ref([])
const typing = ref(null)
const blinking = ref(false)

const SCRIPT = [
  { type: 'cmd',  text: 'whoami' },
  { type: 'out',  text: 'Janis Walliser. PMTS Software Engineer @ Salesforce.' },
  { type: 'out',  text: 'Security engineer. Vue.js developer. Miniature painter.' },
  { type: 'out',  text: 'Dog dad to Morty, a 7-year-old golden retriever.' },
  { type: 'gap' },
  { type: 'cmd',  text: 'ls interests/' },
  { type: 'dirs', items: ['gaming/', 'vinyl/', 'miniatures/'] },
  { type: 'gap' },
  { type: 'cmd',  text: 'cat currently.txt' },
  { type: 'out',  text: 'Spinning: VA-11 HALL-A Original Soundtrack.' },
  { type: 'out',  text: 'Painting: batch of 12 Gloomhaven minis, base coat done.' },
  { type: 'out',  text: 'Collecting: 16 Salesforce plushies. Still growing.' },
]

function sleep(ms) {
  return new Promise(r => setTimeout(r, ms))
}

let cancelled = false

async function runAnimation() {
  await sleep(420)

  for (const line of SCRIPT) {
    if (cancelled) return

    if (line.type === 'cmd') {
      for (let i = 0; i <= line.text.length; i++) {
        if (cancelled) return
        typing.value = line.text.slice(0, i)
        await sleep(26)
      }
      await sleep(110)
      lines.value = [...lines.value, line]
      typing.value = null
      await sleep(30)
    } else if (line.type === 'gap') {
      await sleep(240)
      lines.value = [...lines.value, line]
    } else {
      await sleep(55)
      lines.value = [...lines.value, line]
    }
  }

  if (!cancelled) {
    blinking.value = true
  }
}

onMounted(() => {
  const prefersReduced =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (prefersReduced) {
    lines.value = SCRIPT
    blinking.value = true
    return
  }

  runAnimation()
})

onUnmounted(() => {
  cancelled = true
})
</script>

<style scoped>
/* ── Page shell ── */
.th-root {
  min-height: calc(100vh - var(--navbar-height, 3.6rem));
  background-color: #0b0f1a;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem 1.5rem 4rem;
  gap: 2.5rem;
}

/* ── Terminal window ── */
.th-window {
  width: 100%;
  max-width: 700px;
  background: #161b22;
  border: 1px solid #30363d;
  border-radius: 10px;
  box-shadow:
    0 28px 64px rgba(0, 0, 0, 0.65),
    0 0 0 1px rgba(27, 178, 229, 0.06);
  overflow: hidden;
}

/* ── Title bar ── */
.th-titlebar {
  background: #1c2128;
  border-bottom: 1px solid #30363d;
  padding: 0.55rem 1rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  user-select: none;
}

.th-dots {
  display: flex;
  gap: 6px;
  flex-shrink: 0;
}

.th-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  display: inline-block;
}

.th-dot--r { background: #ff5f57; }
.th-dot--y { background: #febc2e; }
.th-dot--g { background: #28c840; }

.th-title {
  font-family: var(--font-mono);
  font-size: 0.72rem;
  color: #6e7681;
  flex: 1;
  text-align: center;
  padding-right: 62px;
}

/* ── Terminal body ── */
.th-body {
  padding: 1.25rem 1.5rem 1.5rem;
  font-family: 'JetBrains Mono', 'Fira Code', 'Cascadia Code', 'Consolas', monospace;
  font-size: 0.875rem;
  line-height: 1.65;
  color: #c9d1d9;
}

.th-header-prompt {
  margin-bottom: 0.1rem;
  line-height: 1.65;
}

.th-host  { color: #1bb2e5; font-weight: 600; }
.th-sym   { color: #6e7681; }
.th-path  { color: #79c0ff; font-weight: 500; }

/* ── Lines ── */
.th-line { line-height: 1.65; }
.th-line--cmd  { color: #1bb2e5; font-weight: 500; }
.th-line--out  { color: #c9d1d9; }
.th-line--dirs { display: flex; flex-wrap: wrap; gap: 0.2rem 1.5rem; }
.th-line--gap  { height: 1rem; display: block; }
.th-line--out  { padding-left: 0.65rem; border-left: 1px solid rgba(27, 178, 229, 0.12); }
.th-line--dirs { padding-left: 0.65rem; border-left: 1px solid rgba(27, 178, 229, 0.12); }

.th-chevron { color: #58a6ff; user-select: none; }
.th-dir { color: #79c0ff; font-weight: 500; }

/* ── Cursor ── */
.th-cursor {
  display: inline-block;
  color: #1bb2e5;
  font-size: 0.85em;
  vertical-align: text-bottom;
  margin-left: 1px;
}

.th-cursor--blink {
  animation: th-blink 1.1s step-end infinite;
}

@keyframes th-blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}

/* ── Navigation ── */
.th-nav {
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  align-items: flex-start;
  width: 100%;
  max-width: 700px;
  opacity: 0;
  transform: translateY(12px);
  transition: opacity 0.5s cubic-bezier(0.22, 1, 0.36, 1), transform 0.5s cubic-bezier(0.22, 1, 0.36, 1);
}

.th-nav--visible {
  opacity: 1;
  transform: translateY(0);
}

/* Primary CTA button */
.th-btn {
  display: inline-block;
  padding: 0.55rem 1.5rem;
  border-radius: 6px;
  font-family: var(--font-mono);
  font-size: 0.9rem;
  font-weight: 600;
  text-decoration: none;
  transition: background 0.15s ease, border-color 0.15s ease;
}

.th-btn--primary {
  background: #1bb2e5;
  border: 1px solid #1bb2e5;
  color: #0b0f1a;
}

.th-btn--primary:hover {
  background: #0ea5d4;
  border-color: #0ea5d4;
  color: #0b0f1a;
  text-decoration: none;
}

/* Secondary text links */
.th-links {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  flex-wrap: wrap;
}

.th-link {
  font-family: var(--font-mono);
  font-size: 0.82rem;
  color: var(--color-text-3);
  text-decoration: none;
  transition: color 0.15s ease;
}

.th-link:hover { color: var(--color-text-1); text-decoration: none; }

.th-link-sep {
  color: var(--color-border);
  font-size: 0.75rem;
  user-select: none;
}

/* ── Responsive ── */
@media (max-width: 520px) {
  .th-root { padding: 2rem 1rem 3rem; gap: 2rem; }
  .th-body { font-size: 0.78rem; padding: 1rem; }
  .th-btn  { font-size: 0.82rem; padding: 0.5rem 1.1rem; }
}

@media (min-width: 1280px) {
  .th-window { max-width: 820px; }
  .th-nav    { max-width: 820px; }
  .th-body   { font-size: 0.95rem; padding: 1.5rem 1.75rem 1.75rem; }
}

@media (min-width: 1600px) {
  .th-window { max-width: 1000px; }
  .th-nav    { max-width: 1000px; }
}

/* ── Reduced motion ── */
@media (prefers-reduced-motion: reduce) {
  .th-nav { opacity: 1; transform: none; transition: none; }
  .th-cursor--blink { animation: none; opacity: 1; }
  .th-line--out, .th-line--dirs { transition: none; }
}
</style>
