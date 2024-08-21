const db = require('./DataBase_conn'); // Import the database connection
const bcrypt = require('bcrypt');

// Function to handle login requests
const loginHandler = (req, res) => {
  const { email, password } = req.body;

  // Query to find the user with the provided email
  const sql = `SELECT * FROM users WHERE email = ?`;
  const values = [email];

  db.query(sql, values, (err, results) => {
    if (err) {
      console.error('Error querying MySQL:', err);
      return res.status(500).send('Server error');
    }

    if (results.length > 0) {
      const user = results[0];

      // Compare the provided password with the hashed password stored in the database
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) {
          console.error('Error comparing passwords:', err);
          return res.status(500).send('Server error');
        }

        if (isMatch) {
          // Passwords match, set session and redirect
          req.session.userID = user.id;
          req.session.username = user.name;
          res.redirect('/home_page'); // Adjust the redirect URL as needed
        } else {
          // Passwords do not match
          res.status(401).send('Invalid password');
        }
      });
    } else {
      // No user found with the given email
      res.status(401).send('Invalid email');
    }
  });
};

module.exports = loginHandler;
