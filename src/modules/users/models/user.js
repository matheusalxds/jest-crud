const mongoose = require('mongoose');
const Random = require('meteor-random');

const schema = new mongoose.Schema({
  _id: { type: String, required: true, default: () => Random.id() },
  name: { type: String, required: true },
  lastName: String,
  fullName: String,
  email: String,
}, { collection: 'users' });

module.exports = mongoose.model('User', schema);
