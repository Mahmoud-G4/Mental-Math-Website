const logoutHandler = (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        console.error('Error during logout:', err);
        return res.status(500).send('Logout failed.');
      }
      // Redirect to the login page after logging out
      res.redirect('/login_page');
    });
  };
  
  module.exports = logoutHandler;
  