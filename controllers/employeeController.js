const connection = require('../config/connection');
const { table } = require('table');

function printTable(rows, columns) {
  const data = [columns];
  rows.forEach(row => {
    const rowData = [];
    columns.forEach(column => {
      rowData.push(row[column]);
    });
    data.push(rowData);
  });
  const output = table(data);
  console.log(output);
}

const addDepartment = async (departmentName) => {
  try {
    const sql = `INSERT INTO department (name) VALUES (?);`;
    await connection.query(sql, [departmentName]);
    console.log(`Added a new department ${departmentName} to the database`);
  } catch (error) {
    console.log(error);
  }
}

const addEmployee = async (firsName, lastName, roleId, managerId) => {
  try {
    const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?);`;
    await connection.query(sql, [firsName, lastName, roleId, managerId]);
    console.log(`Added a new employee ${firsName} ${lastName} to the database`);
  } catch (error) {
    console.log(error);
  }
}

const addRole = async (roleName, roleSalary, departmentId) => {
  try {
    const sql = `INSERT INTO role (title, salary, department_id) VALUES (?,?,?);`;
    await connection.query(sql, [roleName, roleSalary, departmentId]);
    console.log(`Added a new role ${roleName} to the database`);
  } catch (error) {
    console.log(error);
  }
}

const updateEmployeeRole = async (employeeId, roleId) => {
  try {
    const sql = `UPDATE employee SET role_id = ? WHERE id = ? ;`;
    await connection.query(sql, [roleId, employeeId]);
    console.log(`Updated employee's role`);
  } catch (error) {
    console.log(error);
  }
}

const updateEmployeeManager = async (employeeId, managerId) => {
  try {
    const sql = `UPDATE employee SET manager_id = ? WHERE id = ? ;`;
    await connection.query(sql, [managerId, employeeId]);
    console.log(`Updated employee's manager`);
  } catch (error) {
    console.log(error);
  }
}

const getAllEmployees = async () => {
  try {
    const sql = `SELECT employee.id, employee.first_name, employee.last_name, 
                        title, department.name as department, salary , 
                        CONCAT (manager.first_name,' ',manager.last_name) AS 'manager'
                  FROM employee 
                  LEFT JOIN role ON employee.role_id = role.id 
                  LEFT JOIN department ON role.department_id = department.id 
                  LEFT JOIN employee as manager ON employee.manager_id = manager.id;` ;
    const [rows] = await connection.query(sql);
    printTable(rows, ['id', 'first_name', 'last_name', 'title', 'department', 'salary', 'manager']);
  } catch (error) {
    console.log(error);
  }
};


const getAllRoles = async () => {
  try {
    const sql = `SELECT role.id, title, department.name as department, salary  FROM role
                 LEFT JOIN department ON role.department_id = department.id ;`;
    const [rows] = await connection.query(sql);
    printTable(rows, ['id', 'title', 'department', 'salary']);
  } catch (error) {
    console.log(error);
  }
};


const getRoleChoices = async () => {
  try {
    const sql = 'SELECT * FROM role;';
    const [rows] = await connection.query(sql);
    const roles = rows.map(({ id, title }) => ({
      name: title,
      value: id
    }));
    return roles;
  } catch (error) {
    console.log(error);
  }
}



const getEmployeeChoices = async () => {
  try {
    const sql = 'SELECT * FROM employee;';
    const [rows] = await connection.query(sql);
    const managers = rows.map(({ id, first_name, last_name }) => ({
      name: `${first_name} ${last_name}`,
      value: id
    }));
    managers.push({ name: 'None', value: null });
    return managers;
  } catch (error) {
    console.log(error);
  }
}

const getAllDepartments = async () => {
  try {
    const sql = 'SELECT * FROM department;';
    const [rows] = await connection.query(sql);
    printTable(rows);
  } catch (error) {
    console.log(error);
  }
};

const getDepartmentChoices = async () => {
  try {
    const sql = 'SELECT * FROM department;';
    const [rows] = await connection.query(sql);
    const departments = rows.map(({ id, name }) => ({
      name: name,
      value: id
    }));
    return departments;
  } catch (error) {
    console.log(error);
  }
};


module.exports = {
  addEmployee,
  addDepartment,
  addRole,
  getAllEmployees,
  getAllRoles,
  getAllDepartments,
  getRoleChoices,
  getEmployeeChoices,
  getDepartmentChoices,
  updateEmployeeRole,
  updateEmployeeManager
}