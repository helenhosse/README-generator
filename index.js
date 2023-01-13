// TODO: Include packages needed for this application

// TODO: Create an array of questions for user input
const questions = [];

// TODO: Create a function to write README file
function writeToFile(fileName, data) {}

// TODO: Create a function to initialize app
function init() {}

// Function call to initialize app
init();



const fs = require("fs");
const inquirer = require("inquirer");
const { listenerCount } = require("process");
const generateMarkdown = require


const questions = [
    {
        type: "input",
        name: "title of project",
        message: "What is the title of your project?",
        validate: validateInput,
    },

    {
        type: "input",
        name: "description of project",
        message: "Describe your project.",
        validate: validateInput,
    },

    {
        type:"input",
        name: "installtion used",
        message: "How was the software installed? Provide different commands.",
        validate: "validateInput",
    },

    {
        type:"input",
        name: "project use",
        message: "Describe how you are able to use your project",
        validate: validateInput,
    },

    {
        type: "list",
        name: "license of project",
        message: "Please select a license for your project.",
        choices: [
            "GNU AGPLv3",
            "GNU GPLv3",
            "GNU LGPLv3",
            "Apache 2.0",
            "Boost Software 1.0",
            "MIT",
            "Mozilla",
        ],
        validate: validateInput,
    },

    {
        type: "input",
        name: "contributes of project",
        message: "Who contributed to this project? How can future users contribute?",
        validate: validateInput,
    },

    {
        type: "input",
        name: "tests used for project",
        message: "Please verify any testing instructions needed for this project.",
        validate: validateInput,
    },

    {
        type: "input",
        name: "username of github",
        message: "What is your github username?",
        validate: validateInput,
    },

    {
        type: "input",
        name: "user email of github",
        message: "What is your github email?",
        validate: function (value) {
            if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
                return true;
            } else {
                return "Not a valid email address. Please enter a valid email address.";
            }
        },
    },
    
];

function writeToFile(fileName, data) {
    fs.writeFile(fileName, geneerateMarkdown(data), function (err) {
        if (err) {
            return console.log(err);
        }
    });
}

function init() {
    inquirer.createPromptModule(questions).then((data) => {
        console.log(JSON.stringify(data, null, ""));
        data.getLicense = getLicense(data.license);
        writeToFile("./example/README.md", data);
    });
}