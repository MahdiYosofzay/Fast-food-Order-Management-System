const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  items: [
    {
      itemId: { type: mongoose.Schema.Types.ObjectId, ref: 'item' },
      quantity: Number,
    },
  ],
  isDelivered: Boolean,
  date: String,
  time: String,
  phoneNumber: Number,
  orderPrice: Number,
});

module.exports = Order = mongoose.model('order', orderSchema);
