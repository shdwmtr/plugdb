
## Plugin Database

> [!NOTE]
> This repository solely exists for developers to submit plugins.<br>
> Download & install plugins from https://steambrew.app/plugins

&nbsp;

### Submitting A Plugin

To submit a plugin to Millennium's plugin repository, open a pull request that adds your plugin as a submodule using the command
`git submodule add https://github.com/YourUsername/YourRepository your-plugin`
inside the `plugins` directory.

This will attach your repository from a specific commit, meaning when you update your repository, the changes won't be reflected here, unless you open a pull request to update it.
This is in place to prevent malicious code by forcing us to audit all of your code changes.

&nbsp;

### Updating Your Plugin

Once you have your submodule added, in order to update it,
change directory to `plugins/your-plugin`, checkout the branch you wish to use and pull:
```
git checkout your-plugin-branch
git pull
```
This should update your plugin to the latest version. Commit the change and open a pull request.

&nbsp;

In case you wish to clone plugins at their attached commits, run `git submodule update --init`.
