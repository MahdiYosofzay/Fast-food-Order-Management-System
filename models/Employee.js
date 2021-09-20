const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  _id: Number,
  name: String,
  password: String,
});

module.exports = Admin = mongoose.model('admin', adminSchema);
