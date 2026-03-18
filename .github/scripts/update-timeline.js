const fs = require('fs');
const path = require('path');

async function fetchGitHubRepos() {
  const response = await fetch('https://api.github.com/users/PhyberApex/repos?per_page=100&sort=updated&direction=desc');
  if (!response.ok) throw new Error('Failed to fetch GitHub repos');
  return response.json();
}

async function main() {
  const repos = await fetchGitHubRepos();
  
  // Filter and process repositories
  const timelineData = repos
    .filter(repo => repo.description && !repo.fork)
    .map(repo => ({
      name: repo.name,
      description: repo.description,
      created_at: repo.created_at,
      updated_at: repo.updated_at,
      language: repo.language || 'Other',
      stars: repo.stargazers_count,
      forks: repo.forks_count,
      url: repo.html_url
    }))
    .sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
  
  // Write to a JSON file for the timeline component
  const outputPath = path.join(__dirname, '..', 'docs', '.vuepress', 'public', 'timeline-data.json');
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, JSON.stringify(timelineData, null, 2));
  
  console.log(`Updated timeline data with ${timelineData.length} projects`);
}

main().catch(console.error);
