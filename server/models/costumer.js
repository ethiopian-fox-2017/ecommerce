var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var costumersSchema = new Schema ({
  "username":String,
  "facebookid":String,
  "gender":String,
  "email": String
});

var Costumer = mongoose.model('Costumer', costumersSchema);

module.exports = Costumer;
