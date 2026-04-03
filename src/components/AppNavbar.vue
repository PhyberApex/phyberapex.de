<template>
  <nav class="navbar" :class="{ 'navbar--scrolled': scrolled }">
    <div class="navbar-inner">
      <!-- Logo / Home -->
      <router-link to="/" class="navbar-brand">
        <img src="/images/phyberapex-logo.png" alt="PhyberApex logo" class="navbar-logo" />
        <span class="navbar-name">PhyberApex</span>
      </router-link>

      <!-- Desktop nav -->
      <ul class="navbar-links" role="list">
        <li><router-link to="/" class="nav-link" exact-active-class="nav-link--active">Home</router-link></li>
        <li><router-link to="/about" class="nav-link" active-class="nav-link--active">About</router-link></li>
        <li><router-link to="/projects" class="nav-link" active-class="nav-link--active">Projects</router-link></li>

        <!-- Interests dropdown -->
        <li class="nav-dropdown" @mouseenter="openInterests" @mouseleave="closeInterests">
          <button
            class="nav-link nav-link--dropdown"
            :class="{ 'nav-link--active': isInterestsActive }"
            :aria-expanded="interestsOpen"
            aria-haspopup="true"
          >
            Interests <span class="nav-chevron" :class="{ 'nav-chevron--open': interestsOpen }">▾</span>
          </button>
          <div class="nav-dropdown-panel" v-show="interestsOpen">
            <router-link to="/interests/gaming" class="dropdown-link" active-class="dropdown-link--active">Gaming</router-link>
            <router-link to="/interests/vinyl" class="dropdown-link" active-class="dropdown-link--active">Vinyl</router-link>
            <router-link to="/interests/miniatures" class="dropdown-link" active-class="dropdown-link--active">Miniatures</router-link>
          </div>
        </li>

        <!-- CV dropdown -->
        <li class="nav-dropdown" @mouseenter="openCv" @mouseleave="closeCv">
          <button
            class="nav-link nav-link--dropdown"
            :class="{ 'nav-link--active': isCvActive }"
            :aria-expanded="cvOpen"
            aria-haspopup="true"
          >
            CV <span class="nav-chevron" :class="{ 'nav-chevron--open': cvOpen }">▾</span>
          </button>
          <div class="nav-dropdown-panel" v-show="cvOpen">
            <router-link to="/cv" class="dropdown-link" active-class="dropdown-link--active">English CV</router-link>
            <router-link to="/lebenslauf" class="dropdown-link" active-class="dropdown-link--active">Lebenslauf</router-link>
          </div>
        </li>
      </ul>

      <!-- Mobile hamburger -->
      <button
        class="navbar-hamburger"
        :class="{ 'navbar-hamburger--open': menuOpen }"
        @click="menuOpen = !menuOpen"
        :aria-expanded="menuOpen"
        aria-label="Toggle navigation"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>

    <!-- Mobile drawer -->
    <div class="navbar-drawer" :class="{ 'navbar-drawer--open': menuOpen }" aria-hidden="!menuOpen">
      <router-link to="/" class="drawer-link" exact-active-class="drawer-link--active">Home</router-link>
      <router-link to="/about" class="drawer-link" active-class="drawer-link--active">About</router-link>
      <router-link to="/projects" class="drawer-link" active-class="drawer-link--active">Projects</router-link>
      <div class="drawer-section-label">Interests</div>
      <router-link to="/interests/gaming" class="drawer-link drawer-link--child" active-class="drawer-link--active">Gaming</router-link>
      <router-link to="/interests/vinyl" class="drawer-link drawer-link--child" active-class="drawer-link--active">Vinyl</router-link>
      <router-link to="/interests/miniatures" class="drawer-link drawer-link--child" active-class="drawer-link--active">Miniatures</router-link>
      <div class="drawer-section-label">CV</div>
      <router-link to="/cv" class="drawer-link drawer-link--child" active-class="drawer-link--active">English CV</router-link>
      <router-link to="/lebenslauf" class="drawer-link drawer-link--child" active-class="drawer-link--active">Lebenslauf</router-link>
    </div>
  </nav>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const menuOpen = ref(false)
const interestsOpen = ref(false)
const cvOpen = ref(false)
const scrolled = ref(false)
let interestsCloseTimeout = null
let cvCloseTimeout = null

const isInterestsActive = computed(() => route.path.startsWith('/interests'))
const isCvActive = computed(() => route.path === '/cv' || route.path === '/lebenslauf')

// Close drawer on route change
watch(() => route.path, () => {
  menuOpen.value = false
  interestsOpen.value = false
  cvOpen.value = false
  if (interestsCloseTimeout) {
    clearTimeout(interestsCloseTimeout)
    interestsCloseTimeout = null
  }
  if (cvCloseTimeout) {
    clearTimeout(cvCloseTimeout)
    cvCloseTimeout = null
  }
})

function onScroll() {
  scrolled.value = window.scrollY > 8
}

function openInterests() {
  if (interestsCloseTimeout) {
    clearTimeout(interestsCloseTimeout)
    interestsCloseTimeout = null
  }
  interestsOpen.value = true
}

function closeInterests() {
  interestsCloseTimeout = window.setTimeout(() => {
    interestsOpen.value = false
    interestsCloseTimeout = null
  }, 180)
}

function openCv() {
  if (cvCloseTimeout) {
    clearTimeout(cvCloseTimeout)
    cvCloseTimeout = null
  }
  cvOpen.value = true
}

function closeCv() {
  cvCloseTimeout = window.setTimeout(() => {
    cvOpen.value = false
    cvCloseTimeout = null
  }, 180)
}

onMounted(() => window.addEventListener('scroll', onScroll, { passive: true }))
onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
  if (interestsCloseTimeout) {
    clearTimeout(interestsCloseTimeout)
  }
  if (cvCloseTimeout) {
    clearTimeout(cvCloseTimeout)
  }
})
</script>

<style scoped>
/* ── Shell ── */
.navbar {
  position: sticky;
  top: 0;
  z-index: 100;
  height: var(--navbar-height);
  background: var(--color-bg-alt);
  border-bottom: 1px solid var(--color-border-subtle);
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
  display: flex;
  flex-direction: column;
}

.navbar--scrolled {
  border-bottom-color: var(--color-border);
  box-shadow: 0 1px 16px rgba(0, 0, 0, 0.4);
}

.navbar-inner {
  height: var(--navbar-height);
  display: flex;
  align-items: center;
  gap: 2rem;
  padding: 0 1.5rem;
  max-width: 1400px;
  width: 100%;
  margin: 0 auto;
}

/* ── Brand ── */
.navbar-brand {
  display: flex;
  align-items: center;
  gap: 0.55rem;
  text-decoration: none;
  flex-shrink: 0;
}

.navbar-logo {
  height: 2rem;
  width: auto;
}

.navbar-name {
  font-family: var(--font-mono);
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--color-text-1);
  letter-spacing: -0.02em;
}

/* ── Desktop links ── */
.navbar-links {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  list-style: none;
  margin: 0;
  padding: 0;
  margin-left: auto;
}

.nav-link {
  font-family: var(--font-mono);
  font-size: 0.8rem;
  font-weight: 400;
  color: var(--color-text-3);
  text-decoration: none;
  padding: 0.4rem 0.7rem;
  border-radius: 4px;
  transition: color 0.15s ease, background 0.15s ease;
  border: none;
  background: none;
  cursor: pointer;
  line-height: 1;
}

.nav-link:hover {
  color: var(--color-text-1);
  background: rgba(255, 255, 255, 0.04);
}

.nav-link--active {
  color: var(--color-accent) !important;
}

/* ── Dropdown ── */
.nav-dropdown {
  position: relative;
}

.nav-link--dropdown {
  display: flex;
  align-items: center;
  gap: 0.3rem;
}

.nav-chevron {
  font-size: 0.65rem;
  transition: transform 0.2s ease;
  display: inline-block;
}

.nav-chevron--open {
  transform: rotate(180deg);
}

.nav-dropdown-panel {
  position: absolute;
  top: calc(100% + 0.35rem);
  right: 0;
  background: var(--color-bg-elevated);
  border: 1px solid var(--color-border);
  border-radius: 6px;
  padding: 0.35rem;
  min-width: 140px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.5);
}

.dropdown-link {
  font-family: var(--font-mono);
  font-size: 0.78rem;
  color: var(--color-text-3);
  text-decoration: none;
  padding: 0.35rem 0.7rem;
  border-radius: 4px;
  transition: color 0.15s ease, background 0.15s ease;
}

.dropdown-link:hover {
  color: var(--color-text-1);
  background: rgba(255, 255, 255, 0.05);
}

.dropdown-link--active {
  color: var(--color-accent) !important;
}

/* ── Hamburger ── */
.navbar-hamburger {
  display: none;
  flex-direction: column;
  gap: 5px;
  padding: 0.4rem;
  margin-left: auto;
  background: none;
  border: none;
  cursor: pointer;
  border-radius: 4px;
}

.navbar-hamburger span {
  display: block;
  width: 20px;
  height: 2px;
  background: var(--color-text-3);
  border-radius: 1px;
  transition: transform 0.2s ease, opacity 0.2s ease, background 0.15s ease;
}

.navbar-hamburger--open span:nth-child(1) {
  transform: translateY(7px) rotate(45deg);
  background: var(--color-accent);
}

.navbar-hamburger--open span:nth-child(2) {
  opacity: 0;
}

.navbar-hamburger--open span:nth-child(3) {
  transform: translateY(-7px) rotate(-45deg);
  background: var(--color-accent);
}

/* ── Mobile drawer ── */
.navbar-drawer {
  display: none;
  flex-direction: column;
  background: var(--color-bg-alt);
  border-top: 1px solid var(--color-border-subtle);
  padding: 0.5rem 1rem 1rem;
  overflow-y: auto;
  max-height: calc(100vh - var(--navbar-height));
}

.navbar-drawer--open {
  display: flex;
}

.drawer-link {
  font-family: var(--font-mono);
  font-size: 0.85rem;
  color: var(--color-text-3);
  text-decoration: none;
  padding: 0.5rem 0.5rem;
  border-radius: 4px;
  transition: color 0.15s ease, background 0.15s ease;
}

.drawer-link:hover {
  color: var(--color-text-1);
  background: rgba(255, 255, 255, 0.04);
}

.drawer-link--active {
  color: var(--color-accent) !important;
}

.drawer-link--child {
  padding-left: 1.5rem;
  font-size: 0.8rem;
}

.drawer-section-label {
  font-family: var(--font-mono);
  font-size: 0.6rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--color-accent);
  padding: 0.75rem 0.5rem 0.25rem;
  opacity: 0.7;
}

/* ── Responsive ── */
@media (max-width: 680px) {
  .navbar {
    height: auto;
  }

  .navbar-inner {
    height: var(--navbar-height);
  }

  .navbar-links {
    display: none;
  }

  .navbar-hamburger {
    display: flex;
  }
}
</style>
