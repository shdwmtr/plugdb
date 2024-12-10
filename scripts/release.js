const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const ParsePlugin = (pluginsDir, submodule) => {
    const submodulePath = path.join(pluginsDir, submodule);

    if (fs.existsSync(path.join(submodulePath, '.git'))) {
        try {
            return { plugin: submodule, commitId: execSync(`git -C ${submodulePath} rev-parse HEAD`, { encoding: 'utf-8' }).trim() };
        } 
        catch (error) {
            return { plugin: submodule, commitId: null };
        }
    } 
    else {
        return { plugin: submodule, commitId: null };
    }
}


module.exports = {
    generateNotes: async () => {
        const pluginsDir = path.resolve(process.cwd(), 'plugins');
        let pluginIds = [];
        let releaseNotes = '```json\n';

        if (fs.existsSync(pluginsDir)) {
            fs.readdirSync(pluginsDir).forEach(submodule => { pluginIds.push(ParsePlugin(pluginsDir, submodule)); });
        } 

        releaseNotes += JSON.stringify(pluginIds, null, 4);
        return releaseNotes + '\n```';
    }
};
