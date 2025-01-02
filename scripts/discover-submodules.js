const { execSync } = require('child_process');

// log current directory
console.log('Current directory:', execSync('pwd').toString().trim());
let json = [];

try {
    const submoduleNames = execSync('git submodule foreach --quiet "echo $name"').toString().split('\n').filter(Boolean);
    console.log('submoduleNames:', submoduleNames)

    const topLevelDir = execSync('git rev-parse --show-toplevel').toString().trim();
    console.log('topLevelDir:', topLevelDir)

    submoduleNames.forEach((name) => {
        const url = execSync(`git config --file ${topLevelDir}/.gitmodules submodule.${name}.url`).toString().trim();
        
        const owner = url.replace(/https:\/\/github.com\/([^\/]+)\/.*/, '$1');
        const repo = url.replace(/https:\/\/github.com\/[^\/]+\/([^\/]+).*/, '$1').replace(/\.git$/, '');
        
        json.push({ owner: owner, repo: repo });
    });
} 
catch (error) {
    console.error('Error processing submodules:', error);
}

console.log(JSON.stringify(json, null, 4));
