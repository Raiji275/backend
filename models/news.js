const mongoose = require('mongoose');

const NewsSchema = new mongoose.Schema({
  title:     { type: String, required: true },
  excerpt:   { type: String },
  body:      { type: String },
  imageUrl:  { type: String },
  date:      { type: Date, default: Date.now }
});

module.exports = mongoose.model('News', NewsSchema);