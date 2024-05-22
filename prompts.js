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
        "message": "Which Permissions do you want to include?",
        "choices": [
            "alarms",
            "bookmarks",
            "cookies",
            "contextMenus",
            "identity",
            "gcm",
            "notifications",
            "storage",
            "tabs"
        ]
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
]