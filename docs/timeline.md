---
title: Project Timeline
description: Interactive 3D timeline showcasing PhyberApex's development journey
sidebar: false
---

# 🎯 Interactive Project Timeline

<div id="timeline-container">
    <div class="loading">Loading timeline data...</div>
</div>

<div id="modal" class="modal hidden">
    <div class="modal-content">
        <span class="close">&times;</span>
        <h2 id="modal-title"></h2>
        <div id="modal-body"></div>
    </div>
</div>

<style>
#timeline-container {
    width: 100%;
    height: 80vh;
    min-height: 600px;
    position: relative;
    background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
}

.loading {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #e94560;
    font-size: 1.2rem;
    animation: pulse 1.5s infinite;
}

@keyframes pulse {
    0%, 100% { opacity: 0.6; }
    50% { opacity: 1; }
}

/* Modal Styles */
.modal {
    position: fixed;
    z-index: 1000;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.8);
    display: flex;
    align-items: center;
    justify-content: center;
}

.modal.hidden {
    display: none;
}

.modal-content {
    background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
    padding: 2rem;
    border-radius: 12px;
    max-width: 800px;
    max-height: 90vh;
    overflow-y: auto;
    position: relative;
    box-shadow: 0 12px 48px rgba(0, 0, 0, 0.5);
    border: 1px solid rgba(233, 69, 96, 0.3);
}

.close {
    position: absolute;
    right: 1.5rem;
    top: 1rem;
    font-size: 2rem;
    color: #e94560;
    cursor: pointer;
    transition: color 0.3s ease;
}

.close:hover {
    color: #ff6b6b;
}

.modal-content h2 {
    color: #e94560;
    margin-bottom: 1rem;
    border-bottom: 2px solid rgba(233, 69, 96, 0.3);
    padding-bottom: 0.5rem;
}

.modal-content h3 {
    color: #0fbcf9;
    margin-top: 1.5rem;
}

.modal-content ul {
    list-style-type: none;
    padding-left: 0;
}

.modal-content li {
    padding: 0.5rem 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.modal-content li:before {
    content: "▸";
    color: #e94560;
    margin-right: 0.5rem;
}

.code-block {
    background: rgba(0, 0, 0, 0.3);
    padding: 1rem;
    border-radius: 8px;
    overflow-x: auto;
    margin: 1rem 0;
}

.code-block code {
    font-family: 'Courier New', monospace;
    color: #a8ff60;
}

.video-container {
    position: relative;
    padding-bottom: 56.25%;
    height: 0;
    overflow: hidden;
    border-radius: 8px;
    margin: 1rem 0;
}

.video-container iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}

.project-link {
    display: inline-block;
    margin-top: 1rem;
    padding: 0.75rem 1.5rem;
    background: linear-gradient(135deg, #e94560 0%, #ff6b6b 100%);
    color: white;
    text-decoration: none;
    border-radius: 8px;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.project-link:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 16px rgba(233, 69, 96, 0.4);
}

/* Timeline SVG Styles */
.timeline-svg {
    width: 100%;
    height: 100%;
}

.timeline-path {
    fill: none;
    stroke: url(#gradient);
    stroke-width: 3;
    stroke-linecap: round;
}

.timeline-node {
    cursor: pointer;
    transition: all 0.3s ease;
}

.timeline-node circle {
    stroke: #fff;
    stroke-width: 2;
    transition: all 0.3s ease;
}

.timeline-node:hover circle {
    filter: drop-shadow(0 0 8px rgba(233, 69, 96, 0.8));
}

.timeline-node.active circle {
    stroke: #e94560;
    stroke-width: 3;
}

.timeline-node .node-label {
    fill: #fff;
    font-size: 12px;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    text-anchor: middle;
    pointer-events: none;
    opacity: 0.9;
}

.timeline-node .node-year {
    fill: #e94560;
    font-size: 11px;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    text-anchor: middle;
    pointer-events: none;
    font-weight: bold;
}

.timeline-node .node-icon {
    font-size: 16px;
    text-anchor: middle;
    dominant-baseline: central;
}

/* Responsive */
@media (max-width: 768px) {
    #timeline-container {
        height: 60vh;
        min-height: 400px;
    }
    
    .modal-content {
        padding: 1.5rem;
        margin: 1rem;
        max-width: calc(100% - 2rem);
    }
}

/* Animation for nodes appearing */
@keyframes nodeAppear {
    from {
        opacity: 0;
        transform: scale(0);
    }
    to {
        opacity: 1;
        transform: scale(1);
    }
}

.timeline-node {
    animation: nodeAppear 0.5s ease-out forwards;
}
</style>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import * as d3 from 'd3'

const timelineData = ref([])
const isLoading = ref(true)
const modalOpen = ref(false)
const selectedProject = ref(null)
let resizeObserver = null
let keyHandler = null

// Helper functions
function getRepoIcon(repoName) {
    if (repoName.includes('bot') || repoName.includes('discord')) return '🤖'
    if (repoName.includes('game') || repoName.includes('league')) return '🎮'
    if (repoName.includes('audio') || repoName.includes('music')) return '🎵'
    if (repoName.includes('tool') || repoName.includes('utility')) return '🔧'
    if (repoName.includes('schema') || repoName.includes('json')) return '📊'
    return '💻'
}

function shortenName(name) {
    if (name.length <= 12) return name
    return name.substring(0, 10) + '...'
}

function mapRepos(repos) {
    return repos
        .filter(repo => repo.description && !repo.fork)
        .map(repo => ({
            type: 'github',
            title: repo.name,
            name: repo.full_name || repo.name,
            description: repo.description,
            date: new Date(repo.created_at),
            updated: new Date(repo.updated_at),
            url: repo.url || repo.html_url,
            language: repo.language || 'Other',
            stars: repo.stars ?? repo.stargazers_count ?? 0,
            forks: repo.forks ?? repo.forks_count ?? 0,
            icon: getRepoIcon(repo.name)
        }))
        .sort((a, b) => a.date - b.date)
}

async function fetchTimelineData() {
    try {
        // Try static pre-generated JSON first (avoids API rate limits)
        try {
            const localRes = await fetch('/timeline-data.json')
            if (localRes.ok) {
                const localData = await localRes.json()
                timelineData.value = mapRepos(localData)
                isLoading.value = false
                setTimeout(() => renderTimeline(), 100)
                return
            }
        } catch {}

        // Fallback: fetch live from GitHub API
        const response = await fetch('https://api.github.com/users/PhyberApex/repos?per_page=100&sort=updated&direction=desc')
        if (!response.ok) throw new Error('Failed to fetch GitHub repos')

        const repos = await response.json()
        timelineData.value = mapRepos(repos)
        isLoading.value = false

        // Render after data is loaded
        setTimeout(() => renderTimeline(), 100)
    } catch (error) {
        console.error('Error:', error)
        isLoading.value = false
        const loadingEl = document.querySelector('.loading')
        if (loadingEl) loadingEl.textContent = 'Failed to load timeline data. Please try again later.'
    }
}

function openModal(project) {
    selectedProject.value = project
    modalOpen.value = true
    document.body.style.overflow = 'hidden'

    const modal = document.getElementById('modal')
    const titleEl = document.getElementById('modal-title')
    const bodyEl = document.getElementById('modal-body')

    titleEl.textContent = project.title
    bodyEl.innerHTML = `
        <p style="color: #ccc; margin-bottom: 1rem;">${project.description}</p>
        <h3>Details</h3>
        <ul>
            <li>Language: ${project.language}</li>
            <li>Stars: ${project.stars}</li>
            <li>Forks: ${project.forks}</li>
            <li>Created: ${project.date.getFullYear()}</li>
            <li>Last updated: ${project.updated.toLocaleDateString()}</li>
        </ul>
        <a class="project-link" href="${project.url}" target="_blank" rel="noopener noreferrer">View on GitHub</a>
    `
    modal.classList.remove('hidden')
}

function closeModal() {
    modalOpen.value = false
    selectedProject.value = null
    document.body.style.overflow = ''
    document.getElementById('modal').classList.add('hidden')
}

function renderTimeline() {
    const container = document.getElementById('timeline-container')
    
    // Clear previous SVG
    container.innerHTML = '<div id="timeline-svg-wrapper"></div>'
    
    const width = container.offsetWidth || 800
    const height = container.offsetHeight || 600
    
    if (timelineData.value.length === 0) {
        container.innerHTML += '<div class="loading">No projects found</div>'
        return
    }
    
    // Create SVG with D3
    const svg = d3.select('#timeline-svg-wrapper')
        .append('svg')
        .attr('class', 'timeline-svg')
        .attr('viewBox', `0 0 ${width} ${height}`)
    
    // Add gradient definition
    const defs = svg.append('defs')
    const gradient = defs.append('linearGradient')
        .attr('id', 'gradient')
        .attr('x1', '0%')
        .attr('y1', '0%')
        .attr('x2', '100%')
        .attr('y2', '0%')
    
    gradient.append('stop')
        .attr('offset', '0%')
        .attr('stop-color', '#e94560')
    
    gradient.append('stop')
        .attr('offset', '50%')
        .attr('stop-color', '#0fbcf9')
    
    gradient.append('stop')
        .attr('offset', '100%')
        .attr('stop-color', '#a8ff60')
    
    // Calculate node positions along a curved path
    const padding = 80
    const curvePoints = []
    const numNodes = Math.min(timelineData.value.length, 12) // Limit to 12 nodes for readability
    
    if (numNodes === 0) {
        container.innerHTML += '<div class="loading">No projects found</div>'
        return
    }
    
    // Create curved path using quadratic bezier curves
    const stepX = (width - padding * 2) / Math.max(numNodes - 1, 1)
    const centerY = height / 2
    
    for (let i = 0; i < numNodes; i++) {
        const x = padding + i * stepX
        // Create wave pattern with varying y positions
        const yOffset = Math.sin(i * Math.PI / (numNodes - 1 || 1)) * 60
        curvePoints.push({ x, y: centerY + yOffset })
    }
    
    // Draw the path
    const line = d3.line()
        .x(d => d.x)
        .y(d => d.y)
        .curve(d3.curveCatmullRom.alpha(0.5))
    
    svg.append('path')
        .datum(curvePoints)
        .attr('class', 'timeline-path')
        .attr('d', line)
    
    // Create nodes
    const nodes = svg.selectAll('.timeline-node')
        .data(timelineData.value.slice(0, numNodes))
        .enter()
        .append('g')
        .attr('class', 'timeline-node')
        .attr('transform', (d, i) => {
            if (i < curvePoints.length) {
                return `translate(${curvePoints[i].x}, ${curvePoints[i].y})`
            }
            return 'translate(0, 0)'
        })
        .on('click', (event, d) => {
            event.stopPropagation()
            openModal(d)
        })
    
    // Add node circles with size based on age (older = larger)
    const minYear = timelineData.value[0]?.date?.getFullYear() || 2024
    const maxYear = new Date().getFullYear()
    const ageScale = d3.scaleLinear()
        .domain([minYear, maxYear])
        .range([15, 25])
    
    nodes.append('circle')
        .attr('r', (d) => ageScale(d.date.getFullYear()))
        .attr('fill', (d) => {
            if (d.language === 'TypeScript' || d.language === 'Vue') return '#3178c6'
            if (d.language === 'Java') return '#f89820'
            if (d.language === 'Python') return '#3572a5'
            if (d.language === 'JavaScript') return '#f7df1e'
            return '#e94560'
        })
    
    // Add year labels
    nodes.append('text')
        .attr('class', 'node-year')
        .attr('y', (d) => ageScale(d.date.getFullYear()) + 20)
        .text((d) => d.date.getFullYear())
    
    // Add icon labels
    nodes.append('text')
        .attr('class', 'node-icon')
        .attr('dy', 4)
        .text((d) => d.icon)
    
    // Add name labels below year
    nodes.append('text')
        .attr('class', 'node-label')
        .attr('y', (d) => ageScale(d.date.getFullYear()) + 35)
        .text((d) => shortenName(d.title))
}

// Handle window resize
function handleResize() {
    if (!isLoading.value && timelineData.value.length > 0) {
        renderTimeline()
    }
}

onMounted(() => {
    fetchTimelineData()

    // Set up resize observer
    resizeObserver = new ResizeObserver(handleResize)
    const container = document.getElementById('timeline-container')
    if (container) {
        resizeObserver.observe(container)
    }

    // Close button and backdrop click
    document.querySelector('.close').addEventListener('click', closeModal)
    document.getElementById('modal').addEventListener('click', (e) => {
        if (e.target === e.currentTarget) closeModal()
    })

    // Keyboard close
    keyHandler = (e) => { if (e.key === 'Escape' && modalOpen.value) closeModal() }
    document.addEventListener('keydown', keyHandler)
})

onBeforeUnmount(() => {
    if (resizeObserver) {
        resizeObserver.disconnect()
    }
    if (keyHandler) {
        document.removeEventListener('keydown', keyHandler)
    }
})
</script>
