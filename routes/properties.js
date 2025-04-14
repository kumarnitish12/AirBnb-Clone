const express = require('express');
const router = express.Router();
const properties = require('../data/properties');
const reviews = require('../data/reviews');
const { isLoggedIn, isHost } = require('../middleware/auth');

// All properties route
router.get('/', (req, res) => {
  res.render('properties/index', { 
    properties,
    title: 'All Properties',
    searchParams: {}
  });
});

// New property form
router.get('/new', isLoggedIn, isHost, (req, res) => {
  res.render('properties/new', { title: 'Add New Property' });
});

// Create property
router.post('/', isLoggedIn, isHost, (req, res) => {
  const { 
    title, description, location, price, type, 
    bedrooms, bathrooms, maxGuests, amenities 
  } = req.body;
  
  // Validate form data
  if (!title || !description || !location || !price || !type) {
    req.flash('error', 'Please fill all required fields');
    return res.redirect('/properties/new');
  }
  
  // Create new property
  const newProperty = {
    id: properties.length + 1,
    title,
    description,
    location,
    pricePerNight: parseFloat(price),
    type,
    bedrooms: parseInt(bedrooms),
    bathrooms: parseInt(bathrooms),
    maxGuests: parseInt(maxGuests),
    amenities: amenities ? amenities.split(',').map(a => a.trim()) : [],
    images: getDefaultImagesForType(type),
    hostId: req.session.user.id,
    createdAt: new Date().toISOString(),
    rating: 0,
    reviewCount: 0
  };
  
  // Add to properties collection
  properties.push(newProperty);
  
  req.flash('success', 'Property added successfully');
  res.redirect(`/properties/${newProperty.id}`);
});

// Show property details
router.get('/:id', (req, res) => {
  const property = properties.find(p => p.id === parseInt(req.params.id));
  
  if (!property) {
    req.flash('error', 'Property not found');
    return res.redirect('/properties');
  }
  
  // Get reviews for this property
  const propertyReviews = reviews.filter(r => r.propertyId === property.id);
  
  // Generate share URL
  const shareUrl = `${req.protocol}://${req.get('host')}/properties/${property.id}`;
  
  res.render('properties/show', { 
    property,
    reviews: propertyReviews,
    shareUrl,
    title: property.title
  });
});

// Share property
router.get('/:id/share', (req, res) => {
  const property = properties.find(p => p.id === parseInt(req.params.id));
  
  if (!property) {
    req.flash('error', 'Property not found');
    return res.redirect('/properties');
  }

  const shareUrl = `${req.protocol}://${req.get('host')}/properties/${property.id}`;
  
  res.render('properties/share', {
    property,
    shareUrl,
    title: `Share ${property.title}`
  });
});

// Helper function to get default images based on property type
function getDefaultImagesForType(type) {
  // Use the stock photos provided based on property type
  switch(type.toLowerCase()) {
    case 'vacation home':
      return [
        'https://images.unsplash.com/photo-1611480455840-d2e7f5af8f27',
        'https://images.unsplash.com/photo-1618168140399-bed9cc74ab72',
        'https://images.unsplash.com/photo-1617905877040-6c61b7d77e06'
      ];
    case 'luxury apartment':
      return [
        'https://images.unsplash.com/photo-1512916194211-3f2b7f5f7de3',
        'https://images.unsplash.com/photo-1580041065738-e72023775cdc',
        'https://images.unsplash.com/photo-1561321698-40ae82a47b9e'
      ];
    case 'cabin':
      return [
        'https://images.unsplash.com/photo-1685122121710-c1bdbd9ae8ce',
        'https://images.unsplash.com/photo-1685122121733-cb41a27e669b',
        'https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8'
      ];
    case 'beach house':
      return [
        'https://images.unsplash.com/photo-1544143086-828f66ac3945',
        'https://images.unsplash.com/photo-1511840636560-acee95b3a83f',
        'https://images.unsplash.com/photo-1474874055390-459bc92357f3'
      ];
    default:
      return [
        'https://images.unsplash.com/photo-1618168140399-bed9cc74ab72'
      ];
  }
}

module.exports = router;
