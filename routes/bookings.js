const express = require('express');
const router = express.Router();
const properties = require('../data/properties');
const bookings = require('../data/bookings');
const { isLoggedIn } = require('../middleware/auth');

// New booking form
router.get('/new/:propertyId', isLoggedIn, (req, res) => {
  const property = properties.find(p => p.id === parseInt(req.params.propertyId));
  
  if (!property) {
    req.flash('error', 'Property not found');
    return res.redirect('/properties');
  }
  
  res.render('bookings/new', { 
    property, 
    title: `Book ${property.title}`
  });
});

// Create booking
router.post('/', isLoggedIn, (req, res) => {
  const { propertyId, checkIn, checkOut, guests, totalPrice } = req.body;
  
  // Validate form data
  if (!propertyId || !checkIn || !checkOut || !guests) {
    req.flash('error', 'All fields are required');
    return res.redirect(`/bookings/new/${propertyId}`);
  }
  
  const property = properties.find(p => p.id === parseInt(propertyId));
  
  if (!property) {
    req.flash('error', 'Property not found');
    return res.redirect('/properties');
  }
  
  // Create new booking
  const newBooking = {
    id: bookings.length + 1,
    propertyId: parseInt(propertyId),
    userId: req.session.user.id,
    checkIn,
    checkOut,
    guests: parseInt(guests),
    totalPrice: parseFloat(totalPrice),
    status: 'confirmed',
    createdAt: new Date().toISOString()
  };
  
  // Add to bookings collection
  bookings.push(newBooking);
  
  // Add to user's bookings (in session) for dashboard display
  if (!req.session.user.bookings) {
    req.session.user.bookings = [];
  }
  req.session.user.bookings.push({
    ...newBooking,
    property: {
      id: property.id,
      title: property.title,
      location: property.location,
      image: property.images[0]
    }
  });
  
  req.flash('success', 'Booking confirmed successfully');
  res.redirect('/dashboard');
});

// Cancel booking
router.delete('/:id', isLoggedIn, (req, res) => {
  const bookingId = parseInt(req.params.id);
  const bookingIndex = bookings.findIndex(b => b.id === bookingId && b.userId === req.session.user.id);
  
  if (bookingIndex === -1) {
    req.flash('error', 'Booking not found');
    return res.redirect('/dashboard');
  }
  
  // Remove from bookings collection
  bookings.splice(bookingIndex, 1);
  
  // Remove from user's bookings in session
  if (req.session.user.bookings) {
    const sessionBookingIndex = req.session.user.bookings.findIndex(b => b.id === bookingId);
    if (sessionBookingIndex !== -1) {
      req.session.user.bookings.splice(sessionBookingIndex, 1);
    }
  }
  
  req.flash('success', 'Booking cancelled successfully');
  res.redirect('/dashboard');
});

module.exports = router;
