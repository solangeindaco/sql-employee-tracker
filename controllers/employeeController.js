const connection = require('../config/connection');

const getAllEmployees = async () => {
  try {
    const sql = 'SELECT * FROM employee;';
    const [rows] = await connection.query('SELECT * FROM employee;');
    return rows;
  } catch (error) {
    console.log(error);
  }
};


module.exports = {
  getAllEmployees
}