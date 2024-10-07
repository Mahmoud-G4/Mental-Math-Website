require('dotenv').config();
const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost', // Use environment variable or default to localhost
  user: process.env.DB_USER || 'root',      // Use environment variable or default to 'root'
  password: process.env.DB_PASSWORD || '',   // Use environment variable or default to empty
  database: process.env.DB_NAME || 'mental_math_db',
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err.stack);
    return;
  }
  console.log('Connected to MySQL as ID', connection.threadId);
});

module.exports = connection;
