const fs = require('fs');
const inquirer = require('inquirer');
//const generateMarkdown = require('../README-generator/utils/generateMarkdown');
const util = require('util');

const writeFileAsync = util.promisify(fs.writeFile);
let licenseDc;

const questions = [
    {
        type: "input",
        message: "What is the name of your project?",
        name: "projectTitle"
      },
      {
        type: 'input',
        message: 'What is a description of your project?',
        name: 'description'
      },
      {
        type: "input",
        message: "What is the installation process of your project?",
        name: "installation",
      },
      {
        type: "input",
        message: "What is the usage of your project?",
        name: "usage",
      },
      {
        type: "input",
        message: "How can someone contribute to your project?",
        name: "contributing",
      },
      {
        type: "input",
        message: "What are the testing guidelines?",
        name: "test",
      },
      {
        type: "list",
        message: "Please choose a license:",
        name: "license",
        choices: [
          "MIT",
          "Apache",
          "Creative Commons",
        ]
      },
      {
        type: "input",
        message: "What is your GitHub username?",
        name: "gitHub",
      },
      {
        type: 'input',
        message: 'What is your email address?',
        name: 'emailAddress'
      }
];

// function to generate readme file
function generatereadme(questions) {
  return `
  # ${questions.projectTitle}
  
  ## Description
  ${questions.description}
  ## Table of Contents:
  * [Installing](#Installing)
  * [Usage](#Usage)
  * [License](#License)
  * [Contributing](#Contributing)
  * [Tests](#Tests)
  * [Questions](#Questions)
  
  ### Installing
  
  ${questions.installation}
      
  ## Usage
  
  ${questions.usage}
  
  ## License
  ${questions.license}
  ${licenseDc}
  ## Contributing
  ${questions.contributing}
  ## Tests
  ${questions.test}
  ## Questions
  My GitHub profile can be viewed at https://github.com/${questions.gitHub}
  You can contact me by email at ${questions.emailAddress}
  `;
}

// function to initialize program
function init() {
    inquirer.prompt(questions)
    .then(function(questions) {
      switch (questions.license) {
        case "MIT":
          licenseDc = "[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)"
          break;       
        case 'Apache':
          licenseDc = '[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)'
          break;
        case 'Creative Commons':
          licenseDc = '[![License: CC0-1.0](https://licensebuttons.net/l/zero/1.0/80x15.png)](http://creativecommons.org/publicdomain/zero/1.0/)'
          break;
      }
      const readme = generatereadme(questions)
      
      return writeFileAsync("readme.md", readme)
    })
    .then(function() {
        console.log("The READme has been successfully made!")
    })
    .catch(function(err) {
      console.log(err)
    })
};

// function call to initialize program
init();
