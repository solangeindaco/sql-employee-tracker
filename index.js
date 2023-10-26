// Includes packages needed for this application
const { up } = require('inquirer/lib/utils/readline');
const {
  addEmployee,
  addDepartment,
  addRole,
  getAllEmployees,
  getAllRoles,
  getAllDepartments,
  getRoleChoices,
  getManagerChoices,
  updateEmployeeRole
} = require('./controllers/employeeController');

const inquirer = require('inquirer');

let roleChoices = [
  { name: 'Software Engineer', value: 1 },
  { name: 'Sales Lead', value: 2 },
  { name: 'Accountant', value: 3 },
  { name: 'Lawyer', value: 4 },
  { name: 'Salesperson', value: 5 }
];

let managerChoices = [
  { name: 'John Doe', value: 1 },
  { name: 'Mike Chan', value: 2 },
  { name: 'Ashley Rodriguez', value: 3 },
  { name: 'Kevin Tupik', value: 4 },
  { name: 'Malia Brown', value: 5 },
  { name: 'Sarah Lourd', value: 6 },
  { name: 'Tom Allen', value: 7 },
  { name: 'Samantha Jones', value: 8 },
  { name: 'None', value: null }
];

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
      message: 'What is the employee\'s first name?',
      when: (answers) => answers.action === 'Add Employee'
    },
    {
      type: 'input',
      name: 'employeeLastName',
      message: 'What is the employee\'s last name?',
      when: (answers) => answers.action === 'Add Employee'
    },
    {
      type: 'list',
      name: 'employeeRoleId',
      message: 'What is the employee\'s role?',
      when: (answers) => answers.action === 'Add Employee',
      choices: roleChoices
    },
    {
      type: 'list',
      name: 'employeeManagerId',
      message: 'What is the employee\'s manager?',
      when: (answers) => answers.action === 'Add Employee',
      choices: managerChoices
    },
    {
      type: 'input',
      name: 'departmentName',
      message: 'What is the department\'s name ?',
      when: (answers) => answers.action === 'Add Department'
    },
    {
      type: 'input',
      name: 'roleName',
      message: 'What is role\'s name?',
      when: (answers) => answers.action === 'Add Role'
    },
    {
      type: 'input',
      name: 'roleSalary',
      message: 'What is role\'s salary?',
      when: (answers) => answers.action === 'Add Role'
    },
    {
      type: 'input',
      name: 'roleDeptId',
      message: 'What is role\'s department?',
      when: (answers) => answers.action === 'Add Role'
    }
  ];

function performAction (answers){
  switch (answers.action) {
    case 'View All Employees':
      getAllEmployees();
      break;
    case 'Add Employee':
      addEmployee(answers.employeeFirstName, answers.employeeLastName, answers.employeeRoleId, answers.employeeManagerId);  
      break;
    case 'Update Employee Role':
      updateEmployeeRole(answers.employeeId, answers.roleId);
      break;
    case 'View All Roles':
      getAllRoles();
      break;
    case 'Add Role':
      addRole(answers.roleName, answers.roleSalary, answers.roleDeptId);
      break;
    case 'View All Departments':
      getAllDepartments();
      break;
    case 'Add Department':
      addDepartment(answers.departmentName);
      break;
    case 'Quit':
      break;
    default:
      break;
    }
}

async function initChoices(){
  roleChoices = getRoleChoices();
  managerChoices = getManagerChoices();
}
// Initialize app
function init() {
  inquirer.prompt(questions)
  .then((answers) => performAction(answers))
  .catch((err) => console.error(err));
  
}

// Initialize app
init();
