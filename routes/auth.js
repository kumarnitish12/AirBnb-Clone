const express = require('express');
const router = express.Router();
const users = require('../data/users');
const bcrypt = require('bcryptjs');
const { isLoggedIn, isLoggedOut } = require('../middleware/auth');

// Show login form
router.get('/login', isLoggedOut, (req, res) => {
  res.render('login', { title: 'Login' });
});

// Process login
router.post('/login', isLoggedOut, (req, res) => {
  const { email, password } = req.body;
  
  // Validate form data
  if (!email || !password) {
    req.flash('error', 'All fields are required');
    return res.redirect('/auth/login');
  }
  
  // Find user by email
  const user = users.find(u => u.email === email);
  
  // Check if user exists and password is correct
  if (!user || !bcrypt.compareSync(password, user.password)) {
    req.flash('error', 'Invalid email or password');
    return res.redirect('/auth/login');
  }
  
  // Set user session (excluding password)
  const { password: pwd, ...userInfo } = user;
  req.session.user = userInfo;
  
  req.flash('success', 'Successfully logged in');
  res.redirect('/dashboard');
});

// Show register form
router.get('/register', isLoggedOut, (req, res) => {
  res.render('register', { title: 'Register' });
});

// Process registration
router.post('/register', isLoggedOut, (req, res) => {
  const { name, email, password, confirmPassword } = req.body;
  
  // Validate form data
  if (!name || !email || !password || !confirmPassword) {
    req.flash('error', 'All fields are required');
    return res.redirect('/auth/register');
  }
  
  if (password !== confirmPassword) {
    req.flash('error', 'Passwords do not match');
    return res.redirect('/auth/register');
  }
  
  // Check if email already exists
  const existingUser = users.find(u => u.email === email);
  if (existingUser) {
    req.flash('error', 'Email already registered');
    return res.redirect('/auth/register');
  }
  
  // Create new user
  const newUser = {
    id: users.length + 1,
    name,
    email,
    password: bcrypt.hashSync(password, 10),
    isHost: false,
    bookings: [],
    createdAt: new Date().toISOString()
  };
  
  // Add to users collection
  users.push(newUser);
  
  // Set user session (excluding password)
  const { password: pwd, ...userInfo } = newUser;
  req.session.user = userInfo;
  
  req.flash('success', 'Successfully registered');
  res.redirect('/dashboard');
});

// Logout
router.get('/logout', isLoggedIn, (req, res) => {
  req.session.destroy();
  res.redirect('/');
});

module.exports = router;
