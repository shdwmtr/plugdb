const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

module.exports = {
  generateNotes: async () => {
    const pluginsDir = path.resolve(process.cwd(), 'plugins');
    let releaseNotes = `# Submodule Commit IDs\n\n`;

    if (fs.existsSync(pluginsDir)) {
      const submodules = fs.readdirSync(pluginsDir);

      submodules.forEach(submodule => {
        const submodulePath = path.join(pluginsDir, submodule);
        if (fs.existsSync(path.join(submodulePath, '.git'))) {
          try {
            const commitId = execSync(`git -C ${submodulePath} rev-parse HEAD`, { encoding: 'utf-8' }).trim();
            releaseNotes += `- **${submodule}**: ${commitId}\n`;
          } catch (error) {
            releaseNotes += `- **${submodule}**: Error fetching commit ID\n`;
          }
        } else {
          releaseNotes += `- **${submodule}**: Not a Git repository\n`;
        }
      });
    } else {
      releaseNotes += `No plugins directory found.\n`;
    }

    return releaseNotes;
  }
};
