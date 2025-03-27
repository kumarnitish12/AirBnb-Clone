// User model (for reference - using in-memory storage in data/users.js)
class User {
  constructor(id, name, email, password, isHost = false) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.isHost = isHost;
    this.bookings = [];
    this.createdAt = new Date().toISOString();
  }
}

module.exports = User;
