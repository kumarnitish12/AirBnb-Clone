// Review model (for reference - using in-memory storage in data/reviews.js)
class Review {
  constructor(id, propertyId, userId, rating, comment, username) {
    this.id = id;
    this.propertyId = propertyId;
    this.userId = userId;
    this.rating = rating;
    this.comment = comment;
    this.username = username;
    this.createdAt = new Date().toISOString();
  }
}

module.exports = Review;
