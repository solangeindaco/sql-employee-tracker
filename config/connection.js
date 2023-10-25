require('dotenv').config();
const mysql = require('mysql2');


const connection = mysql.createConnection({
    host: '127.0.0.1', // 127.0.0.1
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
}).promise();



module.exports = connection;