const fs = require('fs');
const inquirer = require('inquirer');
const generateMarkdown = require('./utils/generateMarkdown');
const util = require('util');

function getLicense(value) {
    if (value === "GNU AGPLv3") {
        return "[![License: AGPL v3](https://img.shields.io/badge/License-AGPL%20v3-blue.svg)](https://www.gnu.org/licenses/agpl-3.0)";
    } else if (value === "GNU GPLv3") {
        return "[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)";
    } else if (value === "GNU LGPLv3") {
        return "[![License: LGPL v3](https://img.shields.io/badge/License-LGPL%20v3-blue.svg)](https://www.gnu.org/licenses/lgpl-3.0)";
    } else if (value === "Apache 2.0") {
        return "[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)";
    } else if (value === "Boost Software 1.0") {
        return "[![License](https://img.shields.io/badge/License-Boost%201.0-lightblue.svg)](https://www.boost.org/LICENSE_1_0.txt)";
    } else if (value === "MIT") {
        return "[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)";
    } else {
        return "[![License: MPL 2.0](https://img.shields.io/badge/License-MPL%202.0-brightgreen.svg)](https://opensource.org/licenses/MPL-2.0)";
    }
}


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
    fs.writeFile(fileName, generateMarkdown(data), function (err) {
        console.log(fileName)
        console.log(data)
        if (err) {
            return console.log(err)
        } else {
            console.log("success!")
        }
    })
}

function init() {
    inquirer.createPromptModule(questions).then((data) => {
        console.log(JSON.stringify(data, null, ""));
        data.getLicense = getLicense(data.license);
        writeToFile("./example/README.md", data);
    });
}

init();