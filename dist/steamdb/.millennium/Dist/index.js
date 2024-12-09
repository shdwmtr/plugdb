const pluginName = "steam-db";
function InitializePlugins() {
    /**
     * This function is called n times depending on n plugin count,
     * Create the plugin list if it wasn't already created
     */
    !window.PLUGIN_LIST && (window.PLUGIN_LIST = {});
    // initialize a container for the plugin
    if (!window.PLUGIN_LIST[pluginName]) {
        window.PLUGIN_LIST[pluginName] = {};
    }
}
InitializePlugins()
const __call_server_method__ = (methodName, kwargs) => Millennium.callServerMethod(pluginName, methodName, kwargs)
const __wrapped_callable__ = (route) => MILLENNIUM_API.callable(__call_server_method__, route)
var millennium_main=function(e){"use strict";return e.default=async function(){},Object.defineProperty(e,"__esModule",{value:!0}),e}({});

function ExecutePluginModule() {
    // Assign the plugin on plugin list. 
    Object.assign(window.PLUGIN_LIST[pluginName], millennium_main);
    // Run the rolled up plugins default exported function 
    millennium_main["default"]();
    MILLENNIUM_BACKEND_IPC.postMessage(1, { pluginName: pluginName });
}
ExecutePluginModule()