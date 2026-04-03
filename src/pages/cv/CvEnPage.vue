<template>
  <div class="resume-en">
    <!-- Header -->
    <header class="resume-header">
      <img v-if="data.basics.image" :src="data.basics.image" :alt="data.basics.name" class="resume-photo" />
      <div class="resume-header-info">
        <h1 class="resume-name">{{ data.basics.name }}</h1>
        <p class="resume-label">{{ data.basics.label }}</p>
        <div class="resume-contact">
          <a v-if="data.basics.email" :href="`mailto:${data.basics.email}`" class="contact-item">
            <span class="contact-icon">✉</span> {{ data.basics.email }}
          </a>
          <span v-if="data.basics.phone" class="contact-item">
            <span class="contact-icon">☎</span> {{ data.basics.phone }}
          </span>
          <span v-if="data.basics.location" class="contact-item">
            <span class="contact-icon">📍</span>
            {{ data.basics.location.city }}, {{ data.basics.location.region }}
          </span>
          <a v-if="data.basics.url" :href="data.basics.url" target="_blank" rel="noopener" class="contact-item">
            <span class="contact-icon">🌐</span>
            {{ data.basics.url.replace('https://', '') }}
          </a>
        </div>
        <div class="resume-profiles">
          <a
            v-for="profile in data.basics.profiles"
            :key="profile.network"
            :href="profile.url"
            target="_blank"
            rel="noopener"
            class="profile-badge"
          >{{ profile.network }}</a>
        </div>
      </div>
    </header>

    <!-- Summary -->
    <section v-if="data.basics.summary" class="resume-section">
      <h2 class="section-title">Summary</h2>
      <p class="resume-summary">{{ data.basics.summary }}</p>
    </section>

    <!-- Work Experience -->
    <section v-if="data.work && data.work.length" class="resume-section">
      <h2 class="section-title">Work Experience</h2>
      <div class="timeline">
        <div v-for="job in data.work" :key="job.name + job.startDate" class="timeline-item">
          <div class="timeline-dot"></div>
          <div class="timeline-content">
            <div class="job-header">
              <div class="job-title-block">
                <span class="job-position">{{ job.position }}</span>
                <span class="job-sep"> · </span>
                <a v-if="job.url" :href="job.url" target="_blank" rel="noopener" class="job-company">{{ job.name }}</a>
                <span v-else class="job-company">{{ job.name }}</span>
                <span v-if="job.location" class="job-location">, {{ job.location }}</span>
              </div>
              <span class="job-dates">{{ formatDateRange(job.startDate, job.endDate) }}</span>
            </div>
            <p v-if="job.summary" class="job-summary">{{ job.summary }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Skills + Education side by side -->
    <div class="two-col">
      <section v-if="data.skills && data.skills.length" class="resume-section">
        <h2 class="section-title">Skills</h2>
        <div v-for="skill in data.skills" :key="skill.name" class="skill-group">
          <h4 class="skill-name">{{ skill.name }}</h4>
          <div class="skill-tags">
            <span v-for="kw in skill.keywords" :key="kw" class="skill-tag">{{ kw }}</span>
          </div>
        </div>
      </section>

      <section v-if="data.education && data.education.length" class="resume-section">
        <h2 class="section-title">Education</h2>
        <div v-for="edu in data.education" :key="edu.institution + edu.startDate" class="edu-card">
          <div class="edu-header">
            <div>
              <p class="edu-institution">{{ edu.institution }}</p>
              <p class="edu-degree">{{ edu.studyType }}<span v-if="edu.area">, {{ edu.area }}</span></p>
            </div>
            <div class="edu-right">
              <span class="edu-dates">{{ formatDateRange(edu.startDate, edu.endDate) }}</span>
              <span v-if="edu.score" class="edu-score">GPA: {{ edu.score }}</span>
            </div>
          </div>
        </div>
      </section>
    </div>

    <!-- Certificates -->
    <section v-if="data.certificates && data.certificates.length" class="resume-section">
      <h2 class="section-title">Certificates</h2>
      <div class="cert-grid">
        <a
          v-for="cert in data.certificates"
          :key="cert.name"
          :href="cert.url || undefined"
          :target="cert.url ? '_blank' : undefined"
          rel="noopener"
          class="cert-card"
        >
          <span class="cert-name">{{ cert.name }}</span>
          <span class="cert-meta">{{ cert.issuer }} · {{ formatYear(cert.date) }}</span>
        </a>
      </div>
    </section>

    <!-- Projects -->
    <section v-if="data.projects && data.projects.length" class="resume-section">
      <h2 class="section-title">Projects</h2>
      <div v-for="project in data.projects" :key="project.name" class="project-item">
        <div class="project-header">
          <a v-if="project.url" :href="project.url" target="_blank" rel="noopener" class="project-name">{{ project.name }}</a>
          <span v-else class="project-name">{{ project.name }}</span>
          <span class="project-date">{{ formatYear(project.startDate) }}</span>
        </div>
        <p class="project-desc">{{ project.description }}</p>
        <div class="skill-tags" style="margin-top: 0.4rem;">
          <span v-for="kw in project.keywords" :key="kw" class="skill-tag skill-tag--muted">{{ kw }}</span>
        </div>
      </div>
    </section>

    <!-- Publications -->
    <section v-if="data.publications && data.publications.length" class="resume-section">
      <h2 class="section-title">Publications & Talks</h2>
      <div v-for="pub in data.publications" :key="pub.name" class="pub-item">
        <p class="pub-row">
          <a v-if="pub.url" :href="pub.url" target="_blank" rel="noopener" class="pub-name">{{ pub.name }}</a>
          <span v-else class="pub-name">{{ pub.name }}</span>
          <span v-if="pub.publisher" class="pub-meta"> · {{ pub.publisher }}<span v-if="pub.releaseDate"> · {{ formatDate(pub.releaseDate) }}</span></span>
        </p>
        <p v-if="pub.summary" class="pub-summary">{{ pub.summary }}</p>
      </div>
    </section>

    <!-- Awards + Volunteer -->
    <div class="two-col">
      <section v-if="data.awards && data.awards.length" class="resume-section">
        <h2 class="section-title">Awards</h2>
        <div v-for="award in data.awards" :key="award.title" class="award-item">
          <p><span class="award-title">{{ award.title }}</span><span class="pub-meta"> · {{ award.awarder }} · {{ formatYear(award.date) }}</span></p>
          <p v-if="award.summary" class="pub-summary">{{ award.summary }}</p>
        </div>
      </section>

      <section v-if="data.volunteer && data.volunteer.length" class="resume-section">
        <h2 class="section-title">Volunteer</h2>
        <div v-for="vol in data.volunteer" :key="vol.organization" class="vol-item">
          <div class="job-header" style="margin-bottom: 0.3rem;">
            <p class="job-title-block" style="margin:0;">
              <span class="job-position">{{ vol.position }}</span>
              <span class="job-sep"> · </span>
              <a v-if="vol.url" :href="vol.url" target="_blank" rel="noopener" class="job-company">{{ vol.organization }}</a>
              <span v-else class="job-company">{{ vol.organization }}</span>
            </p>
            <span class="job-dates">{{ formatDateRange(vol.startDate, vol.endDate) }}</span>
          </div>
          <p v-if="vol.summary" class="job-summary">{{ vol.summary }}</p>
        </div>
      </section>
    </div>

    <!-- Languages + Interests -->
    <div class="two-col">
      <section v-if="data.languages && data.languages.length" class="resume-section">
        <h2 class="section-title">Languages</h2>
        <ul class="simple-list">
          <li v-for="lang in data.languages" :key="lang.language">
            <strong>{{ lang.language }}</strong> — {{ lang.fluency }}
          </li>
        </ul>
      </section>

      <section v-if="data.interests && data.interests.length" class="resume-section">
        <h2 class="section-title">Interests</h2>
        <div v-for="interest in data.interests" :key="interest.name">
          <p class="interest-name">{{ interest.name }}</p>
          <div class="skill-tags">
            <span v-for="kw in interest.keywords" :key="kw" class="skill-tag skill-tag--muted">{{ kw }}</span>
          </div>
        </div>
      </section>
    </div>

    <!-- References -->
    <section v-if="data.references && data.references.length" class="resume-section">
      <h2 class="section-title">References</h2>
      <div class="ref-grid">
        <blockquote v-for="ref in data.references" :key="ref.name" class="ref-card">
          <p class="ref-text">{{ ref.reference }}</p>
          <footer class="ref-name">— {{ ref.name }}</footer>
        </blockquote>
      </div>
    </section>
  </div>
</template>

<script setup>
import resumeData from '@data/resume.json'

const data = resumeData

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

function parseDate(dateStr) {
  if (!dateStr) return null
  const [year, month] = dateStr.split('-').map(Number)
  return { year, month: month || 1 }
}

function formatDateRange(start, end) {
  const s = parseDate(start)
  const e = parseDate(end)
  if (!s) return ''
  const startStr = `${MONTHS[s.month - 1]} ${s.year}`
  const endStr = e ? `${MONTHS[e.month - 1]} ${e.year}` : 'Present'
  return `${startStr} – ${endStr}`
}

function formatDate(dateStr) {
  const d = parseDate(dateStr)
  if (!d) return ''
  return `${MONTHS[d.month - 1]} ${d.year}`
}

function formatYear(dateStr) {
  const d = parseDate(dateStr)
  if (!d) return ''
  return String(d.year)
}
</script>

<style scoped>
/* All colors are explicit — no CSS variables from the theme */
.resume-en {
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem 1.5rem 4rem;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  font-size: 0.95rem;
  line-height: 1.6;
  color: #1e293b;
  background: #fff;
}

/* ── Header ── */
.resume-header {
  display: flex;
  align-items: flex-start;
  gap: 2rem;
  padding-bottom: 1.75rem;
  border-bottom: 2px solid #1bb2e5;
  margin-bottom: 2rem;
}

.resume-photo {
  width: 110px;
  height: 110px;
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0;
  border: 3px solid #1bb2e5;
}

.resume-header-info { flex: 1; }

.resume-name {
  font-size: 2rem;
  font-weight: 700;
  margin: 0 0 0.2rem;
  padding: 0;
  border: none;
  color: #0f172a;
  line-height: 1.2;
}

.resume-label {
  font-size: 1.05rem;
  color: #006fa0;
  font-weight: 600;
  margin: 0 0 0.75rem;
}

.resume-contact {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem 1.25rem;
  margin-bottom: 0.75rem;
  font-size: 0.85rem;
  color: #475569;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  color: #475569;
  text-decoration: none;
}

.contact-item:hover { color: #006fa0; }
.contact-icon { font-size: 0.85rem; }

.resume-profiles { display: flex; gap: 0.5rem; flex-wrap: wrap; }

.profile-badge {
  display: inline-block;
  padding: 0.2rem 0.7rem;
  border-radius: 999px;
  background: #e0f7fa;
  color: #006fa0;
  font-size: 0.78rem;
  font-weight: 600;
  text-decoration: none;
  border: 1px solid #a5e5f5;
}

.profile-badge:hover { background: #006fa0; color: #fff; }

/* ── Sections ── */
.resume-section { margin-bottom: 2rem; }

.section-title {
  font-size: 0.78rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #006fa0;
  border-bottom: 1px solid #b3e5fc;
  padding-bottom: 0.35rem;
  margin: 0 0 1rem;
  border-top: none;
  background: none;
}

.resume-summary { line-height: 1.75; color: #334155; margin: 0; }

/* ── Timeline ── */
.timeline {
  position: relative;
  padding-left: 1.25rem;
  border-left: 2px solid #b3e5fc;
}

.timeline-item { position: relative; margin-bottom: 1.75rem; }

.timeline-dot {
  position: absolute;
  left: -1.45rem;
  top: 0.4rem;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #1bb2e5;
  border: 2px solid #fff;
  box-shadow: 0 0 0 2px #b3e5fc;
}

.timeline-content { padding-left: 0.5rem; }

.job-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 0.2rem 1rem;
  margin-bottom: 0.4rem;
}

.job-title-block { display: flex; flex-wrap: wrap; align-items: baseline; gap: 0.15rem; }
.job-position { font-size: 0.95rem; font-weight: 700; color: #0f172a; }
.job-sep { color: #94a3b8; }
.job-company { font-size: 0.9rem; color: #006fa0; font-weight: 600; text-decoration: none; }
.job-company:hover { text-decoration: underline; }
.job-location { font-size: 0.82rem; color: #94a3b8; }
.job-dates { font-size: 0.8rem; color: #94a3b8; white-space: nowrap; flex-shrink: 0; }
.job-summary { font-size: 0.875rem; line-height: 1.7; color: #475569; margin: 0; }

/* ── Two column ── */
.two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 0 3rem; }

/* ── Skills ── */
.skill-group { margin-bottom: 0.9rem; }

.skill-name {
  font-size: 0.78rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #64748b;
  margin: 0 0 0.4rem;
  border: none;
  padding: 0;
  background: none;
}

.skill-tags { display: flex; flex-wrap: wrap; gap: 0.3rem; }

.skill-tag {
  display: inline-block;
  padding: 0.18rem 0.55rem;
  border-radius: 4px;
  background: #e0f7fa;
  color: #006fa0;
  font-size: 0.77rem;
  font-weight: 500;
  border: 1px solid #a5e5f5;
}

.skill-tag--muted { background: #f1f5f9; color: #475569; border-color: #e2e8f0; }

/* ── Education ── */
.edu-card {
  margin-bottom: 0.9rem;
  padding: 0.65rem 0.9rem;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  background: #f8fafc;
}

.edu-header { display: flex; justify-content: space-between; align-items: flex-start; gap: 0.5rem; flex-wrap: wrap; }
.edu-institution { font-size: 0.9rem; font-weight: 700; color: #0f172a; margin: 0 0 0.1rem; }
.edu-degree { font-size: 0.82rem; color: #64748b; margin: 0; }
.edu-right { display: flex; flex-direction: column; align-items: flex-end; gap: 0.15rem; }
.edu-dates { font-size: 0.78rem; color: #94a3b8; white-space: nowrap; }
.edu-score { font-size: 0.78rem; font-weight: 600; color: #006fa0; }

/* ── Certificates ── */
.cert-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 0.7rem; }

.cert-card {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  padding: 0.7rem 0.9rem;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  text-decoration: none;
  background: #f8fafc;
  transition: border-color 0.15s, box-shadow 0.15s;
  color: inherit;
}

.cert-card:hover { border-color: #006fa0; box-shadow: 0 2px 8px rgba(26, 95, 168, 0.12); }
.cert-name { font-size: 0.85rem; font-weight: 600; color: #0f172a; line-height: 1.35; }
.cert-meta { font-size: 0.76rem; color: #94a3b8; }

/* ── Projects ── */
.project-item { margin-bottom: 1.2rem; padding-bottom: 1.2rem; border-bottom: 1px solid #f1f5f9; }
.project-item:last-child { border-bottom: none; }
.project-header { display: flex; justify-content: space-between; align-items: baseline; flex-wrap: wrap; gap: 0.25rem; margin-bottom: 0.3rem; }
.project-name { font-size: 0.9rem; font-weight: 700; color: #006fa0; text-decoration: none; }
.project-name:hover { text-decoration: underline; }
.project-date { font-size: 0.78rem; color: #94a3b8; }
.project-desc { font-size: 0.85rem; line-height: 1.65; color: #475569; margin: 0; }

/* ── Publications / Awards ── */
.pub-item { margin-bottom: 0.9rem; }
.pub-row { margin: 0 0 0.15rem; }
.pub-name { font-weight: 600; font-size: 0.875rem; color: #006fa0; text-decoration: none; }
.pub-name:hover { text-decoration: underline; }
.pub-meta { font-size: 0.8rem; color: #94a3b8; }
.pub-summary { font-size: 0.82rem; color: #64748b; margin: 0; }
.award-title { font-weight: 700; font-size: 0.875rem; color: #0f172a; }

/* ── Volunteer ── */
.vol-item { margin-bottom: 1rem; }

/* ── Languages + Interests ── */
.simple-list { list-style: none; padding: 0; margin: 0; font-size: 0.875rem; line-height: 1.9; color: #334155; }
.simple-list strong { color: #0f172a; }
.interest-name { font-weight: 600; font-size: 0.875rem; color: #0f172a; margin: 0 0 0.35rem; }

/* ── References ── */
.ref-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 1rem; }

.ref-card {
  border: 1px solid #e2e8f0;
  border-left: 4px solid #1bb2e5;
  border-radius: 6px;
  padding: 1rem;
  margin: 0;
  background: #f8fafc;
}

.ref-text { font-size: 0.83rem; line-height: 1.65; color: #475569; font-style: italic; margin: 0 0 0.5rem; }
.ref-name { font-size: 0.8rem; font-weight: 700; color: #0f172a; }

/* ── Print ── */
@media print {
  .resume-en { padding: 0; max-width: none; font-size: 10pt; }
  .resume-header { border-color: #000; }
  .resume-photo { border-color: #000; }
  .section-title { color: #000; border-color: #ccc; }
  .timeline { border-color: #ccc; }
  .timeline-dot { background: #000; box-shadow: none; }
  .cert-card, .edu-card, .ref-card { border-color: #ccc; background: #fff; box-shadow: none; }
  .ref-card { border-left-color: #000; }
  .skill-tag { background: #f0f0f0; color: #000; border-color: #ccc; }
  .profile-badge { background: #f0f0f0; color: #000; border-color: #ccc; }
  .resume-name, .resume-label, .job-position, .job-company, .project-name, .pub-name, .edu-institution, .award-title,
  .job-company, .project-name, .pub-name, .edu-score { color: #000; }
  a { color: #000; text-decoration: none; }
  .resume-section { page-break-inside: avoid; }
  .resume-header { page-break-inside: avoid; }
}

/* ── Responsive ── */
@media (max-width: 640px) {
  .two-col { grid-template-columns: 1fr; }
  .cert-grid { grid-template-columns: 1fr; }
  .ref-grid { grid-template-columns: 1fr; }
}

@media (max-width: 500px) {
  .resume-header { flex-direction: column; align-items: center; text-align: center; }
  .resume-contact { justify-content: center; }
  .resume-profiles { justify-content: center; }
}
</style>
