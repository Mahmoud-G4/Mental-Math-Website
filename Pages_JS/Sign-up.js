const bcrypt = require('bcrypt');
const db = require('./DataBase_conn'); // Import the database connection

const signUpHandler = async (req, res) => {
  const { user_name, password, email, age, phone, confirm_password } = req.body;

  if (password !== confirm_password) {
    return res.status(400).send('Passwords do not match.');
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

      // Proceed with registration
      const insertUserSql = `INSERT INTO users (name, email, password, age, phone) VALUES (?, ?, ?, ?, ?)`;
      const values = [user_name, email, hashedPassword, age, phone];

      db.query(insertUserSql, values, (err, result) => {
        if (err) {
          console.error('Error inserting data into MySQL:', err);
          return res.status(500).send('Server error');
        }
        // Redirect to the login page
        res.redirect('/login_page');
      });
    });
  } catch (error) {
    console.error('Unexpected error:', error);
    res.status(500).send('Server error');
  }
};

module.exports = signUpHandler;
