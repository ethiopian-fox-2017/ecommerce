const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartSchema = new Schema({
  memberid: {type: String, ref:'Customer'},
  products: [{type: Schema.Types.ObjectId, ref:'Product'}],
  in_date: Date,
  subtotal: Number
});



const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;