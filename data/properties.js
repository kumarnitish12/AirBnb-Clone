// In-memory storage for properties
const properties = [
  {
    id: 1,
    title: 'Luxury Beachfront Villa',
    description: 'Experience the ultimate luxury vacation in this stunning beachfront villa with panoramic ocean views. This spacious property features 4 bedrooms, a private pool, and direct beach access.',
    location: 'Malibu, California',
    pricePerNight: 850,
    type: 'beach house',
    bedrooms: 4,
    bathrooms: 3,
    maxGuests: 8,
    amenities: ['Pool', 'Beach Access', 'WiFi', 'Kitchen', 'Air Conditioning', 'Parking'],
    images: [
      'https://images.unsplash.com/photo-1544143086-828f66ac3945',
      'https://images.unsplash.com/photo-1511840636560-acee95b3a83f',
      'https://images.unsplash.com/photo-1474874055390-459bc92357f3'
    ],
    hostId: 1,
    createdAt: '2023-01-15T10:30:00Z',
    rating: 4.9,
    reviewCount: 28,
    featured: true
  },
  {
    id: 2,
    title: 'Modern Luxury Apartment in Downtown',
    description: 'Stay in this stylish luxury apartment in the heart of downtown. Features floor-to-ceiling windows with amazing city views, high-end finishes, and all the amenities you need for a comfortable stay.',
    location: 'New York, New York',
    pricePerNight: 475,
    type: 'luxury apartment',
    bedrooms: 2,
    bathrooms: 2,
    maxGuests: 4,
    amenities: ['Gym', 'WiFi', 'Kitchen', 'Air Conditioning', 'Doorman', 'Elevator'],
    images: [
      'https://images.unsplash.com/photo-1512916194211-3f2b7f5f7de3',
      'https://images.unsplash.com/photo-1580041065738-e72023775cdc',
      'https://images.unsplash.com/photo-1561321698-40ae82a47b9e'
    ],
    hostId: 2,
    createdAt: '2023-02-10T14:45:00Z',
    rating: 4.8,
    reviewCount: 19,
    featured: true
  },
  {
    id: 3,
    title: 'Cozy Mountain Cabin Retreat',
    description: 'Escape to this charming cabin nestled in the mountains. Featuring rustic decor, a wood-burning fireplace, and a hot tub on the deck with breathtaking mountain views.',
    location: 'Aspen, Colorado',
    pricePerNight: 320,
    type: 'cabin',
    bedrooms: 3,
    bathrooms: 2,
    maxGuests: 6,
    amenities: ['Hot Tub', 'Fireplace', 'WiFi', 'Kitchen', 'Mountain View', 'Hiking Trails'],
    images: [
      'https://images.unsplash.com/photo-1685122121710-c1bdbd9ae8ce',
      'https://images.unsplash.com/photo-1685122121733-cb41a27e669b',
      'https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8'
    ],
    hostId: 3,
    createdAt: '2023-03-05T09:15:00Z',
    rating: 4.7,
    reviewCount: 14,
    featured: true
  },
  {
    id: 4,
    title: 'Spacious Family Vacation Home',
    description: 'Perfect for family gatherings, this large vacation home offers plenty of space for everyone. Features include a gourmet kitchen, game room, and large backyard with BBQ area.',
    location: 'Orlando, Florida',
    pricePerNight: 390,
    type: 'vacation home',
    bedrooms: 5,
    bathrooms: 4,
    maxGuests: 10,
    amenities: ['Pool', 'Game Room', 'WiFi', 'Kitchen', 'BBQ Grill', 'Parking'],
    images: [
      'https://images.unsplash.com/photo-1611480455840-d2e7f5af8f27',
      'https://images.unsplash.com/photo-1618168140399-bed9cc74ab72',
      'https://images.unsplash.com/photo-1617905877040-6c61b7d77e06'
    ],
    hostId: 4,
    createdAt: '2023-04-20T11:30:00Z',
    rating: 4.6,
    reviewCount: 22,
    featured: true
  },
  {
    id: 5,
    title: 'Sleek Penthouse with City Skyline View',
    description: 'Experience luxury living in this modern penthouse apartment featuring panoramic city views, high ceilings, and an open floor plan. Perfect for a romantic getaway or business travel.',
    location: 'Chicago, Illinois',
    pricePerNight: 525,
    type: 'luxury apartment',
    bedrooms: 1,
    bathrooms: 1.5,
    maxGuests: 2,
    amenities: ['City View', 'WiFi', 'Kitchen', 'Air Conditioning', 'Gym', 'Doorman'],
    images: [
      'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd',
      'https://images.unsplash.com/photo-1512915922686-57c11dde9b6b',
      'https://images.unsplash.com/photo-1565329921943-7e537b7a2ea9'
    ],
    hostId: 2,
    createdAt: '2023-05-12T16:20:00Z',
    rating: 4.9,
    reviewCount: 16,
    featured: false
  },
  {
    id: 6,
    title: 'Rustic Lakefront Cabin',
    description: 'Get away from it all in this peaceful lakefront cabin. Enjoy fishing, swimming, and kayaking right from your private dock. The perfect spot for a nature retreat.',
    location: 'Lake Tahoe, California',
    pricePerNight: 285,
    type: 'cabin',
    bedrooms: 2,
    bathrooms: 1,
    maxGuests: 4,
    amenities: ['Lake Access', 'Dock', 'Fireplace', 'WiFi', 'Kitchen', 'Deck'],
    images: [
      'https://images.unsplash.com/photo-1473773386757-42bbe7288351',
      'https://images.unsplash.com/photo-1685122121710-c1bdbd9ae8ce',
      'https://images.unsplash.com/photo-1685122121733-cb41a27e669b'
    ],
    hostId: 5,
    createdAt: '2023-06-03T08:45:00Z',
    rating: 4.7,
    reviewCount: 12,
    featured: false
  },
  {
    id: 7,
    title: 'Oceanfront Beach House',
    description: 'Wake up to the sound of waves in this beautiful oceanfront beach house. Features multiple decks, floor-to-ceiling windows, and direct beach access for the ultimate beach vacation.',
    location: 'San Diego, California',
    pricePerNight: 670,
    type: 'beach house',
    bedrooms: 3,
    bathrooms: 2,
    maxGuests: 6,
    amenities: ['Beach Access', 'Ocean View', 'WiFi', 'Kitchen', 'Deck', 'Parking'],
    images: [
      'https://images.unsplash.com/photo-1474874055390-459bc92357f3',
      'https://images.unsplash.com/photo-1613553497126-a44624272024',
      'https://images.unsplash.com/photo-1510608658071-c48be9a076f6'
    ],
    hostId: 6,
    createdAt: '2023-06-28T13:10:00Z',
    rating: 4.8,
    reviewCount: 24,
    featured: true
  },
  {
    id: 8,
    title: 'Elegant Victorian Home',
    description: 'Step back in time in this beautifully restored Victorian home. Features original architectural details combined with modern amenities for a comfortable and unique stay.',
    location: 'San Francisco, California',
    pricePerNight: 420,
    type: 'vacation home',
    bedrooms: 4,
    bathrooms: 2.5,
    maxGuests: 8,
    amenities: ['Historic Design', 'WiFi', 'Kitchen', 'Fireplace', 'Garden', 'Parking'],
    images: [
      'https://images.unsplash.com/photo-1617905877140-1d490e42156b',
      'https://images.unsplash.com/photo-1613912836002-d5e02bba7d30',
      'https://images.unsplash.com/photo-1618168139321-f756c30b63b4'
    ],
    hostId: 7,
    createdAt: '2023-07-15T10:00:00Z',
    rating: 4.6,
    reviewCount: 18,
    featured: false
  },
  {
    id: 9,
    title: 'Luxury Beachside Condo',
    description: 'Enjoy this modern luxury condo just steps from the beach. Features include high-end finishes, a gourmet kitchen, and a spacious balcony with ocean views.',
    location: 'Miami, Florida',
    pricePerNight: 380,
    type: 'luxury apartment',
    bedrooms: 2,
    bathrooms: 2,
    maxGuests: 4,
    amenities: ['Pool', 'Beach Access', 'WiFi', 'Kitchen', 'Gym', 'Parking'],
    images: [
      'https://images.unsplash.com/photo-1512916194211-3f2b7f5f7de3',
      'https://images.unsplash.com/photo-1561321698-40ae82a47b9e',
      'https://images.unsplash.com/photo-1565329921943-7e537b7a2ea9'
    ],
    hostId: 8,
    createdAt: '2023-08-02T15:30:00Z',
    rating: 4.7,
    reviewCount: 20,
    featured: true
  },
  {
    id: 10,
    title: 'Charming Cottage with Garden',
    description: 'Relax in this cozy cottage surrounded by a beautiful garden. Perfect for a peaceful getaway with all the comforts of home.',
    location: 'Savannah, Georgia',
    pricePerNight: 210,
    type: 'vacation home',
    bedrooms: 2,
    bathrooms: 1,
    maxGuests: 4,
    amenities: ['Garden', 'WiFi', 'Kitchen', 'Porch', 'Parking', 'Air Conditioning'],
    images: [
      'https://images.unsplash.com/photo-1611480455812-5fbbd5d8fb6b',
      'https://images.unsplash.com/photo-1607782984048-6bf1793ab5d0',
      'https://images.unsplash.com/photo-1617905877040-6c61b7d77e06'
    ],
    hostId: 9,
    createdAt: '2023-08-20T09:45:00Z',
    rating: 4.8,
    reviewCount: 15,
    featured: false
  },
  {
    id: 11,
    title: 'Secluded Beach Bungalow',
    description: 'Escape to this private beach bungalow located on a secluded stretch of coastline. Enjoy pristine beaches, stunning sunsets, and a tranquil atmosphere.',
    location: 'Maui, Hawaii',
    pricePerNight: 495,
    type: 'beach house',
    bedrooms: 1,
    bathrooms: 1,
    maxGuests: 2,
    amenities: ['Beach Access', 'Ocean View', 'WiFi', 'Kitchen', 'Outdoor Shower', 'Hammock'],
    images: [
      'https://images.unsplash.com/photo-1578439297699-eb414262c2de',
      'https://images.unsplash.com/photo-1511840636560-acee95b3a83f',
      'https://images.unsplash.com/photo-1544143086-828f66ac3945'
    ],
    hostId: 10,
    createdAt: '2023-09-05T12:15:00Z',
    rating: 4.9,
    reviewCount: 22,
    featured: true
  },
  {
    id: 12,
    title: 'Modern Mountain Retreat',
    description: 'This contemporary mountain home offers stunning views and luxury amenities. Features include floor-to-ceiling windows, a chef\'s kitchen, and a hot tub on the deck.',
    location: 'Park City, Utah',
    pricePerNight: 550,
    type: 'vacation home',
    bedrooms: 4,
    bathrooms: 3.5,
    maxGuests: 8,
    amenities: ['Mountain View', 'Hot Tub', 'WiFi', 'Kitchen', 'Fireplace', 'Ski Storage'],
    images: [
      'https://images.unsplash.com/photo-1618168139321-f756c30b63b4',
      'https://images.unsplash.com/photo-1611480455840-d2e7f5af8f27',
      'https://images.unsplash.com/photo-1617905877140-1d490e42156b'
    ],
    hostId: 11,
    createdAt: '2023-09-18T14:00:00Z',
    rating: 4.8,
    reviewCount: 16,
    featured: false
  }
];

module.exports = properties;
