const connection = require('../config/connection');

const addDepartment = async (departmentName) => {
  try {
    const sql = `INSERT INTO department (name) VALUES (?);`;
    const [rows] = await connection.query(sql, [departmentName]);
    console.log(`Added a new department ${departmentName} to the database`);
  } catch (error) {
    console.log(error);
  }
}

const addEmployee = async (firsName, lastName, roleId, managerId) => {
  try {
    const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?);`;
    const [rows] = await connection.query(sql, [firsName, lastName, roleId, managerId]);
    console.log(`Added a new employee ${firsName} ${lastName} to the database`);
  } catch (error) {
    console.log(error);
  }
}

const addRole = async (roleName, roleSalary, departmentId) => {
  try {
    const sql = `INSERT INTO role (title, salary, department_id) VALUES (?,?,?);`;
    const [rows] = await connection.query(sql, [roleName, roleSalary, departmentId]);
    console.log(`Added a new role ${roleName} to the database`);
  } catch (error) {
    console.log(error);
  }
}

const updateEmployeeRole = async (employeeId, roleId) => {
  try {
    const sql = `UPDATE employee SET role_id = ? WHERE id = ? ;`;
    const [rows] = await connection.query(sql, [roleId, employeeId]);
    console.log(`Updated employee's role`);
  } catch (error) {
    console.log(error);
  }
}

const getAllEmployees = async () => {
  try {
    const sql = `SELECT employee.id, employee.first_name, employee.last_name, 
                        title, department.name as department, salary , 
                        manager.first_name as manager_first_name, manager.last_name as manager_last_name 
                  FROM employee 
                  LEFT JOIN role ON employee.role_id = role.id 
                  LEFT JOIN department ON role.department_id = department.id 
                  LEFT JOIN employee as manager ON employee.manager_id = manager.id;` ;
    const [rows] = await connection.query(sql);
    console.table(rows);
  } catch (error) {
    console.log(error);
  }
};


const getAllRoles = async () => {
  try {
    const sql = `SELECT role.id, title, department.name as department, salary  FROM role
                 LEFT JOIN department ON role.department_id = department.id ;`;
    const [rows] = await connection.query(sql);
    console.table(rows);
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
    console.table(rows);
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
  updateEmployeeRole
}