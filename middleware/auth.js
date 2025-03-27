// Middleware to check if user is logged in
const isLoggedIn = (req, res, next) => {
  if (!req.session.user) {
    req.flash('error', 'You must be logged in to view this page');
    return res.redirect('/auth/login');
  }
  next();
};

// Middleware to check if user is logged out
const isLoggedOut = (req, res, next) => {
  if (req.session.user) {
    return res.redirect('/dashboard');
  }
  next();
};

// Middleware to check if user is a host
const isHost = (req, res, next) => {
  if (!req.session.user || !req.session.user.isHost) {
    req.flash('error', 'You must be a host to access this page');
    return res.redirect('/dashboard');
  }
  next();
};

module.exports = {
  isLoggedIn,
  isLoggedOut,
  isHost
};
