<template>
  <div class="resume-de">
    <!-- Header -->
    <header class="lv-header">
      <div class="lv-header-left">
        <h1 class="lv-name">{{ data.basics.name }}</h1>
        <p class="lv-label">{{ data.basics.label }}</p>
        <div class="lv-contact-rows">
          <div v-if="data.basics.location" class="lv-contact-row">
            <span class="lv-ct-label">Wohnort</span>
            <span>{{ data.basics.location.city }}, {{ data.basics.location.region }}</span>
          </div>
          <div v-if="data.basics.phone" class="lv-contact-row">
            <span class="lv-ct-label">Telefon</span>
            <a :href="`tel:${data.basics.phone}`">{{ data.basics.phone }}</a>
          </div>
          <div v-if="data.basics.email" class="lv-contact-row">
            <span class="lv-ct-label">E-Mail</span>
            <a :href="`mailto:${data.basics.email}`">{{ data.basics.email }}</a>
          </div>
          <div v-if="data.basics.url" class="lv-contact-row">
            <span class="lv-ct-label">Website</span>
            <a :href="data.basics.url" target="_blank" rel="noopener">{{ data.basics.url.replace('https://', '') }}</a>
          </div>
          <div v-for="profile in data.basics.profiles" :key="profile.network" class="lv-contact-row">
            <span class="lv-ct-label">{{ profile.network }}</span>
            <a :href="profile.url" target="_blank" rel="noopener">{{ profile.username }}</a>
          </div>
        </div>
      </div>
      <img v-if="data.basics.image" :src="data.basics.image" :alt="data.basics.name" class="lv-photo" />
    </header>

    <!-- Profil -->
    <section v-if="data.basics.summary" class="lv-section">
      <div class="lv-section-header">Profil</div>
      <div class="lv-section-body">
        <p class="lv-summary">{{ data.basics.summary }}</p>
      </div>
    </section>

    <!-- Berufserfahrung -->
    <section v-if="data.work && data.work.length" class="lv-section">
      <div class="lv-section-header">Berufserfahrung</div>
      <div class="lv-section-body">
        <div v-for="job in data.work" :key="job.name + job.startDate" class="lv-entry">
          <div class="lv-date-col">{{ formatDateRangeDe(job.startDate, job.endDate) }}</div>
          <div class="lv-content-col">
            <p class="lv-entry-title">{{ job.position }}</p>
            <p class="lv-entry-sub">
              <a v-if="job.url" :href="job.url" target="_blank" rel="noopener">{{ job.name }}</a>
              <span v-else>{{ job.name }}</span>
              <span v-if="job.location" class="lv-muted">, {{ job.location }}</span>
            </p>
            <p v-if="job.summary" class="lv-entry-desc">{{ job.summary }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Ausbildung -->
    <section v-if="data.education && data.education.length" class="lv-section">
      <div class="lv-section-header">Ausbildung</div>
      <div class="lv-section-body">
        <div v-for="edu in data.education" :key="edu.institution + edu.startDate" class="lv-entry">
          <div class="lv-date-col">{{ formatDateRangeDe(edu.startDate, edu.endDate) }}</div>
          <div class="lv-content-col">
            <p class="lv-entry-title">{{ edu.studyType }}</p>
            <p class="lv-entry-sub">{{ edu.institution }}<span v-if="edu.area" class="lv-muted"> · {{ edu.area }}</span></p>
            <p v-if="edu.score" class="lv-entry-detail">Note: {{ edu.score }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Kenntnisse und Fähigkeiten -->
    <section v-if="data.skills && data.skills.length" class="lv-section">
      <div class="lv-section-header">Kenntnisse und Fähigkeiten</div>
      <div class="lv-section-body">
        <div v-for="skill in data.skills" :key="skill.name" class="lv-entry lv-entry--inline">
          <div class="lv-date-col lv-cat-label">{{ skill.name }}</div>
          <div class="lv-content-col lv-kw-list">{{ skill.keywords.join(' · ') }}</div>
        </div>
      </div>
    </section>

    <!-- Sprachen -->
    <section v-if="data.languages && data.languages.length" class="lv-section">
      <div class="lv-section-header">Sprachen</div>
      <div class="lv-section-body">
        <div v-for="lang in data.languages" :key="lang.language" class="lv-entry lv-entry--inline">
          <div class="lv-date-col lv-cat-label">{{ lang.language }}</div>
          <div class="lv-content-col">{{ lang.fluency }}</div>
        </div>
      </div>
    </section>

    <!-- Zertifikate -->
    <section v-if="data.certificates && data.certificates.length" class="lv-section">
      <div class="lv-section-header">Zertifikate</div>
      <div class="lv-section-body">
        <div v-for="cert in data.certificates" :key="cert.name" class="lv-entry">
          <div class="lv-date-col">{{ formatYearDe(cert.date) }}</div>
          <div class="lv-content-col">
            <a v-if="cert.url" :href="cert.url" target="_blank" rel="noopener" class="lv-entry-title-link">{{ cert.name }}</a>
            <span v-else class="lv-entry-title">{{ cert.name }}</span>
            <span class="lv-muted"> · {{ cert.issuer }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Projekte -->
    <section v-if="data.projects && data.projects.length" class="lv-section">
      <div class="lv-section-header">Projekte</div>
      <div class="lv-section-body">
        <div v-for="project in data.projects" :key="project.name" class="lv-entry">
          <div class="lv-date-col">{{ formatYearDe(project.startDate) }}</div>
          <div class="lv-content-col">
            <p class="lv-entry-title">
              <a v-if="project.url" :href="project.url" target="_blank" rel="noopener" class="lv-entry-title-link">{{ project.name }}</a>
              <span v-else>{{ project.name }}</span>
            </p>
            <p v-if="project.description" class="lv-entry-desc">{{ project.description }}</p>
            <p v-if="project.keywords && project.keywords.length" class="lv-entry-detail">{{ project.keywords.join(' · ') }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Veröffentlichungen -->
    <section v-if="data.publications && data.publications.length" class="lv-section">
      <div class="lv-section-header">Veröffentlichungen</div>
      <div class="lv-section-body">
        <div v-for="pub in data.publications" :key="pub.name" class="lv-entry">
          <div class="lv-date-col">{{ pub.releaseDate ? formatYearDe(pub.releaseDate) : '' }}</div>
          <div class="lv-content-col">
            <a v-if="pub.url" :href="pub.url" target="_blank" rel="noopener" class="lv-entry-title-link">{{ pub.name }}</a>
            <span v-else class="lv-entry-title">{{ pub.name }}</span>
            <span v-if="pub.publisher" class="lv-muted"> · {{ pub.publisher }}</span>
            <p v-if="pub.summary" class="lv-entry-desc">{{ pub.summary }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Auszeichnungen -->
    <section v-if="data.awards && data.awards.length" class="lv-section">
      <div class="lv-section-header">Auszeichnungen</div>
      <div class="lv-section-body">
        <div v-for="award in data.awards" :key="award.title" class="lv-entry">
          <div class="lv-date-col">{{ formatYearDe(award.date) }}</div>
          <div class="lv-content-col">
            <p class="lv-entry-title">{{ award.title }}</p>
            <p class="lv-entry-sub">{{ award.awarder }}</p>
            <p v-if="award.summary" class="lv-entry-desc">{{ award.summary }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Ehrenamtliches Engagement -->
    <section v-if="data.volunteer && data.volunteer.length" class="lv-section">
      <div class="lv-section-header">Ehrenamtliches Engagement</div>
      <div class="lv-section-body">
        <div v-for="vol in data.volunteer" :key="vol.organization" class="lv-entry">
          <div class="lv-date-col">{{ formatDateRangeDe(vol.startDate, vol.endDate) }}</div>
          <div class="lv-content-col">
            <p class="lv-entry-title">{{ vol.position }}</p>
            <p class="lv-entry-sub">
              <a v-if="vol.url" :href="vol.url" target="_blank" rel="noopener">{{ vol.organization }}</a>
              <span v-else>{{ vol.organization }}</span>
            </p>
            <p v-if="vol.summary" class="lv-entry-desc">{{ vol.summary }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Interessen -->
    <section v-if="data.interests && data.interests.length" class="lv-section">
      <div class="lv-section-header">Interessen</div>
      <div class="lv-section-body">
        <div v-for="interest in data.interests" :key="interest.name" class="lv-entry lv-entry--inline">
          <div class="lv-date-col lv-cat-label">{{ interest.name }}</div>
          <div class="lv-content-col">{{ interest.keywords.join(', ') }}</div>
        </div>
      </div>
    </section>

    <!-- Unterschrift -->
    <div class="lv-signature">
      <p>{{ data.basics.location?.city || 'Kaiserslautern' }}, den _______________</p>
      <div class="lv-sig-line"></div>
      <p class="lv-sig-name">{{ data.basics.name }}</p>
    </div>
  </div>
</template>

<script setup>
import resumeData from '@data/resume.de.json'

const data = resumeData

function parseDate(dateStr) {
  if (!dateStr) return null
  const [year, month] = dateStr.split('-').map(Number)
  return { year, month: month || 1 }
}

function formatDateRangeDe(start, end) {
  const s = parseDate(start)
  const e = parseDate(end)
  if (!s) return ''
  const sm = String(s.month).padStart(2, '0')
  const startStr = `${sm}/${s.year}`
  const endStr = e ? `${String(e.month).padStart(2, '0')}/${e.year}` : 'heute'
  return `${startStr}\u00A0–\u00A0${endStr}`
}

function formatYearDe(dateStr) {
  const d = parseDate(dateStr)
  return d ? String(d.year) : ''
}
</script>

<style scoped>
/* All colors are explicit — no CSS variables */
.resume-de {
  max-width: 840px;
  margin: 0 auto;
  padding: 2rem 1.5rem 4rem;
  font-family: 'Times New Roman', Times, Georgia, serif;
  font-size: 0.95rem;
  line-height: 1.55;
  color: #111;
  background: #fff;
}

/* ── Header ── */
.lv-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 2rem;
  margin-bottom: 2rem;
  padding-bottom: 1.25rem;
  border-bottom: 2px solid #111;
}

.lv-header-left { flex: 1; }

.lv-name {
  font-size: 1.8rem;
  font-weight: 700;
  margin: 0 0 0.15rem;
  padding: 0;
  border: none;
  background: none;
  color: #111;
  font-family: inherit;
  line-height: 1.2;
}

.lv-label { font-size: 0.95rem; font-style: italic; color: #444; margin: 0 0 1rem; }

.lv-contact-rows { font-size: 0.875rem; line-height: 1.75; }

.lv-contact-row { display: flex; gap: 0.75rem; color: #111; }
.lv-contact-row a { color: #111; text-decoration: none; }
.lv-contact-row a:hover { text-decoration: underline; }

.lv-ct-label {
  font-weight: 600;
  color: #444;
  white-space: nowrap;
  min-width: 72px;
  flex-shrink: 0;
}

.lv-photo {
  width: 110px;
  height: 140px;
  object-fit: cover;
  object-position: top;
  border: 1px solid #bbb;
  flex-shrink: 0;
  display: block;
}

/* ── Sections ── */
.lv-section { margin-bottom: 1.5rem; }

.lv-section-header {
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #111;
  background: none;
  border-bottom: 1.5px solid #111;
  padding-bottom: 0.2rem;
  margin-bottom: 0.75rem;
}

.lv-summary { margin: 0; color: #222; line-height: 1.7; }

/* ── Entries ── */
.lv-entry {
  display: grid;
  grid-template-columns: 140px 1fr;
  gap: 0 1.5rem;
  margin-bottom: 1rem;
  align-items: start;
}

.lv-entry--inline { margin-bottom: 0.35rem; }

.lv-date-col {
  font-size: 0.8rem;
  color: #555;
  padding-top: 0.1rem;
  line-height: 1.5;
  white-space: nowrap;
}

.lv-cat-label { font-weight: 600; color: #222; font-size: 0.875rem; white-space: normal; }
.lv-content-col { min-width: 0; font-size: 0.9rem; color: #222; }
.lv-entry-title { font-weight: 700; margin: 0 0 0.1rem; color: #111; font-size: 0.9rem; }

.lv-entry-title-link { font-weight: 700; color: #111; text-decoration: none; font-size: 0.9rem; }
.lv-entry-title-link:hover { text-decoration: underline; }

.lv-entry-sub { margin: 0 0 0.1rem; font-size: 0.875rem; color: #333; }
.lv-entry-sub a { color: #111; text-decoration: none; }
.lv-entry-sub a:hover { text-decoration: underline; }
.lv-muted { color: #666; }
.lv-entry-desc { margin: 0.2rem 0 0; font-size: 0.855rem; color: #444; line-height: 1.65; }
.lv-entry-detail { margin: 0.15rem 0 0; font-size: 0.8rem; color: #666; }
.lv-kw-list { font-size: 0.875rem; color: #333; }

/* ── Signature ── */
.lv-signature {
  margin-top: 3rem;
  padding-top: 1.5rem;
  border-top: 1px solid #ccc;
  font-size: 0.875rem;
  color: #333;
}

.lv-signature p { margin: 0 0 0.5rem; }
.lv-sig-line { width: 220px; border-bottom: 1px solid #999; margin: 2rem 0 0.35rem; }
.lv-sig-name { font-weight: 600; color: #111; font-size: 0.875rem; margin: 0 !important; }

/* ── Responsive ── */
@media (max-width: 540px) {
  .lv-header { flex-direction: column-reverse; align-items: center; text-align: center; }
  .lv-entry { grid-template-columns: 1fr; gap: 0.1rem; }
  .lv-date-col { font-size: 0.75rem; color: #888; }
}

/* ── Print ── */
@media print {
  .resume-de { max-width: none; padding: 0 1cm; font-size: 10pt; color: #000; }
  .lv-name, .lv-section-header, .lv-entry-title, .lv-entry-title-link, .lv-content-col, .lv-header { color: #000; border-color: #000; }
  .lv-photo { border-color: #999; }
  a { color: #000; text-decoration: none; }
  .lv-section { page-break-inside: avoid; }
  .lv-signature { border-color: #ccc; }
}
</style>
