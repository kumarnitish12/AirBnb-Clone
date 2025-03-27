// In-memory storage for reviews
const reviews = [
  {
    id: 1,
    propertyId: 1,
    userId: 12,
    rating: 5,
    comment: 'Amazing place with stunning views! The house was clean, spacious, and had everything we needed. The host was very responsive and helpful. Would definitely stay again!',
    username: 'Guest User',
    createdAt: '2023-07-15T10:30:00Z'
  },
  {
    id: 2,
    propertyId: 1,
    userId: 2,
    rating: 4,
    comment: 'Beautiful property with great beach access. Kitchen was well-equipped and the bedrooms were comfortable. Only downside was some noise from nearby construction during our stay.',
    username: 'Sarah Johnson',
    createdAt: '2023-08-02T15:45:00Z'
  },
  {
    id: 3,
    propertyId: 2,
    userId: 3,
    rating: 5,
    comment: 'Perfect city apartment! The location was ideal for exploring downtown. The apartment was modern, clean, and the views were incredible. Would highly recommend.',
    username: 'David Wilson',
    createdAt: '2023-06-20T11:15:00Z'
  },
  {
    id: 4,
    propertyId: 3,
    userId: 4,
    rating: 5,
    comment: 'This cabin was the perfect mountain getaway. Cozy, clean, and with amazing views. The hot tub was a great way to relax after hiking. We will definitely be back!',
    username: 'Lisa Brown',
    createdAt: '2023-09-05T09:00:00Z'
  },
  {
    id: 5,
    propertyId: 4,
    userId: 5,
    rating: 4,
    comment: 'Great family vacation home with plenty of space for everyone. The kids loved the game room and pool. Kitchen was well-stocked for cooking meals. Would stay again!',
    username: 'Michael Davis',
    createdAt: '2023-07-30T16:20:00Z'
  }
];

module.exports = reviews;
