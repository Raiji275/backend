const mongoose = require('mongoose');

const elseltSchema = new mongoose.Schema({
  full_name: {
    type: String,
    required: true
  },
  phone_number: {
    type: Number,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  birthday: {
    type: String,
    required: true
  },
  profession_type: {
    type: String,
    required: true
  },
  chosen_profession: {
    type: String,
    required: true
  },
  additional_info: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Elselt', elseltSchema);