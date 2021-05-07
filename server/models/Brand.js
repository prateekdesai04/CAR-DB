const mongoose = require('mongoose');

const BrandSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  c_origin: {
    type: String,
  },
});

module.exports = mongoose.model('Brand', BrandSchema);

// Brand - collection will appear in CAD_DB_COMMON containing all Brands
