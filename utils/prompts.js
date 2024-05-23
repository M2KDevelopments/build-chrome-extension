export const prompts = [
    {
        "type": "input",
        "name": "name",
        "message": "Chrome Extension Name?",
        "default": "m2kextension"
    },
    {
        "type": "input",
        "name": "description",
        "message": "Short description for your chrome extension?",
        "default": "Hello world! First extension."
    },
    {
        "type": "list",
        "name": "framework",
        "message": "Choose an FrameWork:",
        "choices": [
            "Vanilla HTML, CSS and JS",
            "Vite",
            "React",
            "Vue",
            "Svelte",
            "Angualar",
            "Solid",
            "Htmlx"
        ]
    },
    {
        "type": "checkbox",
        "name": "permissions",
        "message": "Which permissions do you want to include?",
        "choices": [
            "activeTab",
            "alarms",
            "bookmarks",
            "cookies",
            "contextMenus",
            "identity",
            "gcm",
            "notifications",
            "storage",
            "tabs",
            "unlimitedStorage"
        ]
    },
    {
        "type": "input",
        "name": "minimum_chrome_version",
        "message": "Minimum Chrome Version?",
        "default": "88"
    },
    {
        "type": "confirm",
        "name": "content",
        "message": "Include a default Content Script (content.js)?",
        "default": true
    },
    {
        "type": "confirm",
        "name": "background",
        "message": "Include Background Script (background.js)?",
        "default": true
    },
    {
        "type": "confirm",
        "name": "content_security_policy",
        "message": "Include Content Security Policy?",
        "default": true
    },
    {
        "type": "input",
        "name": "homepage_url",
        "message": "Home page url?",
        "default": ""
    },
    {
        "type": "input",
        "name": "install",
        "message": "On Install redirect url?",
        "default": ""
    },
    {
        "type": "input",
        "name": "uninstall",
        "message": "On Uninstall redirect url?",
        "default": ""
    }
]