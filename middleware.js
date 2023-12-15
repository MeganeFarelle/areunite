// middleware.js

module.exports = {
    isAuthenticated: (req, res, next) => {
        if (req.session.user) {
            return next();
        }
        res.redirect('/auth/login');
    },
    isManager: (req, res, next) => {
      // Check if the user is authenticated and is a manager
      if (req.isAuthenticated() && req.user.isManager) {
        return next();
      }
      // If not an admin, redirect to a different page or show an error message
      res.redirect('/unauthorized');
    }
  };