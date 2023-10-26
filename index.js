// Includes packages needed for this application
const {
  getAllEmployees,
  getAllRoles,
  getAllDepartments
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
      name: 'action',
      message: 'What would you like to do?',
      choices: actions
    },
    {
      type: 'input',
      name: 'employeeFirstName',
      message: 'What is the employee first name?',
      when: (answers) => answers.action === 'Add Employee'
    },
    {
      type: 'input',
      name: 'employeeLastName',
      message: 'What the employee last name?',
      when: (answers) => answers.action === 'Add Employee'
    }
  ];

function performAction (action){
  switch (action) {
    case 'View All Employees':
      getAllEmployees();
      break;
    case 'Add Employee':  
      break;
    case 'Update Employee Role':
      break;
    case 'View All Roles':
      getAllRoles();
      break;
    case 'Add Role':
      break;
    case 'View All Departments':
      getAllDepartments();
      break;
    case 'Add Department':
      break;
    case 'Quit':
      break;
  }
  }
}

// Initialize app
function init() {
    inquirer.prompt(questions)
    .then((answers) => getAllEmployees())
    .catch((err) => console.error(err));
}

// Initialize app
init();
