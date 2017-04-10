var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var transactionSchema = new Schema({
  customerId : [{ type: String, ref: 'Customer' }],
  item_list :[{ type: Schema.Types.ObjectId, ref: 'Item' }],
  in_date : Date,
  total : Number

});

var Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;
