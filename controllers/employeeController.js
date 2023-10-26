const connection = require('../config/connection');

const getAllEmployees = async () => {
  try {
    const sql = 'SELECT * FROM employee;';
    const [rows] = await connection.query(sql);
    console.table(rows);
  } catch (error) {
    console.log(error);
  }
};

const getAllRoles = async () => {
  try {
    const sql = 'SELECT * FROM role;';
    const [rows] = await connection.query(sql);
    console.table(rows);
  } catch (error) {
    console.log(error);
  }
};

const getAllDepartments = async () => {
  try {
    const sql = 'SELECT * FROM department;';
    const [rows] = await connection.query(sql);
    console.table(rows);
  } catch (error) {
    console.log(error);
  }
};


module.exports = {
  getAllEmployees,
  getAllRoles,
  getAllDepartments
}