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

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect('/profile_page');  // Redirect to profile page if authenticated
  }
  next();
}

// Serve static files
app.use(express.static(path.join(__dirname, '../Pages_HTML')));
app.use(express.static(path.join(__dirname, '../Pages_CSS')));
app.use('/bootstrap', express.static(path.join(__dirname, '../node_modules/bootstrap/dist')));

// Set EJS as the templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Routes
app.post('/signup', signUpHandler);
app.post('/login', loginHandler);
app.post('/logout', logoutHandler);

app.get('/', (req, res) => {
  res.render('Home-Page');
});

app.get('/admin_page', (req, res) => {
  res.render('Admin-Page');
});

app.get('/test_page', (req, res) => {
  res.render('Test_Page');
});

app.get('/test_choice_page', (req, res) => {
  res.render('Test-choice-page');
});

app.get('/profile_page', checkAuthenticated, (req, res) => {
  res.render('Profile-Page');
});

app.get('/signup_page', checkNotAuthenticated, (req, res) => {
  res.render('SignUp');
});

app.get('/login_page', (req, res) => {
  res.render('Login');
});

app.get('/home_page', (req, res) => {
  res.render('Home-Page');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
