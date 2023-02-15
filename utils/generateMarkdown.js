function licenseBadge(data) {
    const licenseType = data.license[0];
    let licenseString = " "
    if (licenseType === "MIT") {
      licenseString = `![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)`
    };
    if (licenseType === "GNU General Public License 3.0") {
        licenseString = `![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)`
      };
    return licenseString
    };
  
  
  
  function generateMarkdown(data) {
    return `# ${data.title}
    https://github.com/${data.username}/${data.title}
    # Description
    ${data.description}
    # Table of Contents
    * [Installation](#installation)
    * [Usage](#usage)
    * [License](#license)
    * [Contributing](#contributing)
    * [Questions](#questions)
    # Instillation
    The following necessary dependencies must be installed to run the application properly: ${data.instillation}.
    # Usage
    In order to use this app, ${data.usage}
    # License
    ${licenseBadge(data)}
    # Contributing
    Contributors : ${data.contribution}
    # Tests
    The following is needed to run the test: ${data.tests}
    # Questions
    If you have any questions about the repo, open an issue or contact ${data.username} directly at: ${data.email}.
  `;
  }
  
  module.exports = generateMarkdown;