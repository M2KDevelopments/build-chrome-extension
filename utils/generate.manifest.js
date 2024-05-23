export function generateManifestFile(answers) {
    const json = {
        "name": answers.name,
        "short_name": answers.name,
        "version": "1.0.0.0",
        "description": answers.description,
        "manifest_version": 3,
        "minimum_chrome_version": answers.minimum_chrome_version,
        "permissions": answers.permissions,
        "action": {
            "default_popup": `index.html`,
            "default_icon": {
                "16": "logo.png",
                "32": "logo.png",
                "48": "logo.png"
            }
        },
        "icons": {
            "16": "logo.png",
            "32": "logo.png",
            "48": "logo.png",
            "128": "logo.png"
        },
        "web_accessible_resources": [
            {
                "resources": ["/icons/*"],
                "matches": ["<all_urls>"]
            }
        ]
    }

    if (answers.homepage_url) {
        json.homepage_url = answers.homepage_url;
    }

    if (answers.background) {
        json.background = {
            service_worker: "background.js"
        };
    }

    if (answers.content_scripts) {
        json.content_scripts = [
            {
                "matches": ["<all_urls>"],
                "js": ["content.js"],
                "css": ["styles.css"],
                "run_at": "document_end",
                "all_frames": true
            }
        ];
    }

    if (answers.content_security_policy) {
        json.content_security_policy = {
            extension_pages: "script-src 'self'; object-src 'self'"
        }
    }

    return JSON.stringify(json);
}