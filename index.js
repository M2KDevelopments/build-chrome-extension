#!/usr/bin/env node
// Documentation - https://medium.com/nmc-techblog/building-a-cli-with-node-js-in-2024-c278802a3ef5

import figlet from 'figlet';
import chalk from 'chalk';
import { program } from "commander";
import inquirer from "inquirer";
import { prompts } from "./utils/prompts.js";
import { exec, spawn } from 'child_process';
import fs from 'fs/promises';
import path, { dirname } from 'path';


// Generate string for files
import { generateManifestFile } from './utils/generate.manifest.js'
import { generateIndexHTML, generateScript, generateStyles } from './utils/generate.vanilla.files.js';
import { generateBackground, generateContent } from './utils/generate.scripts.js';

// Get base directory - https://dev.to/adrvnc/how-to-resolve-the-dirname-is-not-defined-in-es-module-scope-error-in-javascript-584
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


// Initialization
program
    .version("1.0.0")
    .description("Node Js CLI tool that auto generates the necessary files and manifest.json for the chrome extension you want to build.");



// Show Title
console.log(chalk.yellow(figlet.textSync("Build Chrome Ext.", { horizontalLayout: "full" })));
console.log('By', chalk.blueBright('M2K Developments'));


// Execute shell commands
function shellCMD(command) {
    return new Promise((resolve, reject) => {
        exec(command, (err, stdout, stderr) => {
            if (err) {
                console.error(`exec error: ${err}`);
                reject(err);
            }
            resolve(stdout);
        });
    })
}

function nodeCMD(command, args) {
    return new Promise((resolve, reject) => {
        // https://nodejs.org/api/child_process.html#child_processspawncommand-args-options
        // https://stackoverflow.com/questions/68127183/how-to-get-the-output-of-command-executed-using-child-process-in-nodejs
        const child = spawn(command, args.split(" "), {
            shell: true,
            cwd: process.cwd(),
            env: process.env,
            stdio: ['inherit', 'pipe', 'pipe'],
            encoding: 'utf-8',
        });

        // Pipe child stdout to process stdout (terminal)...
        child.stdout.pipe(process.stdout);

        // ...and do something else with the data.
        // child.stdout.on('data', (data) => null);

        // command ended
        child.on('close', (code) => resolve(code));
    })
}


// When cli is done.
async function done(answers) {
    console.log(chalk.greenBright(`Building, ${answers.name}!`));

    // Stop if name was not provided
    if (!answers.name) console.log(chalk.redBright("Please enter a name for you chrome extension"));

    // Declare directory paths
    const folderName = answers.name.toLowerCase().replace(/\s/gmi, '-');
    const folder = path.join(process.cwd(), folderName);
    const assets = path.join(__dirname, 'assets')

    if (answers.framework === 'Vanilla HTML, CSS and JS') {

        // Create Folders
        await shellCMD(`mkdir "${folderName}"`);
        await shellCMD(`mkdir "${folderName}/icons"`);

        // Generate Manifes.json
        await fs.writeFile(path.join(folder, 'manifest.json'), generateManifestFile(answers));

        // Generate index.html
        await fs.writeFile(path.join(folder, 'index.html'), generateIndexHTML(answers));

        // Generate styles.css
        await fs.writeFile(path.join(folder, 'styles.css'), generateStyles());

        // Generate scripts.js
        await fs.writeFile(path.join(folder, 'scripts.js'), generateScript());

        // Generate scripts.js
        if (answers.content) await fs.writeFile(path.join(folder, 'content.js'), generateContent(answers));

        // Generate scripts.js
        if (answers.background) await fs.writeFile(path.join(folder, 'background.js'), generateBackground(answers));

        // Copy logo.png
        await fs.copyFile(path.join(assets, 'logo.png'), path.join(folder, 'logo.png'), fs.constants.COPYFILE_FICLONE);
        await fs.copyFile(path.join(assets, 'logo.png'), path.join(folder, 'icons', 'logo.png'), fs.constants.COPYFILE_FICLONE);

        // Copy logo.png
        await fs.copyFile(path.join(assets, 'favicon.ico'), path.join(folder, 'favicon.ico'), fs.constants.COPYFILE_FICLONE);


    } else if (answers.framework === "Vite") {
        await nodeCMD('npx', `create-vite ${folderName}`);

        // Create Folders
        await shellCMD(`mkdir "${folderName}/public/icons"`);

        // Generate Manifes.json
        await fs.writeFile(path.join(folder, 'public', 'manifest.json'), generateManifestFile(answers));

        // Generate scripts.js
        if (answers.content) await fs.writeFile(path.join(folder, 'public', 'content.js'), generateContent(answers));

        // Generate scripts.js
        if (answers.background) await fs.writeFile(path.join(folder, 'public', 'background.js'), generateBackground(answers));

        // Copy logo.png
        await fs.copyFile(path.join(assets, 'logo.png'), path.join(folder, 'public', 'logo.png'), fs.constants.COPYFILE_FICLONE);
        await fs.copyFile(path.join(assets, 'logo.png'), path.join(folder, 'public', 'icons', 'logo.png'), fs.constants.COPYFILE_FICLONE);

        // Copy logo.png
        await fs.copyFile(path.join(assets, 'favicon.ico'), path.join(folder, 'public', 'favicon.ico'), fs.constants.COPYFILE_FICLONE);


    } else {
        console.log('Framework was not chosen');
    }

    console.log(chalk.yellowBright("Alright Happy Building!"));
}

// process actions
program.action(() => inquirer.prompt(prompts).then(done));

// parse arguments
program.parse(process.argv);