

/**Generates string for background script */
export function generateBackground(answers) {
    return `
    const INSTALL_URL = "${answers.install}";
    const UNINSTALL_URL = "${answers.uninstall}";
    chrome.runtime.onInstalled.addListener(function (details) {

        const INSTALL = "install", UPDATE = "update", CHROME_UPDATE = "chrome_update", SHARED_UPDATE = "shared_module_update";
    
        if (details.reason === INSTALL) {
            ${answers.install ? `chrome.tabs.create({ url: INSTALL_URL });` : ""}
        }
    
        if (details.reason === UPDATE || details.reason === CHROME_UPDATE || details.reason === SHARED_UPDATE) {
            
        }
        ${answers.uninstall ? `// When extension is uninstalled redirect to page` : ""}
        ${answers.uninstall ? `chrome.runtime.setUninstallURL(UNINSTALL_URL);` : ""}
        
        // load background info
        loadInfo();
   
    });
    
    // On chrome extension startup
    chrome.runtime.onStartup.addListener(loadInfo);

    function loadInfo(){
        // Todo Code: Load background info.
    }
    `
}

/** Generate string for content scripts */
export function generateContent(answers) {
    return `console.log("Running ${answers.name}")`;

}