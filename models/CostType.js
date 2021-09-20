const mongoose = require('mongoose');

const costTypeSchema = new mongoose.Schema({
  _id: Number,
  typeName: String,
});

module.exports = CostType = mongoose.model('costType', costTypeSchema);
