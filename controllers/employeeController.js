const connection = require('../config/connection');
const queries = require('../queries ')


const getAllEmployees = async (req, res) => {
  try {
    const [rows] = await connection.query('SELECT * FROM employee;');
    res.json(rows);
  } catch (error) {
    console.log(error);
    res.status(500).json({error});
  }
};



module.exports = {
  getAllEmployees,
}