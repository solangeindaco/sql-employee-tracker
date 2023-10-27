// Includes packages needed for this application
const inquirer = require('inquirer');
const figlet = require('figlet');

const {
  addEmployee,
  addDepartment,
  addRole,
  getAllEmployees,
  getAllRoles,
  getAllDepartments,
  getRoleChoices,
  getEmployeeChoices,
  updateEmployeeRole
} = require('./controllers/employeeController');

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
      return;
    }
    askQuestions();
}

function initQuestions(roleChoices, employeeChoices){
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
      message: 'Who is the employee\'s manager?',
      when: (answers) => answers.action === 'Add Employee',
      choices: employeeChoices
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
    },
    {
      type: 'list',
      name: 'employeeId',
      message: 'Which employee\'s role do you want to update?',
      when: (answers) => answers.action === 'Update Employee Role',
      choices: employeeChoices
    },
    {
      type: 'list',
      name: 'roleId',
      message: 'Which role do you want to assign to the selected employee?',
      when: (answers) => answers.action === 'Update Employee Role',
      choices: roleChoices
    }
  ];
  return questions;
}

async function askQuestions(){
  const employeeChoices = await getEmployeeChoices();
  const roleChoices = await getRoleChoices();
  const questions = initQuestions(roleChoices, employeeChoices);

  inquirer.prompt(questions)
  .then((answers) => performAction(answers))
  .catch((err) => console.error(err));
}

function renderBanner(){
  figlet("\n\nEmployee \n\n Manager\n\n", function (err, data) {
      if (err) {
      console.log("Something went wrong...");
      console.dir(err);
      return;
      }
      console.log(data);
  });
}
// Initialize app
function init() {
  renderBanner();
  askQuestions();
  process.exit(0);
}

// Initialize app
init();
