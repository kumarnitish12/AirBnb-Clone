// Booking model (for reference - using in-memory storage in data/bookings.js)
class Booking {
  constructor(id, propertyId, userId, checkIn, checkOut, guests, totalPrice) {
    this.id = id;
    this.propertyId = propertyId;
    this.userId = userId;
    this.checkIn = checkIn;
    this.checkOut = checkOut;
    this.guests = guests;
    this.totalPrice = totalPrice;
    this.status = 'confirmed';
    this.createdAt = new Date().toISOString();
  }
}

module.exports = Booking;
