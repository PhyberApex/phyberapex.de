<template>
  <div class="cv-shell">
    <div class="cv-toolbar no-print">
      <a href="/" class="cv-back">← Back to site</a>
      <button class="cv-print-btn" @click="() => window.print()">Print / Save PDF</button>
    </div>
    <div class="cv-body">
      <Content />
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue'

const window = globalThis.window

onMounted(() => {
  if (document) document.body.style.backgroundColor = '#fff'
})

onUnmounted(() => {
  if (document) document.body.style.backgroundColor = ''
})
</script>

<style scoped>
.cv-shell {
  background: #fff;
  min-height: 100vh;
}

.cv-toolbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 9999;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 1.5rem;
  background: rgba(255, 255, 255, 0.96);
  border-bottom: 1px solid #d1d5db;
  backdrop-filter: blur(6px);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: 0.875rem;
}

.cv-back {
  color: #374151;
  text-decoration: none;
  font-weight: 500;
}

.cv-back:hover {
  color: #111;
  text-decoration: underline;
}

.cv-print-btn {
  padding: 0.3rem 0.9rem;
  border: 1px solid #9ca3af;
  border-radius: 4px;
  background: #fff;
  color: #374151;
  font-size: 0.82rem;
  cursor: pointer;
  font-family: inherit;
}

.cv-print-btn:hover {
  background: #f3f4f6;
  border-color: #6b7280;
}

.cv-body {
  padding-top: 2.8rem;
}

@media print {
  .no-print {
    display: none !important;
  }

  .cv-body {
    padding-top: 0;
  }
}
</style>
