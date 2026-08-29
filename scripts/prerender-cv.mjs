// Generates dist/cv.html and dist/lebenslauf.html: static, no-JS-required
// renderings of the CV routes, built from the same resume JSON the Vue
// pages use. Netlify (and Vite's own preview server) serve a real file at
// a matching path in preference to the SPA rewrite, so these are served
// directly for /cv and /lebenslauf, while every other route keeps falling
// through to index.html's generic <noscript> fallback. When JS is
// available, main.js's unconditional `createApp(App).use(router).mount('#app')`
// still replaces this markup with the interactive CvLayout/CvEnPage/CvDePage
// render, exactly as it already does for every route today.

import { readFileSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')
const distDir = path.join(root, 'dist')

const resumeEn = JSON.parse(readFileSync(path.join(root, 'resume.json'), 'utf-8'))
const resumeDe = JSON.parse(readFileSync(path.join(root, 'resume.de.json'), 'utf-8'))

function extractScopedStyle(vueFilePath) {
  const source = readFileSync(path.join(root, vueFilePath), 'utf-8')
  const match = source.match(/<style scoped>([\s\S]*?)<\/style>/)
  if (!match) throw new Error(`No <style scoped> block found in ${vueFilePath}`)
  return match[1]
}

const cvEnCss = extractScopedStyle('src/pages/cv/CvEnPage.vue')
const cvDeCss = extractScopedStyle('src/pages/cv/CvDePage.vue')
const cvShellCss = extractScopedStyle('src/layouts/CvLayout.vue')

function esc(value) {
  if (value == null) return ''
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

// ── Date formatting, ported from CvEnPage.vue / CvDePage.vue ──────────────

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
  return d ? `${MONTHS[d.month - 1]} ${d.year}` : ''
}

function formatYear(dateStr) {
  const d = parseDate(dateStr)
  return d ? String(d.year) : ''
}

function formatDateRangeDe(start, end) {
  const s = parseDate(start)
  const e = parseDate(end)
  if (!s) return ''
  const startStr = `${String(s.month).padStart(2, '0')}/${s.year}`
  const endStr = e ? `${String(e.month).padStart(2, '0')}/${e.year}` : 'heute'
  return `${startStr} – ${endStr}`
}

function formatYearDe(dateStr) {
  const d = parseDate(dateStr)
  return d ? String(d.year) : ''
}

// ── English CV, mirrors CvEnPage.vue ───────────────────────────────────────

function renderCvEn(data) {
  const b = data.basics

  const contactItems = [
    b.email && `<a href="mailto:${esc(b.email)}" class="contact-item"><span class="contact-icon">✉</span> ${esc(b.email)}</a>`,
    b.phone && `<span class="contact-item"><span class="contact-icon">☎</span> ${esc(b.phone)}</span>`,
    b.location && `<span class="contact-item"><span class="contact-icon">📍</span> ${esc(b.location.city)}, ${esc(b.location.region)}</span>`,
    b.url && `<a href="${esc(b.url)}" target="_blank" rel="noopener" class="contact-item"><span class="contact-icon">🌐</span> ${esc(b.url.replace('https://', ''))}</a>`,
  ].filter(Boolean).join('')

  const profiles = (b.profiles || [])
    .map(p => `<a href="${esc(p.url)}" target="_blank" rel="noopener" class="profile-badge">${esc(p.network)}</a>`)
    .join('')

  const header = `
    <header class="resume-header">
      ${b.image ? `<img src="${esc(b.image)}" alt="${esc(b.name)}" class="resume-photo" />` : ''}
      <div class="resume-header-info">
        <h1 class="resume-name">${esc(b.name)}</h1>
        <p class="resume-label">${esc(b.label)}</p>
        <div class="resume-contact">${contactItems}</div>
        <div class="resume-profiles">${profiles}</div>
      </div>
    </header>`

  const summary = b.summary ? `
    <section class="resume-section">
      <h2 class="section-title">Summary</h2>
      <p class="resume-summary">${esc(b.summary)}</p>
    </section>` : ''

  const work = data.work?.length ? `
    <section class="resume-section">
      <h2 class="section-title">Work Experience</h2>
      <div class="timeline">
        ${data.work.map(job => `
          <div class="timeline-item">
            <div class="timeline-dot"></div>
            <div class="timeline-content">
              <div class="job-header">
                <div class="job-title-block">
                  <span class="job-position">${esc(job.position)}</span>
                  <span class="job-sep"> · </span>
                  ${job.url
                    ? `<a href="${esc(job.url)}" target="_blank" rel="noopener" class="job-company">${esc(job.name)}</a>`
                    : `<span class="job-company">${esc(job.name)}</span>`}
                  ${job.location ? `<span class="job-location">, ${esc(job.location)}</span>` : ''}
                </div>
                <span class="job-dates">${esc(formatDateRange(job.startDate, job.endDate))}</span>
              </div>
              ${job.summary ? `<p class="job-summary">${esc(job.summary)}</p>` : ''}
            </div>
          </div>`).join('')}
      </div>
    </section>` : ''

  const skillsSection = data.skills?.length ? `
      <section class="resume-section">
        <h2 class="section-title">Skills</h2>
        ${data.skills.map(skill => `
          <div class="skill-group">
            <h4 class="skill-name">${esc(skill.name)}</h4>
            <div class="skill-tags">
              ${skill.keywords.map(kw => `<span class="skill-tag">${esc(kw)}</span>`).join('')}
            </div>
          </div>`).join('')}
      </section>` : ''

  const educationSection = data.education?.length ? `
      <section class="resume-section">
        <h2 class="section-title">Education</h2>
        ${data.education.map(edu => `
          <div class="edu-card">
            <div class="edu-header">
              <div>
                <p class="edu-institution">${esc(edu.institution)}</p>
                <p class="edu-degree">${esc(edu.studyType)}${edu.area ? `, ${esc(edu.area)}` : ''}</p>
              </div>
              <div class="edu-right">
                <span class="edu-dates">${esc(formatDateRange(edu.startDate, edu.endDate))}</span>
                ${edu.score ? `<span class="edu-score">GPA: ${esc(edu.score)}</span>` : ''}
              </div>
            </div>
          </div>`).join('')}
      </section>` : ''

  const skillsEdu = `<div class="two-col">${skillsSection}${educationSection}</div>`

  const certificates = data.certificates?.length ? `
    <section class="resume-section">
      <h2 class="section-title">Certificates</h2>
      <div class="cert-grid">
        ${data.certificates.map(cert => `
          <a ${cert.url ? `href="${esc(cert.url)}" target="_blank"` : ''} rel="noopener" class="cert-card">
            <span class="cert-name">${esc(cert.name)}</span>
            <span class="cert-meta">${esc(cert.issuer)} · ${esc(formatYear(cert.date))}</span>
          </a>`).join('')}
      </div>
    </section>` : ''

  const projects = data.projects?.length ? `
    <section class="resume-section">
      <h2 class="section-title">Projects</h2>
      ${data.projects.map(project => `
        <div class="project-item">
          <div class="project-header">
            ${project.url
              ? `<a href="${esc(project.url)}" target="_blank" rel="noopener" class="project-name">${esc(project.name)}</a>`
              : `<span class="project-name">${esc(project.name)}</span>`}
            <span class="project-date">${esc(formatYear(project.startDate))}</span>
          </div>
          <p class="project-desc">${esc(project.description)}</p>
          <div class="skill-tags" style="margin-top: 0.4rem;">
            ${(project.keywords || []).map(kw => `<span class="skill-tag skill-tag--muted">${esc(kw)}</span>`).join('')}
          </div>
        </div>`).join('')}
    </section>` : ''

  const publications = data.publications?.length ? `
    <section class="resume-section">
      <h2 class="section-title">Publications &amp; Talks</h2>
      ${data.publications.map(pub => `
        <div class="pub-item">
          <p class="pub-row">
            ${pub.url
              ? `<a href="${esc(pub.url)}" target="_blank" rel="noopener" class="pub-name">${esc(pub.name)}</a>`
              : `<span class="pub-name">${esc(pub.name)}</span>`}
            ${pub.publisher ? `<span class="pub-meta"> · ${esc(pub.publisher)}${pub.releaseDate ? ` · ${esc(formatDate(pub.releaseDate))}` : ''}</span>` : ''}
          </p>
          ${pub.summary ? `<p class="pub-summary">${esc(pub.summary)}</p>` : ''}
        </div>`).join('')}
    </section>` : ''

  const awardsSection = data.awards?.length ? `
      <section class="resume-section">
        <h2 class="section-title">Awards</h2>
        ${data.awards.map(award => `
          <div class="award-item">
            <p><span class="award-title">${esc(award.title)}</span><span class="pub-meta"> · ${esc(award.awarder)} · ${esc(formatYear(award.date))}</span></p>
            ${award.summary ? `<p class="pub-summary">${esc(award.summary)}</p>` : ''}
          </div>`).join('')}
      </section>` : ''

  const volunteerSection = data.volunteer?.length ? `
      <section class="resume-section">
        <h2 class="section-title">Volunteer</h2>
        ${data.volunteer.map(vol => `
          <div class="vol-item">
            <div class="job-header" style="margin-bottom: 0.3rem;">
              <p class="job-title-block" style="margin:0;">
                <span class="job-position">${esc(vol.position)}</span>
                <span class="job-sep"> · </span>
                ${vol.url
                  ? `<a href="${esc(vol.url)}" target="_blank" rel="noopener" class="job-company">${esc(vol.organization)}</a>`
                  : `<span class="job-company">${esc(vol.organization)}</span>`}
              </p>
              <span class="job-dates">${esc(formatDateRange(vol.startDate, vol.endDate))}</span>
            </div>
            ${vol.summary ? `<p class="job-summary">${esc(vol.summary)}</p>` : ''}
          </div>`).join('')}
      </section>` : ''

  const awardsVolunteer = (data.awards?.length || data.volunteer?.length) ? `<div class="two-col">${awardsSection}${volunteerSection}</div>` : ''

  const languagesSection = data.languages?.length ? `
      <section class="resume-section">
        <h2 class="section-title">Languages</h2>
        <ul class="simple-list">
          ${data.languages.map(lang => `<li><strong>${esc(lang.language)}</strong> — ${esc(lang.fluency)}</li>`).join('')}
        </ul>
      </section>` : ''

  const interestsSection = data.interests?.length ? `
      <section class="resume-section">
        <h2 class="section-title">Interests</h2>
        ${data.interests.map(interest => `
          <div>
            <p class="interest-name">${esc(interest.name)}</p>
            <div class="skill-tags">
              ${interest.keywords.map(kw => `<span class="skill-tag skill-tag--muted">${esc(kw)}</span>`).join('')}
            </div>
          </div>`).join('')}
      </section>` : ''

  const languagesInterests = (data.languages?.length || data.interests?.length) ? `<div class="two-col">${languagesSection}${interestsSection}</div>` : ''

  const references = data.references?.length ? `
    <section class="resume-section">
      <h2 class="section-title">References</h2>
      <div class="ref-grid">
        ${data.references.map(ref => `
          <blockquote class="ref-card">
            <p class="ref-text">${esc(ref.reference)}</p>
            <footer class="ref-name">— ${esc(ref.name)}</footer>
          </blockquote>`).join('')}
      </div>
    </section>` : ''

  return `<div class="resume-en">${header}${summary}${work}${skillsEdu}${certificates}${projects}${publications}${awardsVolunteer}${languagesInterests}${references}</div>`
}

// ── German CV (Lebenslauf), mirrors CvDePage.vue ───────────────────────────

function renderCvDe(data) {
  const b = data.basics

  const contactRows = [
    b.location && `<div class="lv-contact-row"><span class="lv-ct-label">Wohnort</span><span>${esc(b.location.city)}, ${esc(b.location.region)}</span></div>`,
    b.phone && `<div class="lv-contact-row"><span class="lv-ct-label">Telefon</span><a href="tel:${esc(b.phone)}">${esc(b.phone)}</a></div>`,
    b.email && `<div class="lv-contact-row"><span class="lv-ct-label">E-Mail</span><a href="mailto:${esc(b.email)}">${esc(b.email)}</a></div>`,
    b.url && `<div class="lv-contact-row"><span class="lv-ct-label">Website</span><a href="${esc(b.url)}" target="_blank" rel="noopener">${esc(b.url.replace('https://', ''))}</a></div>`,
    ...(b.profiles || []).map(p => `<div class="lv-contact-row"><span class="lv-ct-label">${esc(p.network)}</span><a href="${esc(p.url)}" target="_blank" rel="noopener">${esc(p.username)}</a></div>`),
  ].filter(Boolean).join('')

  const header = `
    <header class="lv-header">
      <div class="lv-header-left">
        <h1 class="lv-name">${esc(b.name)}</h1>
        <p class="lv-label">${esc(b.label)}</p>
        <div class="lv-contact-rows">${contactRows}</div>
      </div>
      ${b.image ? `<img src="${esc(b.image)}" alt="${esc(b.name)}" class="lv-photo" />` : ''}
    </header>`

  const summary = b.summary ? `
    <section class="lv-section">
      <div class="lv-section-header">Profil</div>
      <div class="lv-section-body"><p class="lv-summary">${esc(b.summary)}</p></div>
    </section>` : ''

  const work = data.work?.length ? `
    <section class="lv-section">
      <div class="lv-section-header">Berufserfahrung</div>
      <div class="lv-section-body">
        ${data.work.map(job => `
          <div class="lv-entry">
            <div class="lv-date-col">${esc(formatDateRangeDe(job.startDate, job.endDate))}</div>
            <div class="lv-content-col">
              <p class="lv-entry-title">${esc(job.position)}</p>
              <p class="lv-entry-sub">
                ${job.url ? `<a href="${esc(job.url)}" target="_blank" rel="noopener">${esc(job.name)}</a>` : `<span>${esc(job.name)}</span>`}
                ${job.location ? `<span class="lv-muted">, ${esc(job.location)}</span>` : ''}
              </p>
              ${job.summary ? `<p class="lv-entry-desc">${esc(job.summary)}</p>` : ''}
            </div>
          </div>`).join('')}
      </div>
    </section>` : ''

  const education = data.education?.length ? `
    <section class="lv-section">
      <div class="lv-section-header">Ausbildung</div>
      <div class="lv-section-body">
        ${data.education.map(edu => `
          <div class="lv-entry">
            <div class="lv-date-col">${esc(formatDateRangeDe(edu.startDate, edu.endDate))}</div>
            <div class="lv-content-col">
              <p class="lv-entry-title">${esc(edu.studyType)}</p>
              <p class="lv-entry-sub">${esc(edu.institution)}${edu.area ? `<span class="lv-muted"> · ${esc(edu.area)}</span>` : ''}</p>
              ${edu.score ? `<p class="lv-entry-detail">Note: ${esc(edu.score)}</p>` : ''}
            </div>
          </div>`).join('')}
      </div>
    </section>` : ''

  const skills = data.skills?.length ? `
    <section class="lv-section">
      <div class="lv-section-header">Kenntnisse und Fähigkeiten</div>
      <div class="lv-section-body">
        ${data.skills.map(skill => `
          <div class="lv-entry lv-entry--inline">
            <div class="lv-date-col lv-cat-label">${esc(skill.name)}</div>
            <div class="lv-content-col lv-kw-list">${esc(skill.keywords.join(' · '))}</div>
          </div>`).join('')}
      </div>
    </section>` : ''

  const languages = data.languages?.length ? `
    <section class="lv-section">
      <div class="lv-section-header">Sprachen</div>
      <div class="lv-section-body">
        ${data.languages.map(lang => `
          <div class="lv-entry lv-entry--inline">
            <div class="lv-date-col lv-cat-label">${esc(lang.language)}</div>
            <div class="lv-content-col">${esc(lang.fluency)}</div>
          </div>`).join('')}
      </div>
    </section>` : ''

  const certificates = data.certificates?.length ? `
    <section class="lv-section">
      <div class="lv-section-header">Zertifikate</div>
      <div class="lv-section-body">
        ${data.certificates.map(cert => `
          <div class="lv-entry">
            <div class="lv-date-col">${esc(formatYearDe(cert.date))}</div>
            <div class="lv-content-col">
              ${cert.url
                ? `<a href="${esc(cert.url)}" target="_blank" rel="noopener" class="lv-entry-title-link">${esc(cert.name)}</a>`
                : `<span class="lv-entry-title">${esc(cert.name)}</span>`}
              <span class="lv-muted"> · ${esc(cert.issuer)}</span>
            </div>
          </div>`).join('')}
      </div>
    </section>` : ''

  const projects = data.projects?.length ? `
    <section class="lv-section">
      <div class="lv-section-header">Projekte</div>
      <div class="lv-section-body">
        ${data.projects.map(project => `
          <div class="lv-entry">
            <div class="lv-date-col">${esc(formatYearDe(project.startDate))}</div>
            <div class="lv-content-col">
              <p class="lv-entry-title">
                ${project.url
                  ? `<a href="${esc(project.url)}" target="_blank" rel="noopener" class="lv-entry-title-link">${esc(project.name)}</a>`
                  : `<span>${esc(project.name)}</span>`}
              </p>
              ${project.description ? `<p class="lv-entry-desc">${esc(project.description)}</p>` : ''}
              ${project.keywords?.length ? `<p class="lv-entry-detail">${esc(project.keywords.join(' · '))}</p>` : ''}
            </div>
          </div>`).join('')}
      </div>
    </section>` : ''

  const publications = data.publications?.length ? `
    <section class="lv-section">
      <div class="lv-section-header">Veröffentlichungen</div>
      <div class="lv-section-body">
        ${data.publications.map(pub => `
          <div class="lv-entry">
            <div class="lv-date-col">${pub.releaseDate ? esc(formatYearDe(pub.releaseDate)) : ''}</div>
            <div class="lv-content-col">
              ${pub.url
                ? `<a href="${esc(pub.url)}" target="_blank" rel="noopener" class="lv-entry-title-link">${esc(pub.name)}</a>`
                : `<span class="lv-entry-title">${esc(pub.name)}</span>`}
              ${pub.publisher ? `<span class="lv-muted"> · ${esc(pub.publisher)}</span>` : ''}
              ${pub.summary ? `<p class="lv-entry-desc">${esc(pub.summary)}</p>` : ''}
            </div>
          </div>`).join('')}
      </div>
    </section>` : ''

  const awards = data.awards?.length ? `
    <section class="lv-section">
      <div class="lv-section-header">Auszeichnungen</div>
      <div class="lv-section-body">
        ${data.awards.map(award => `
          <div class="lv-entry">
            <div class="lv-date-col">${esc(formatYearDe(award.date))}</div>
            <div class="lv-content-col">
              <p class="lv-entry-title">${esc(award.title)}</p>
              <p class="lv-entry-sub">${esc(award.awarder)}</p>
              ${award.summary ? `<p class="lv-entry-desc">${esc(award.summary)}</p>` : ''}
            </div>
          </div>`).join('')}
      </div>
    </section>` : ''

  const volunteer = data.volunteer?.length ? `
    <section class="lv-section">
      <div class="lv-section-header">Ehrenamtliches Engagement</div>
      <div class="lv-section-body">
        ${data.volunteer.map(vol => `
          <div class="lv-entry">
            <div class="lv-date-col">${esc(formatDateRangeDe(vol.startDate, vol.endDate))}</div>
            <div class="lv-content-col">
              <p class="lv-entry-title">${esc(vol.position)}</p>
              <p class="lv-entry-sub">
                ${vol.url ? `<a href="${esc(vol.url)}" target="_blank" rel="noopener">${esc(vol.organization)}</a>` : `<span>${esc(vol.organization)}</span>`}
              </p>
              ${vol.summary ? `<p class="lv-entry-desc">${esc(vol.summary)}</p>` : ''}
            </div>
          </div>`).join('')}
      </div>
    </section>` : ''

  const interests = data.interests?.length ? `
    <section class="lv-section">
      <div class="lv-section-header">Interessen</div>
      <div class="lv-section-body">
        ${data.interests.map(interest => `
          <div class="lv-entry lv-entry--inline">
            <div class="lv-date-col lv-cat-label">${esc(interest.name)}</div>
            <div class="lv-content-col">${esc(interest.keywords.join(', '))}</div>
          </div>`).join('')}
      </div>
    </section>` : ''

  const signature = `
    <div class="lv-signature">
      <p>${esc(b.location?.city || 'Kaiserslautern')}, den _______________</p>
      <div class="lv-sig-line"></div>
      <p class="lv-sig-name">${esc(b.name)}</p>
    </div>`

  return `<div class="resume-de">${header}${summary}${work}${education}${skills}${languages}${certificates}${projects}${publications}${awards}${volunteer}${interests}${signature}</div>`
}

// ── Shell (mirrors CvLayout.vue) ────────────────────────────────────────────

function renderCvShell(innerHtml) {
  return `
    <div class="cv-shell">
      <div class="cv-toolbar no-print">
        <a href="/" class="cv-back">← Back to site</a>
        <button class="cv-print-btn" onclick="window.print()">Print / Save PDF</button>
      </div>
      <div class="cv-body">${innerHtml}</div>
    </div>`
}

// ── Page assembly ────────────────────────────────────────────────────────

const indexHtml = readFileSync(path.join(distDir, 'index.html'), 'utf-8')

// Fails loudly instead of silently no-opping (String.prototype.replace's
// default behavior) if dist/index.html's structure ever drifts from what
// this script assumes.
function replaceOnce(html, search, replacement) {
  const isRegex = search instanceof RegExp
  if (isRegex ? !search.test(html) : !html.includes(search)) {
    throw new Error(`prerender-cv: expected to find ${search} in dist/index.html`)
  }
  return html.replace(search, replacement)
}

function buildPage({ lang, title, description, bodyHtml }) {
  let html = indexHtml
  html = replaceOnce(html, '<html lang="en">', `<html lang="${lang}">`)
  html = replaceOnce(html, /<title>.*?<\/title>/, `<title>${esc(title)}</title>`)
  html = replaceOnce(html, /<meta name="description" content=".*?" \/>/, `<meta name="description" content="${esc(description)}" />`)
  html = replaceOnce(html, /<noscript>[\s\S]*?<\/noscript>/g, '')
  html = replaceOnce(html, '<div id="app"></div>', `<div id="app">${renderCvShell(bodyHtml)}</div>`)
  html = replaceOnce(html, '<body>', '<body style="background:#fff">')
  html = replaceOnce(html, '</head>', `<style>${cvShellCss}${cvEnCss}${cvDeCss}</style>\n  </head>`)

  return html
}

const cvHtml = buildPage({
  lang: 'en',
  title: 'Janis Walliser — CV',
  description: resumeEn.basics.label,
  bodyHtml: renderCvEn(resumeEn),
})

const lebenslaufHtml = buildPage({
  lang: 'de',
  title: 'Janis Walliser — Lebenslauf',
  description: resumeDe.basics.label,
  bodyHtml: renderCvDe(resumeDe),
})

writeFileSync(path.join(distDir, 'cv.html'), cvHtml)
writeFileSync(path.join(distDir, 'lebenslauf.html'), lebenslaufHtml)

console.log('Prerendered dist/cv.html and dist/lebenslauf.html')
