var express = require('express');
var router = express.Router();
var itemsController = require('../controllers/item');

/* ADD ITEM */
router.post('/', itemsController.addItem);

/* SHOW ITEMS */
router.get('/', itemsController.showItems);

/* DELETE ITEM */
router.delete('/:itemId', itemsController.deleteItem);

/* UPDATE ITEM */
router.put('/:itemId', itemsController.updateItem);

module.exports = router;
