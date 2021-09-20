const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const Category = require('../../models/Category');

//@rout     GET api/categories
//@desc     Get all categories
router.get('/', async (req, res) => {
  try {
    const categories = await Category.find().sort({
      name: 1,
    });
    res.json(categories);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

//@rout     POST api/categories
//@desc     Register a category
router.post(
  '/add-category',

  check('name', 'name is required').not().isEmpty(),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name } = req.body;
    const categoryFields = {
      name: name.toLowerCase(),
    };

    try {
      let category = new Category(categoryFields);
      await category.save();
      res.json(category);
    } catch (error) {
      console.error(error.message);
      return res.status(500).send('Server error');
    }
  }
);

//@rout     PUT api/categories
//@desc     Edit a category
router.put('/edit-category', async (req, res) => {
  const { _id, name } = req.body;
  try {
    // @todo - remove a category
    const category = await Category.findById(_id);
    category.name = name;
    await category.save();
    res.json(category);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

//@rout     Delete api/categories
//@desc     Delete a category
router.delete('/delete-category/:category_id', async (req, res) => {
  try {
    // @todo - remove a category
    await Category.findOneAndDelete({ _id: req.params.category_id });
    res.json({ msg: 'Category deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
