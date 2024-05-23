export function generateIndexHTML(answers) {
    return `
    <!DOCTYPE html>
    <html lang="en">
    
    <head>
        <meta charset="UTF-8">
        <link rel="icon" href="favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta name="description" content="${answers.description}" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="apple-touch-icon" href="logo.png" />
        <link rel="stylesheet" type="text/css" href="styles.css">
        <title>${answers.name}</title>
    </head>
    
    <body>
        <div id="root">
            <button>Hello World!</button>
        </div>
        <script type="text/javascript" src="scripts.js"></script>
    </body>
    
    </html>
    `
}

export function generateScript() {
    return `
        document.querySelector('button').onclick = ()=>{
            alert('Hello World!');
        }
    `;
}

export function generateStyles() {
    return `
        body {
            width: 340px;
            height: 480px;
        }
    `;
}