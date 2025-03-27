// In-memory storage for bookings
const bookings = [
  {
    id: 1,
    propertyId: 1,
    userId: 12,
    checkIn: '2023-11-10',
    checkOut: '2023-11-15',
    guests: 2,
    totalPrice: 4250,
    status: 'confirmed',
    createdAt: '2023-10-01T09:30:00Z'
  },
  {
    id: 2,
    propertyId: 3,
    userId: 12,
    checkIn: '2023-12-05',
    checkOut: '2023-12-10',
    guests: 4,
    totalPrice: 1600,
    status: 'confirmed',
    createdAt: '2023-10-15T14:45:00Z'
  }
];

module.exports = bookings;
