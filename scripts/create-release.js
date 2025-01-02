const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Helper function to safely copy files
function copyFile(src, dest) {
  try {
    fs.copyFileSync(src, dest);
    console.log(`Copied ${src} to ${dest}`);
  } catch (err) {
    console.warn(`::warning:: ${src} not found, skipping.`);
  }
}

// Create 'dist' directory if it doesn't exist
const distDir = path.join(__dirname, 'dist');
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

// Copy the necessary files
copyFile('plugin.json', path.join(distDir, 'plugin.json'));
copyFile('requirements.txt', path.join(distDir, 'requirements.txt'));
copyFile('README.md', path.join(distDir, 'README.md'));
copyFile('README', path.join(distDir, 'README'));

// Read the plugin.json
const pluginJson = JSON.parse(fs.readFileSync('plugin.json', 'utf-8'));

// Handle the backend field
const backend = pluginJson.backend;
if (backend !== null && backend) {
  const backendPath = path.join(__dirname, backend);
  if (fs.existsSync(backendPath)) {
    fs.cpSync(backendPath, path.join(distDir, backend), { recursive: true });
    console.log(`Copied backend: ${backend}`);
  }
}

// Handle the include field
const include = pluginJson.include || [];
include.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (fs.existsSync(filePath)) {
    fs.cpSync(filePath, path.join(distDir, file), { recursive: true });
    console.log(`Copied included file: ${file}`);
  }
});

// Generate metadata
const commit = execSync('git rev-parse HEAD').toString().trim();
const id = execSync('git rev-list --max-parents=0 HEAD').toString().trim();
const metadata = {
  commit,
  id,
};

fs.writeFileSync(path.join(distDir, 'metadata.json'), JSON.stringify(metadata, null, 2));
console.log('::notice::Computing plugin metadata...');

// Set the ID as an output variable (in GitHub Actions context, for example)
console.log(`::set-output name=id::${id}`);

// Create the zip file using the 'zip' command
const zipCommand = `zip -r ${path.join(distDir, `${id}.zip`)} .`;
execSync(zipCommand, { cwd: distDir });

console.log(`::notice::Successfully built plugin: ${id}.zip`);
