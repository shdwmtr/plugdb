const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const GetPluginName = (pluginDir) => { 
    const jsonPath = path.join(pluginDir, 'plugin.json');

    try {
        if (fs.existsSync(jsonPath)) {
            const pluginJson = JSON.parse(fs.readFileSync(jsonPath));
            return pluginJson.name;
        }
    }
    catch (error) {
        return null;
    }
}

const ParsePlugin = (pluginsDir, submodule) => {
    const submodulePath = path.join(pluginsDir, submodule);

    const pluginName = execSync(`git -C ${submodulePath} rev-list --max-parents=0 HEAD`, { encoding: 'utf-8' }).trim();

    if (fs.existsSync(path.join(submodulePath, '.git'))) {
        try {
            return { plugin: pluginName, commitId: execSync(`git -C ${submodulePath} rev-parse HEAD`, { encoding: 'utf-8' }).trim() };
        } 
        catch (error) {
            return { plugin: pluginName, commitId: null };
        }
    } 
    else {
        return { plugin: pluginName, commitId: null };
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
