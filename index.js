#!/usr/bin/env node
// Documentation - https://medium.com/nmc-techblog/building-a-cli-with-node-js-in-2024-c278802a3ef5

// Determine the full path for the file to be created
// const filePath = path.join(process.cwd(), filename);

import figlet from 'figlet';
import chalk from 'chalk';
import { program } from "commander";
import inquirer from "inquirer";
import { prompts } from "./prompts.js";


// Initialization
program
    .version("1.0.0")
    .description("Node Js CLI tool that auto generates the necessary files and manifest.json for the chrome extension you want to build.");


    
// Show Title
console.log(chalk.yellow(figlet.textSync("Create Chrome Ext.", { horizontalLayout: "full" })));
console.log('By', chalk.blueBright('M2K Developments'));


// When cli is done.
function done(answers) {
    console.log(chalk.green(`Hey there, ${answers.name}!`));
}


// process actions
program.action(() => inquirer.prompt(prompts).then(done));

// parse arguments
program.parse(process.argv);