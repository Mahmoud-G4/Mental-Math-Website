const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const flash = require('connect-flash');
const signUpHandler = require('./Sign-up');
const loginHandler = require('./loginHandler');
const logoutHandler = require('./Logout');
const passport = require('passport');
require('./passport-config'); // Ensure Passport configuration is required
const connection = require('./DataBase_conn'); // Use the correct import for the connection
const bcrypt = require('bcrypt');

const app = express();

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Configure session middleware
app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

app.use(passport.initialize());
app.use(passport.session());

// Add connect-flash middleware
app.use(flash());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({
  secret: 'your-session-secret',
  resave: false,
  saveUninitialized: true
}));

app.get('/promote_to_admin/:id', (req, res) => {
  const userId = req.params.id; // Get user ID from the URL
  const query = 'UPDATE users SET role = ? WHERE ID = ?'; // SQL query to change the role
  const newRole = 'admin'; // New role

  connection.query(query, [newRole, userId], (err, result) => {
      if (err) {
          console.error('Error promoting user:', err);
          return res.status(500).send('Error promoting user');
      }
      res.redirect('/super_admin_page'); // Redirect back to the super admin page
  });
});

app.get('/demote_to_user/:id', (req, res) => {
  const userId = req.params.id; // Get user ID from the URL
  const query = 'UPDATE users SET role = ? WHERE ID = ?'; // SQL query to change the role
  const newRole = 'user'; // Demote to 'user'

  connection.query(query, [newRole, userId], (err, result) => {
      if (err) {
          console.error('Error demoting user:', err);
          return res.status(500).send('Error demoting user');
      }
      res.redirect('/super_admin_page'); // Redirect back to the super admin page
  });
});



// Add middleware to make flash messages available to all views
app.use((req, res, next) => {
  res.locals.messages = req.flash();
  res.locals.user = req.user || null; // This will make 'user' available in all templates
  next();
});

// Define middleware functions
function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login_page');  // Redirect to login page if not authenticated
}
// Middleware to check if user is super admin
function isSuperAdmin(req, res, next) {
  if (req.isAuthenticated() && req.user.role === 'super_admin') {
      return next();
  } else {
      res.redirect('/login_page'); // Or show an error message
  }
}

// Middleware to check if user is admin
function isAdmin(req, res, next) {
  if (req.isAuthenticated() && (req.user.role === 'admin' || req.user.role === 'super_admin')) {
      return next();
  } else {
      res.redirect('/login_page');
  }
}

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect('/profile_page');  // Redirect to profile page if authenticated
  }
  next();
}

// Serve static files
app.use(express.static(path.join(__dirname, '../Pages_HTML')));
// Serve static files from the images directory
app.use('/images', express.static(path.join(__dirname, '../images')));
app.use(express.static(path.join(__dirname, '../Pages_CSS')));
app.use(express.static(path.join(__dirname, '../Pages_JS')));
app.use(express.static(path.join(__dirname, '../dist')));
app.use('/bootstrap', express.static(path.join(__dirname, '../node_modules/bootstrap/dist')));

// Set EJS as the templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Routes
app.post('/signup', signUpHandler);
app.post('/login', loginHandler);
app.post('/logout', logoutHandler);

// Route to promote a user to admin
app.get('/promote_to_admin/:id', isSuperAdmin, (req, res) => {
  const userId = req.params.id;
  connection.query('UPDATE users SET role = ? WHERE id = ?', ['admin', userId], (err, results) => {
      if (err) throw err;
      res.redirect('/super_admin_page');
  });
});

// Route to demote an admin to a regular user
app.get('/demote_to_user/:id', isSuperAdmin, (req, res) => {
  const userId = req.params.id;
  connection.query('UPDATE users SET role = ? WHERE id = ?', ['user', userId], (err, results) => {
      if (err) throw err;
      res.redirect('/super_admin_page');
  });
});


app.get('/super_admin_page', isSuperAdmin, (req, res) => {
  connection.query('SELECT * FROM users', (err, users) => {
      if (err) throw err;
      res.render('super_admin_page', { users });
  });
});


app.post('/profile_page', checkAuthenticated, async (req, res) => {
  const userId = req.user.ID; // Get the logged-in user's ID

  const { name, mobile, email, password, password2 } = req.body;

  // Check if the user wants to update their password
  let sql;
  let values;

  if (password && password2) {
    if (password !== password2) {
      req.flash('error', 'Passwords do not match');
      return res.redirect('/profile_page');
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update all fields including the password
    sql = `UPDATE users SET name = ?, phone = ?, email = ?, password = ? WHERE ID = ?`;
    values = [name, mobile, email, hashedPassword, userId];
  } else {
    // Update without changing the password
    sql = `UPDATE users SET name = ?, phone = ?, email = ? WHERE ID = ?`;
    values = [name, mobile, email, userId];
  }

  connection.query(sql, values, (err) => {
    if (err) {
      console.error(err);
      req.flash('error', 'An error occurred while updating your profile');
      return res.redirect('/profile_page');
    }

    req.flash('success', 'Profile updated successfully');
    res.redirect('/profile_page');
  });
});

app.use(express.static('public'));

//
// Processing the Routes for the Different Files
//

app.get('/', (req, res) => {
  res.render('Home-Page');
});

app.get('/admin_page', (req, res) => {
  res.render('Admin-Page');
});

app.get('/Test-Page', (req, res) => {
  res.render('Test-Page');
});

app.get('/Test-Choice-Page', (req, res) => {
  res.render('Test-Choice-Page');
});

app.get('/Competition-page', (req, res) => {
  res.render('Competition-page');
});
app.get('/signup_page', checkNotAuthenticated, (req, res) => {
  res.render('SignUp');
});

app.get('/login_page', (req, res) => {
  res.render('Login');
});

app.get('/contact_page', (req, res) => {
  res.render('contact');
});

app.get('/forgot_password', (req, res) => {
  res.render('reset');
});

app.get('/home_page', (req, res) => {
  res.render('Home-Page');
});

app.get('/Generated-Tests',(req,res)=> {
  res.render('Generated-Tests');
})

app.get('/Pre-Made-Tests-lvl',(req,res)=>{
  res.render('Pre-Made-Tests-lvl')
})

app.get('/Pre-Made-Tests-type',(req,res)=>{
  res.render('Pre-Made-Tests-type')
})

app.get('/Competition-Entry-Page', (req, res) => {
  res.render('Competition-Entry-Page');
});


//
// End of the Routes
//

app.get('/verify-email', (req, res) => {
  const token = req.query.token;

  const query = 'SELECT * FROM users WHERE verification_token = ? AND token_expires_at > ?';
  connection.query(query, [token, new Date()], (err, results) => {
      if (err) {
          console.error('Error querying database:', err);
          return res.status(500).send('Server error');
      }

      if (results.length > 0) {
          const updateQuery = 'UPDATE users SET email_verified = 1, verification_token = NULL, token_expires_at = NULL WHERE verification_token = ?';
          connection.query(updateQuery, [token], (err) => {
              if (err) {
                  console.error('Error updating database:', err);
                  return res.status(500).send('Server error');
              }
              res.send('Email verified successfully!');
          });
      } else {
          res.send('Invalid or expired token.');
      }
  });
});

app.get('/login_page', (req, res) => {
  // Fetch any potential error messages from the query parameters or session
  const verificationError = req.query.verificationError || null;

  res.render('Login', { verificationError });
});

app.get('/profile_page', checkAuthenticated, (req, res) => {
  const userId = req.user.ID; // Get the logged-in user's ID

  const sql = `SELECT * FROM users WHERE ID = ?`;
  connection.query(sql, [userId], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Server error');
    }

    if (results.length > 0) {
      const user = results[0];
      res.render('Profile-Page', { user }); // Pass user data to the template
    } else {
      res.status(404).send('User not found');
    }
  });
});



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
