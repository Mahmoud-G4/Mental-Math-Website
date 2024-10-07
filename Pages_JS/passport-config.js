import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import db from './DataBase_conn.js'; // Import your database connection
import bcrypt from 'bcryptjs';

// Define the Local Strategy
passport.use(new LocalStrategy(
  {
    usernameField: 'email', // Field name for the email in your login form
    passwordField: 'password', // Field name for the password in your login form
  },
  (email, password, done) => {
    // Query to find the user with the provided email
    const sql = `SELECT * FROM users WHERE email = ?`;
    const values = [email];

    db.query(sql, values, (err, results) => {
      if (err) {
        return done(err);
      }
      if (results.length > 0) {
        const user = results[0];

        // Check if the user's email is verified
        if (!user.email_verified) {
          return done(null, false, { message: 'Please verify your email before logging in.' });
        }

        // Compare the hashed password with the entered password
        bcrypt.compare(password, user.password, (err, isMatch) => {
          if (err) {
            return done(err);
          }
          if (isMatch) {
            // Password matches, user authenticated
            return done(null, user);
          } else {
            // Password does not match
            return done(null, false, { message: 'Invalid email or password' });
          }
        });
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

// Deserialize user to retrieve from session
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

export default passport;
