const bcrypt = require('bcrypt');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const db = require('./DataBase_conn'); // Import the database connection

const signUpHandler = async (req, res) => {
  const { user_name, password, email, age, phone, confirm_password, gender } = req.body;

  if (password !== confirm_password) {
    return res.status(400).send('Passwords do not match.');
  }

  if (!gender) {
    return res.status(400).send('Gender is required.');
  }

  try {
    // Check if the email or username already exists in the database
    const checkUserSql = `SELECT * FROM users WHERE email = ? OR name = ?`;
    db.query(checkUserSql, [email, user_name], async (err, results) => {
      if (err) {
        console.error('Error checking existing users:', err);
        return res.status(500).send('Server error');
      }

      // If the user already exists, return an error message
      if (results.length > 0) {
        return res.status(400).send('An account with this email or username already exists.');
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Generate a verification token
      const token = crypto.randomBytes(20).toString('hex');
      const expirationTime = new Date(Date.now() + 3600000); // 1 hour

      // Proceed with registration
      const insertUserSql = `INSERT INTO users (name, email, password, age, phone, gender, verification_token, token_expires_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
      const values = [user_name, email, hashedPassword, age, phone, gender, token, expirationTime];

      db.query(insertUserSql, values, (err, result) => {
        if (err) {
          console.error('Error inserting data into MySQL:', err);
          return res.status(500).send('Server error');
        }

        // Send verification email
        const transporter = nodemailer.createTransport({
          service: 'Outlook365', // Use Outlook service
          auth: {
            user: 'mental-math45@outlook.com',
            pass: 'mental-math-project45' // Consider using an app password if needed
          }
        });

        const mailOptions = {
          to: email,
          from: 'mental-math45@outlook.com',
          subject: 'Verify your email address',
          text: `Please click the following link to verify your email address: 
          http://${req.headers.host}/verify-email?token=${token}`
        };

        transporter.sendMail(mailOptions, (err) => {
          if (err) {
            console.error('Error sending verification email:', err);
            return res.status(500).send('Server error');
          }
          // Redirect to the login page or a page indicating that verification email has been sent
          res.redirect('/login_page');
        });
      });
    });
  } catch (error) {
    console.error('Unexpected error:', error);
    res.status(500).send('Server error');
  }
};

module.exports = signUpHandler;
