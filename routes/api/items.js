const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const Item = require('../../models/Item');

//@rout     GET api/item
//@desc     Get all items
router.get('/', async (req, res) => {
  try {
    const items = await Item.find().sort({
      category: 1,
      price: 1,
    });
    res.json(items);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

//@rout     Post api/items
//@desc     registering one item
router.post(
  '/add-item',

  check('name', 'name is required').not().isEmpty(),
  check('price', 'price is required').isNumeric(),
  check('category', 'category is required').isString(),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const item = req.body;

    let { name, price, category } = item;

    name = name
      .toLowerCase()
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.substring(1))
      .join(' ');

    const itemFields = {
      itemName: name,
      price,
      isAdded: false,
      category,
    };

    try {
      let item = new Item(itemFields);
      await item.save();
      res.json(item);
    } catch (error) {
      console.error(error.message);
      return res.status(500).send('Server error');
    }
  }
);

//@rout     PUT api/items
//@desc     edit item
router.put(
  '/edit-item',
  check('name', 'name is required').not().isEmpty(),
  check('price', 'price is required').isNumeric(),
  check('category', 'category is required').isString(),

  async (req, res) => {
    const item = req.body;

    try {
      // @todo - remove a category
      const oldItem = await Item.findById(item._id);
      oldItem.itemName = item.name;
      oldItem.price = item.price;
      oldItem.category = item.category;
      await oldItem.save();
      res.json(oldItem);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

//@rout     Delete api/items
//@desc     registering delete an item
router.delete('/delete-item/:item_id', async (req, res) => {
  try {
    // @todo - remove an item
    await Item.findOneAndDelete({ _id: req.params.item_id });
    res.json({ msg: 'Item deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

//@rout     Post api/items
//@desc     registering multiple items
// router.post(
//   '/add-items',

//   check('items.*.itemName', 'name is required').not().isEmpty(),
//   check('items.*.price', 'price is required').isNumeric(),
//   check('items.*.category', 'category is required').isString(),

//   async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }

//     const items = req.body.items;

//     items.map(async (item) => {
//       const { itemName, price, category } = item;

//       const itemFields = {
//         itemName,
//         price,
//         isAdded: false,
//         category,
//       };

//       try {
//         let item = new Item(itemFields);
//         await item.save();
//         res.json(item);
//       } catch (error) {
//         console.error(error.message);
//         return res.status(500).send('Server error');
//       }
//     });
//   }
// );

module.exports = router;
