const mongoose = require('mongoose');

const CarSchema = mongoose.Schema({
  brandId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  segment: {
    type: String,
  },
});

module.exports = mongoose.model('Car', CarSchema);

// Car - collection will appear in CAD_DB_COMMON containing all cars
// MongoDB will auto assign the ID = _id
