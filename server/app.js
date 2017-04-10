var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session')
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/ecommerce')
var passport = require('passport');
var Strategy = require('passport-local').Strategy;
var port = 3000 || process.env.PORT
var cors = require('cors')

var item = require('./routes/item');
var customer = require('./routes/customer');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(cors())

mongoose.connection.on('connected', function(){
  console.log('Mongoose is connected');
})

app.use('/item', item);
app.use('/customer', customer);
app.listen(port, function(){
  console.log(`Listening on port: ${port}`);
});

module.exports = app;
