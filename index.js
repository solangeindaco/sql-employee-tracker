// Includes packages needed for this application
const inquirer = require('inquirer');
const actions = ['View All Employees', 
  'Add Employee',
  'Update Employee Role',
  'View All Roles', 
  'Add Role', 
  'View All Departments', 
  'Add Department', 
  'Quit'];


// Creates an array of questions for user input
const questions = [
    {
      type: 'input',
      name: 'text',
      message: 'What would you like to do?',
      choices: actions
    },
  ];


// Initialize app
function init() {
    inquirer.prompt(questions)
    .then((answers) => console.log(''))
    .then(() => console.log(''))
    .catch((err) => console.error(err));
}

// Initialize app
init();
