import express from 'express';
import passport from 'passport';

const router = express.Router();

// POST /login route
router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      console.error('Error during authentication:', err);
      return res.status(500).send('Server error');
    }

    if (!user) {
      // Authentication failed, user is not found
      return res.status(401).send(info?.message || 'Invalid email or password');
    }

    // Check if the user's email is verified
    if (!user.email_verified) {
      return res.status(403).send('Please verify your email before logging in.');
    }

    // Log the user in
    req.logIn(user, (err) => {
      if (err) {
        console.error('Error during login:', err);
        return res.status(500).send('Server error');
      }

      // Redirect based on user role
      if (user.role === 'admin' || user.role === 'super_admin') {
        return res.redirect('/Adminstrator-DashBoard');
      } else {
        return res.redirect('/home_page');
      }
    });
  })(req, res, next);
});

export default router;
