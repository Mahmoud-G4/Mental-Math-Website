const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',             // host, e.g., 'localhost'
  user: 'root',                 // MySQL username
  password: '',                // MySQL password
  database: 'mental_math_db'  // database name
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err.stack);
    return;
  }
  console.log('Connected to MySQL as ID', connection.threadId);
});

module.exports = connection;
