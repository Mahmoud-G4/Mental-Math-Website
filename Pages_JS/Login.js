const db = require('./DataBase_conn'); // Import the database connection

// Function to handle login requests
const loginHandler = (req, res) => {
  const { email, password } = req.body;

  // Query to find the user with the provided email and password
  const sql = `SELECT * FROM users WHERE email = ? AND password = ?`;
  const values = [email, password];

  db.query(sql, values, (err, results) => {
    if (err) {
      console.error('Error querying MySQL:', err);
      return res.status(500).send('Server error');
    }

    if (results.length > 0) {

      // User found, redirect to a success page or dashboard
      res.redirect('/home_page'); 

    } else {

      // User not found, send an error response
      res.status(401).send('Invalid email or password');
    }
  });
};

module.exports = loginHandler;
