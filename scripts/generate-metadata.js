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
            return { id: pluginName, commitId: execSync(`git -C ${submodulePath} rev-parse HEAD`, { encoding: 'utf-8' }).trim() };
        } 
        catch (error) {
            return { id: pluginName, commitId: null };
        }
    } 
    else {
        return { id: pluginName, commitId: null };
    }
}
const pluginsDir = path.resolve(process.cwd(), 'plugins');
let pluginIds = [];
if (fs.existsSync(pluginsDir)) {
    fs.readdirSync(pluginsDir).forEach(submodule => { pluginIds.push(ParsePlugin(pluginsDir, submodule)); });
} 
// write JSON to metadata.json
fs.writeFileSync(path.resolve(process.cwd(), 'metadata.json'), JSON.stringify(pluginIds, null, 4));