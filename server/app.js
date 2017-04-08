var express=require('express');
var bodyParser=require('body-parser');
let mongoose= require('mongoose');
let cors=require('cors');
let api=require('./routes/api');
mongoose.connect('mongodb://localhost/ecommerce');
let app=express()


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors());
app.use('/api',api);
app.listen(3000);
