const passport = require('passport');

module.exports = (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) return next(err);
    if (!user) return res.redirect('/login_page'); // Redirect to login page if authentication fails

    req.logIn(user, (err) => {
      if (err) return next(err);
      return res.redirect('/profile_page'); // Redirect to profile page on success
    });
  })(req, res, next);
};
