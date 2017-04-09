var express = require('express');
var router = express.Router();
var CostumerControl=require('../controlers/costumer');
var ItemControl=require('../controlers/item');
var cartControl=require('../controlers/cart');

router.post('/costumer',CostumerControl.create);
router.get('/costumer',CostumerControl.views);
router.put('/costumer/:id',CostumerControl.update);
router.delete('/costumer/:id',CostumerControl.delete);
router.post('/login',CostumerControl.login)

router.post('/item',ItemControl.create);
router.get('/item',ItemControl.views);
router.put('/item/:id',ItemControl.update);
router.delete('/item/:id',ItemControl.delete);

router.post('/checkout',cartControl.checkout)
router.get('/checkouthistory',cartControl.checkouthistory)

module.exports=router;
