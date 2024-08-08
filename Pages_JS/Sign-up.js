const db = require('./DataBase_conn'); // Import the database connection

const signUpHandler = (req, res) => {
  const { user_name, password, email, age, phone } = req.body;

  const sql = `INSERT INTO users (name, email, password, age, phone) VALUES (?, ?, ?, ?, ?)`;
  const values = [user_name, email, password, age, phone];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error inserting data into MySQL:', err);
      return res.status(500).send('Server error');
    }
    res.redirect('/login_page'); // Redirect to a route handled by the server
  });
};

module.exports = signUpHandler;
