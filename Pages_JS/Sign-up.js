import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import nodemailer from 'nodemailer';
import db from './DataBase_conn.js'; // Import the database connection
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables

// Function to generate a random 7-digit student code
function generateStudentCode() {
  const min = 1000000;  // 7 digits minimum
  const max = 9999999;  // 7 digits maximum
  const code = Math.floor(Math.random() * (max - min + 1)) + min;
  console.log('Generated Student Code:', code);  // Log the generated code
  return code;
}

// Function to check if the generated student code is unique
async function isCodeUnique(code) {
  return new Promise((resolve, reject) => {
    const query = 'SELECT COUNT(*) as count FROM users WHERE student_code = ?';
    db.query(query, [code], (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows[0].count === 0);
      }
    });
  });
}

// Function to generate a unique student code
async function generateUniqueCode() {
  let code;
  let isUnique = false;

  while (!isUnique) {
    code = generateStudentCode();  // Generate a random 7-digit code
    isUnique = await isCodeUnique(code);  // Check uniqueness in the database
  }

  console.log('Unique Student Code:', code);  // Log the generated code
  return code;  // Return the unique code
}

const signUpHandler = async (req, res) => {
  const { user_name, password, email, age, phone, confirm_password, gender } = req.body;

  if (password !== confirm_password) {
    return res.status(400).send('Passwords do not match.');
  }

  if (!gender) {
    return res.status(400).send('Gender is required.');
  }

  try {
    // Check if the email already exists in the database
    const checkUserSql = `SELECT * FROM users WHERE email = ?`;
    const [results] = await db.promise().query(checkUserSql, [email]); // Use promise-based queries for async/await

    // If the user already exists, return an error message
    if (results.length > 0) {
      return res.status(400).send('An account with this email already exists.');
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate a verification token
    const token = crypto.randomBytes(20).toString('hex');
    const expirationTime = new Date(Date.now() + 3600000); // 1 hour

    // Generate a unique student code
    const studentCode = await generateUniqueCode();

    // Proceed with registration, including the unique student code
    const insertUserSql = `INSERT INTO users (name, student_code, email, password, age, phone, gender, verification_token, token_expires_at) 
                           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    const values = [user_name, studentCode, email, hashedPassword, age, phone, gender, token, expirationTime];

    await db.promise().query(insertUserSql, values); // Use promise-based queries for async/await

    // Send verification email
    const transporter = nodemailer.createTransport({
      service: 'gmail', // Use Gmail service
      auth: {
        user: process.env.EMAIL_USER, // Environment variable for email
        pass: process.env.EMAIL_PASS, // Environment variable for email password
      },
    });

    const mailOptions = {
      to: email,
      from: process.env.EMAIL_USER,
      subject: 'Verify your email address',
      text: `Please click the following link to verify your email address: 
      http://${req.headers.host}/verify-email?token=${token}`,
    };

    transporter.sendMail(mailOptions, (err) => {
      if (err) {
        console.error('Error sending verification email:', err);
        return res.status(500).send('Server error, couldn’t send verification email.');
      }
      // Redirect to the login page or a page indicating that verification email has been sent
      res.redirect('/login_page');
    });
  } catch (error) {
    console.error('Unexpected error:', error);
    res.status(500).send('Server error');
  }
};

export default signUpHandler;
