// Property model (for reference - using in-memory storage in data/properties.js)
class Property {
  constructor(id, title, description, location, pricePerNight, type, hostId) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.location = location;
    this.pricePerNight = pricePerNight;
    this.type = type;
    this.bedrooms = 1;
    this.bathrooms = 1;
    this.maxGuests = 2;
    this.amenities = [];
    this.images = [];
    this.hostId = hostId;
    this.createdAt = new Date().toISOString();
    this.rating = 0;
    this.reviewCount = 0;
    this.featured = false;
  }
}

module.exports = Property;
