const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const db = require('./DataBase_conn'); // Import your database connection

// Define the Local Strategy
passport.use(new LocalStrategy(
  {
    usernameField: 'email', // Field name for the email in your login form
    passwordField: 'password' // Field name for the password in your login form
  },
  (email, password, done) => {
    // Query to find the user with the provided email
    const sql = `SELECT * FROM users WHERE email = ? AND password = ?`;
    const values = [email, password];

    db.query(sql, values, (err, results) => {
      if (err) {
        return done(err);
      }
      if (results.length > 0) {
        // User found
        return done(null, results[0]);
      } else {
        // User not found
        return done(null, false, { message: 'Invalid email or password' });
      }
    });
  }
));

// Serialize user to store in session
passport.serializeUser((user, done) => {
  done(null, user.ID); // Use ID here
});

passport.deserializeUser((ID, done) => {
  const sql = `SELECT * FROM users WHERE ID = ?`; // Match the column name
  db.query(sql, [ID], (err, results) => {
    if (err) {
      return done(err);
    }
    if (results.length > 0) {
      done(null, results[0]);
    } else {
      done(null, false);
    }
  });
});

