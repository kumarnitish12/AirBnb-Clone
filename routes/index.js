const express = require('express');
const router = express.Router();
const properties = require('../data/properties');
const { isLoggedIn } = require('../middleware/auth');

// Home page route - show featured properties
router.get('/', (req, res) => {
  // Get 8 featured properties for homepage
  const featuredProperties = properties.slice(0, 8);
  res.render('index', { 
    properties: featuredProperties,
    title: 'Welcome to AirBnB Clone' 
  });
});

// Search route
router.get('/search', (req, res) => {
  const { location, checkIn, checkOut, guests, type, minPrice, maxPrice } = req.query;
  
  // Apply filters
  let filteredProperties = [...properties];
  
  if (location) {
    filteredProperties = filteredProperties.filter(p => 
      p.location.toLowerCase().includes(location.toLowerCase())
    );
  }
  
  if (type && type !== 'all') {
    filteredProperties = filteredProperties.filter(p => p.type === type);
  }
  
  if (minPrice) {
    filteredProperties = filteredProperties.filter(p => p.pricePerNight >= parseInt(minPrice));
  }
  
  if (maxPrice) {
    filteredProperties = filteredProperties.filter(p => p.pricePerNight <= parseInt(maxPrice));
  }
  
  if (guests) {
    filteredProperties = filteredProperties.filter(p => p.maxGuests >= parseInt(guests));
  }
  
  res.render('properties/index', {
    properties: filteredProperties,
    title: 'Search Results',
    searchParams: req.query
  });
});

// User dashboard
router.get('/dashboard', isLoggedIn, (req, res) => {
  const userProperties = properties.filter(p => p.hostId === req.session.user.id);
  
  // For now we'll get bookings from the user's session
  const userBookings = req.session.user.bookings || [];
  
  res.render('user/dashboard', {
    properties: userProperties,
    bookings: userBookings,
    title: 'Your Dashboard'
  });
});

// Error page
router.get('/error', (req, res) => {
  res.render('error', {
    message: 'An error occurred',
    error: { status: 'Error' }
  });
});

module.exports = router;
