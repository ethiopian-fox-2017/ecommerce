var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var itemSchema = new Schema ({
  "item_id":String,
  "picture_url":String,
  "name":String,
  "desc": String,
  "stock":Number
});

var Item = mongoose.model('Item', itemSchema);

module.exports = Item;
