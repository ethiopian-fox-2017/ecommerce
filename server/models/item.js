var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var itemSchema = new Schema({
  name: String,
  description: String,
  price: Number,
  img_url: String,
  stock: Number
});

var Item = mongoose.model('Item', itemSchema);

module.exports = Item;
