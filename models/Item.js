const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  itemName: String,
  price: Number,
  isAdded: Boolean,
  category: String,
});

module.exports = Item = mongoose.model('item', itemSchema);
