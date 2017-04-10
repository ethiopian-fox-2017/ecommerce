var Item = require('../models/item');

var addItem = function(req, res, next) {
  Item.create({
    name : req.body.name,
    description : req.body.description,
    price : req.body.price,
    img_url : req.body.img_url,
    stock : req.body.stock
  }, function(err, item) {
    if(err){
      res.send(err)
    } else {
      res.send(item)
    }
  });
}

var showItems = function(req, res, next) {
  Item.find(function(err, items) {
    if(err) {
      res.send({error: err})
    } else {
      res.send(items)
    }
  });
}

var deleteItem = function(req, res) {
  Item.findByIdAndRemove(req.params.itemId, function (err, item) {
    if(err){
      res.send('Deleting Item Failed')
    } else {
      res.send(`Item has been succesfully deleted from Database.`)
    }
  });
}

var updateItem = function(req, res) {
  Item.findOneAndUpdate(
    {
      _id : req.params.itemId
    },
    {
      name : req.body.name,
      description : req.body.description,
      price : req.body.price,
      img_url : req.body.img_url,
      stock : req.body.stock
    }, function(err, item) {
      if(err){
        res.send(err)
      } else {
        res.send(`Item info has been succesfully updated.`)
      }
    })
}

module.exports = {
  addItem,
  showItems,
  deleteItem,
  updateItem
}
