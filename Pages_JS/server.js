const express = require('express');
const bodyParser = require('body-parser');
const path = require('path'); // Require the path module
const signUpHandler = require('./Sign-up'); // Import the sign-up handler
const loginHandler = require('./Login');

const app = express();

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Serve static files For HTML 
app.use(express.static('Pages_HTML'));

// Serve static files from Pages_CSS
app.use('/Pages_CSS', express.static(path.join(__dirname, '../Pages_CSS')));

//
// This Sapce if or adding Services Or functionalty to the WebSite
//

// Route to handle sign-up
app.post('/signup', signUpHandler);

// Route to handle Login
app.post('/login', loginHandler);

// Route to serve the login page
app.get('/login_page', (req, res) => {
    res.sendFile(path.join(__dirname, '../Pages_HTML/Login.html'));
  });

// Route to serve the login page
app.get('/home_page', (req, res) => {
    res.sendFile(path.join(__dirname, '../Pages_HTML/Home-Page.html'));
  });

// Default route
app.get('/', (req, res) => {
   res.sendFile(path.join(__dirname,'../Pages_HTML/index.html'));
});

//
// End of the Space 
//

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
