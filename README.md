> [!NOTE]
> This repository solely exists for developers to submit plugins.
> 
> Download & install plugins from https://steambrew.app/plugins

## Plugin Database

### Submitting A Plugin

To submit a plugin to Millennium's plugin repository, open a pull request that adds your plugin as a submodule using the command below
`git submodule add https://github.com/YourUsername/YourRepository /plugins`

This will attach your repository from a specific commit, meaning when you update your repository, the changes wont be reflected here unless you open a pull request to update it. 
This is in place to prevent malicious code by forcing us to audit all of your code changes. 

&nbsp;

### Updating Your Plugin

Once you have your submodule added, in order to update it,
change directories to `plugins/your-plugin` and run `git submodule update --init`.
This should update your plugin to the latest version.
