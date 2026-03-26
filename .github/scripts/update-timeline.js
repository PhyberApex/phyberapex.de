const fs = require('fs');
const path = require('path');

async function fetchGitHubRepos() {
  const headers = { 'Accept': 'application/vnd.github.v3+json' };
  if (process.env.GITHUB_TOKEN) {
    headers['Authorization'] = `Bearer ${process.env.GITHUB_TOKEN}`;
  }
  const response = await fetch('https://api.github.com/users/PhyberApex/repos?per_page=100&sort=updated&direction=desc', { headers });
  if (!response.ok) throw new Error(`Failed to fetch GitHub repos: ${response.status}`);
  return response.json();
}

async function main() {
  const repos = await fetchGitHubRepos();

  // Filter and process repositories — field names match what timeline.md's mapRepos() expects
  const timelineData = repos
    .filter(repo => repo.description && !repo.fork)
    .map(repo => ({
      name: repo.name,
      full_name: repo.full_name,
      description: repo.description,
      created_at: repo.created_at,
      updated_at: repo.updated_at,
      language: repo.language || 'Other',
      stars: repo.stargazers_count,
      forks: repo.forks_count,
      url: repo.html_url
    }))
    .sort((a, b) => new Date(a.created_at) - new Date(b.created_at));

  const outputPath = path.join(__dirname, '..', '..', 'docs', '.vuepress', 'public', 'timeline-data.json');
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, JSON.stringify(timelineData, null, 2));

  console.log(`Updated timeline data with ${timelineData.length} projects`);
}

main().catch(console.error);
