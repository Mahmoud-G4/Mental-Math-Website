const db = require('./DataBase_conn'); // Import the database connection

const signUpHandler = (req, res) => {
  const { user_name, password, email, age, phone } = req.body;

  // First, check if the email or username already exists in the database
  const checkUserSql = `SELECT * FROM users WHERE email = ? OR name = ?`;
  db.query(checkUserSql, [email, user_name], (err, results) => {
    if (err) {
      console.error('Error checking existing users:', err);
      return res.status(500).send('Server error');
    }

    // If the user already exists, return an error message
    if (results.length > 0) {
      return res.status(400).send('An account with this email or username already exists.');
    }

    // If the user does not exist, proceed with registration
    const insertUserSql = `INSERT INTO users (name, email, password, age, phone) VALUES (?, ?, ?, ?, ?)`;
    const values = [user_name, email, password, age, phone_number];

    db.query(insertUserSql, values, (err, result) => {
      if (err) {
        console.error('Error inserting data into MySQL:', err);
        return res.status(500).send('Server error');
      }
      res.send('Registration successful! Please log in.');
      res.redirect('/Login.html');
    });
  });
};

module.exports = signUpHandler;
