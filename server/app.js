const express = require('express');
const app = express();
const monggo = require('mongoose');
const index = require('./routes/index');
const bodyParser = require('body-parser');
let cors = require('cors');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors())
app.use('/',index);

monggo.connect('mongodb://localhost/ecommerce')
monggo.connection.on('connected', function(){
  console.log('mongodb is connected');
})
app.listen(3000, () => {
  console.log('Express is running');
})
