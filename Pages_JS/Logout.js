const logoutHandler = (req, res) => {
  req.logout((err) => {
    if (err) {
      console.error('Logout error:', err);
      return res.status(500).send('An error occurred during logout');
    }
    req.flash('success', 'Successfully logged out'); // Optional flash message
    res.redirect('/'); // Redirect to home page
  });
};

module.exports = logoutHandler;
