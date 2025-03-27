const bcrypt = require('bcryptjs');

// In-memory storage for users
const users = [
  {
    id: 1,
    name: 'John Smith',
    email: 'john@example.com',
    password: bcrypt.hashSync('password123', 10),
    isHost: true,
    bookings: [],
    createdAt: '2023-01-01T00:00:00Z'
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    password: bcrypt.hashSync('password123', 10),
    isHost: true,
    bookings: [],
    createdAt: '2023-01-05T00:00:00Z'
  },
  {
    id: 3,
    name: 'David Wilson',
    email: 'david@example.com',
    password: bcrypt.hashSync('password123', 10),
    isHost: true,
    bookings: [],
    createdAt: '2023-01-10T00:00:00Z'
  },
  {
    id: 4,
    name: 'Lisa Brown',
    email: 'lisa@example.com',
    password: bcrypt.hashSync('password123', 10),
    isHost: true,
    bookings: [],
    createdAt: '2023-01-15T00:00:00Z'
  },
  {
    id: 5,
    name: 'Michael Davis',
    email: 'michael@example.com',
    password: bcrypt.hashSync('password123', 10),
    isHost: true,
    bookings: [],
    createdAt: '2023-01-20T00:00:00Z'
  },
  {
    id: 6,
    name: 'Jennifer Miller',
    email: 'jennifer@example.com',
    password: bcrypt.hashSync('password123', 10),
    isHost: true,
    bookings: [],
    createdAt: '2023-01-25T00:00:00Z'
  },
  {
    id: 7,
    name: 'Robert Anderson',
    email: 'robert@example.com',
    password: bcrypt.hashSync('password123', 10),
    isHost: true,
    bookings: [],
    createdAt: '2023-01-30T00:00:00Z'
  },
  {
    id: 8,
    name: 'Amanda Martinez',
    email: 'amanda@example.com',
    password: bcrypt.hashSync('password123', 10),
    isHost: true,
    bookings: [],
    createdAt: '2023-02-05T00:00:00Z'
  },
  {
    id: 9,
    name: 'James Taylor',
    email: 'james@example.com',
    password: bcrypt.hashSync('password123', 10),
    isHost: true,
    bookings: [],
    createdAt: '2023-02-10T00:00:00Z'
  },
  {
    id: 10,
    name: 'Jessica Clark',
    email: 'jessica@example.com',
    password: bcrypt.hashSync('password123', 10),
    isHost: true,
    bookings: [],
    createdAt: '2023-02-15T00:00:00Z'
  },
  {
    id: 11,
    name: 'Thomas White',
    email: 'thomas@example.com',
    password: bcrypt.hashSync('password123', 10),
    isHost: true,
    bookings: [],
    createdAt: '2023-02-20T00:00:00Z'
  },
  {
    id: 12,
    name: 'Guest User',
    email: 'guest@example.com',
    password: bcrypt.hashSync('password123', 10),
    isHost: false,
    bookings: [],
    createdAt: '2023-03-01T00:00:00Z'
  }
];

module.exports = users;
