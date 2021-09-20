const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const Order = require('../../models/Order');

//@rout     Post api/orders
//@desc     registering order
//@access   Private
router.post(
  '/',
  [
    check('items', 'item(s) is required').not().isEmpty(),
    // check('isDelivered', 'Define the status of order').isBoolean(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { items, orderPrice } = req.body;
    const currentDate = new Date();

    const orderFields = {
      orderPrice,
      phoneNumber: null,
      isDelivered: false,
      date: currentDate.toLocaleDateString(),
      time: currentDate.toLocaleTimeString(),
    };
    if (items) {
      orderFields.items = items.map((element) => {
        return { itemId: element.itemId, quantity: element.quantity };
      });
    }

    try {
      let order = new Order(orderFields);
      await order.save();
      res.json(order);
    } catch (error) {
      console.error(error.message);
      return res.status(500).send('Server error');
    }
  }
);

//@rout     Update api/orders
//@desc     update specific order
router.put('/:id', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    order.isDelivered = true;
    await order.save();
    res.json(order);
  } catch (error) {
    console.error(error.message);
    return res.status(500).send('Server error');
  }
});

//@rout     GET api/orders
//@desc     Get all orders
//@access   Public
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find().populate('items.item', ['name', 'price']);
    res.json(orders);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

//@rout     GET api/orders
//@desc     Get all pending orders
router.get('/pending-orders', async (req, res) => {
  try {
    const pendingOrders = await Order.find({ isDelivered: false });
    res.json(pendingOrders);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

//@rout     GET api/orders
//@desc     Get all delivered orders
router.get('/delivered-orders/:date', async (req, res) => {
  try {
    const date = req.params.date.replace(/-/g, '/');
    const deliveredOrders = await Order.find({
      isDelivered: true,
      date: date,
    });
    res.json(deliveredOrders);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

//@rout     GET api/order
//@desc     Get an order
//@access   Public
router.get('/order/:order_id', async (req, res) => {
  try {
    const order = await Order.findOne({ _id: req.params.order_id }).populate(
      'items.item',
      ['name', 'price']
    );

    if (!order) return res.status(400).json({ msg: 'Order not found' });

    res.json(order);
  } catch (err) {
    console.error(err.message);
    if (err.kind == 'ObjectId') {
      return res.status(400).json({ msg: 'Order not found' });
    }
    res.status(500).send('Server error');
  }
});

//@rout     DELETE api/orders
//@desc     Delete an order
//@access   Public
router.delete('/delete-order/:id', async (req, res) => {
  try {
    // @todo - remove an order
    await Order.findOneAndDelete({ _id: req.params.id });
    res.json({ msg: 'Order deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

//@rout     GET api/orders
//@desc     Get total sales
router.get('/total-sales', async (req, res) => {
  const currentDate = new Date();
  try {
    const sales = await Order.find({
      isDelivered: true,
      date: currentDate.toLocaleDateString(),
    });
    const total = sales.reduce(
      (accumulator, currentValue) => accumulator + currentValue.orderPrice,
      0
    );
    res.json(total);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
