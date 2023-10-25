// Includes packages needed for this application
const {
  getAllEmployees
} = require('./controllers/employeeController');

const inquirer = require('inquirer');

// Array of actions
const actions = 
 ['View All Employees', 
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
      type: 'list',
      name: 'text',
      message: 'What would you like to do?',
      choices: actions
    },
  ];


// Initialize app
function init() {
    inquirer.prompt(questions)
    .then((answers) => console.log(getAllEmployees()))
    .catch((err) => console.error(err));
}

// Initialize app
init();
