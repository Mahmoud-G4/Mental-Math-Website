import mysql from 'mysql2';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const connection = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',              // Default to 'localhost' if DB_HOST is not set
  user: process.env.DB_USER || 'root',                   // Default to 'root' if DB_USER is not set
  password: process.env.DB_PASSWORD || '',                // Default to '' if DB_PASSWORD is not set
  database: process.env.DB_NAME || 'mental_math_db'      // Default to 'mental_math_db' if DB_NAME is not set
});

// Connect to MySQL
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err.stack);
    return;
  }
  console.log('Connected to MySQL as ID', connection.threadId);
});

export default connection; // Export the connection

