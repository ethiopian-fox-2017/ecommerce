var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var customerSchema = new Schema({
    name: String,
    memberid: String
});

var Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;
