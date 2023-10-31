// Includes packages needed for this application
const inquirer = require('inquirer');
const figlet = require('figlet');

const {
  addEmployee,
  addDepartment,
  addRole,
  getAllEmployees,
  getAllEmployeesByManager,
  getAllEmployeesByDepartment,
  getAllRoles,
  getAllDepartments,
  getRoleChoices,
  getEmployeeChoices,
  getDepartmentChoices,
  getBudgetByDepartment,
  updateEmployeeRole,
  updateEmployeeManager,
  deleteRole,
  deleteDepartment,
  deleteEmployee
} = require('./controllers/employeeController');

// Array of actions
const actions = 
 ['View All Employees', 
  'View Employees by Manager',
  'View Employees by Department',
  'Add Employee',
  'Update Employee Role',
  'Update Employee Manager',
  'View All Roles', 
  'Add Role', 
  'View All Departments', 
  'Add Department', 
  'View the total utilized budget of a department',
  'Delete Role',
  'Delete Department',
  'Delete Employee',
  'Quit'];

function performAction (answers){
  switch (answers.action) {
    case 'View All Employees':
      getAllEmployees();
      break;
    case 'View Employees by Manager':
      getAllEmployeesByManager(answers.managerId);
      break;
    case 'View Employees by Department':
      getAllEmployeesByDepartment(answers.departmentId);
      break;
    case 'Add Employee':
      addEmployee(answers.employeeFirstName, answers.employeeLastName, answers.employeeRoleId, answers.managerId);  
      break;
    case 'Update Employee Role':
      updateEmployeeRole(answers.employeeId, answers.roleId);
      break;
    case 'Update Employee Manager':
      updateEmployeeManager(answers.employeeId, answers.managerId);
      break;
    case 'View All Roles':
      getAllRoles();
      break;
    case 'Add Role':
      addRole(answers.roleName, answers.roleSalary, answers.departmentId);
      break;
    case 'View All Departments':
      getAllDepartments();
      break;
    case 'Add Department':
      addDepartment(answers.departmentName);
      break;
    case 'View the total utilized budget of a department':
      getBudgetByDepartment(answers.departmentId);
      break;
    case 'Delete Role':
      deleteRole(answers.roleId);
      break;  
    case 'Delete Department':
      deleteDepartment(answers.departmentId);
      break;
    case 'Delete Employee':
      deleteEmployee(answers.employeeId);
      break;
    case 'Quit':
      process.exit();
      return;
    }
    askQuestions();
}

function initQuestions(roleChoices, employeeChoices, departmentChoices, managerChoices){
  
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
      name: 'managerId',
      message: 'Who is the employee\'s manager?',
      when: (answers) => answers.action === 'Add Employee',
      choices: managerChoices
    },
    {
      type: 'list',
      name: 'managerId',
      message: 'Who is the manager you want to see all his/her employees?',
      when: (answers) => answers.action === 'View Employees by Manager',
      choices: employeeChoices
    },
    {
      type: 'list',
      name: 'departmentId',
      message: 'Which department you want to see all its employees?',
      when: (answers) => answers.action === 'View Employees by Department',
      choices: departmentChoices
    },
    {
      type: 'list',
      name: 'departmentId',
      message: 'Which department you want to its budget?',
      when: (answers) => answers.action === 'View the total utilized budget of a department',
      choices: departmentChoices
    },
    {
      type: 'list',
      name: 'employeeId',
      message: 'Which employee do you want to update his/her manager?',
      when: (answers) => answers.action === 'Update Employee Manager',
      choices: employeeChoices
    },
    {
      type: 'list',
      name: 'managerId',
      message: 'Which manager do you want to assign to the selected employee?',
      when: (answers) => answers.action === 'Update Employee Manager',
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
      type: 'list',
      name: 'departmentId',
      message: 'What is role\'s department?',
      when: (answers) => answers.action === 'Add Role',
      choices: departmentChoices
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
    },
    {
      type: 'list',
      name: 'roleId',
      message: 'Which role do you want to delete?',
      when: (answers) => answers.action === 'Delete Role',
      choices: roleChoices
    },
    {
      type: 'list',
      name: 'departmentId',
      message: 'Which department do you want to assign to delete?',
      when: (answers) => answers.action === 'Delete Department',
      choices: departmentChoices
    },
    {
      type: 'list',
      name: 'employeeId',
      message: 'Which employee do you want to delete?',
      when: (answers) => answers.action === 'Delete Employee',
      choices: employeeChoices
    },
  ];
  return questions;
}

async function askQuestions(){
  const departmentChoices = await getDepartmentChoices();
  const employeeChoices = await getEmployeeChoices();
  const roleChoices = await getRoleChoices();
  const managerChoices = employeeChoices.push({name: 'None', value: null});
  
  const questions = initQuestions(roleChoices, employeeChoices, departmentChoices, managerChoices);

  inquirer.prompt(questions)
  .then((answers) => performAction(answers))
  .catch((err) => console.error(err));
}

async function renderBanner(){
  console.log(`\n\n--------------------------------------------------\n\n`);
  await figlet(`\n\nEmployee \n\n\ Manager\n\n`, function (err, data) {
          if (err) {
          console.log("Something went wrong...");
          console.dir(err);
          return;
          }
          console.log(data);
        });
  console.log(`\n\n--------------------------------------------------\n\n`);
}
// Initialize app
function init() {
  renderBanner();
  askQuestions();
}

// Initialize app
init();
