const express = require('express');
const session = require('express-session')
const bodyParser = require('body-parser');
const path = require('path');                  // Require the path module
const signUpHandler = require('./Sign-up');   // Import the sign-up handler
const loginHandler = require('./Login');     // Import the log-in handler
const logoutHandler = require('./Logout');  // Import the logout handler

const app = express();

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Configure session middleware
app.use(session({
  secret: 'your_secret_key',  // Replace with a strong secret key
  resave: false,              // Do not save session if it was not modified
  saveUninitialized: true,    // Save uninitialized session (new session that hasn't been modified)
  cookie: { secure: false }   // Set to true if using HTTPS
}));

// Serve static files For HTML 
app.use(express.static(path.join(__dirname, '../Pages_HTML')));

// Serve static files from Pages_CSS
app.use(express.static(path.join(__dirname, '../Pages_CSS')));

// Serve Bootstrap CSS from node_modules
app.use('/bootstrap', express.static(path.join(__dirname, '../node_modules/bootstrap/dist')));


//
// This Sapce if or adding Services Or functionalty to the WebSite
//


// Set EJS as the templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


// Route to handle sign-up
app.post('/signup', signUpHandler);

// Route to handle Login
app.post('/login', loginHandler);

// Route to handle Logout
app.post('/logout', logoutHandler)

// Route to serve the login page
app.get('/admin_page', (req, res) => {
  res.render('Admin-Page');
});

app.get('/test_page', (req, res) => {
  res.render('Test_Page');
});

app.get('/test_choice_page', (req, res) => {
  res.render('Test-choice-page');
});

// Route to serve the login page
app.get('/login_page', (req, res) => {
  res.render('Login');
});

// Route to serve the home page
app.get('/home_page', (req, res) => {
  res.render('Home-Page');
});

// Default route to serve the home page
app.get('/', (req, res) => {
  res.render('Home-Page');
});


//
// End of the Space 
//

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
