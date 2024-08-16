const ensureAuthenticated = (req, res, next) => {
    if (req.session.userID) {
      // User is authenticated, allow access to the route
      return next();
    }
    // User is not authenticated, redirect to the login page
    res.redirect('/login_page');
  };
  
  // Use the middleware to protect a route
  app.get('/home_page', ensureAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, '../Pages_HTML/Home-Page.html'));
  });
  