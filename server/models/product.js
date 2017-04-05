const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: String,
  description: String,
  price: String,
  stock: Number,
  image: String
});


const Product = module.exports = mongoose.model('Product', productSchema);


module.exports = Product;