var Customer = require('../models/customer');
var jwt = require('jsonwebtoken')
require('dotenv').config();

var addCustomer = function(req, res) {
  Customer.findOne({memberid: req.body.id}, (err, result) => {
    if(err){
      res.send(err)
    } else if (result) {
      let token = jwt.sign({name: result.name, memberid: result.memberid}, process.env.SECRET_KEY)
      res.send(token)
    } else {
      let newCust = new Customer({
        name: req.body.name,
        memberid: req.body.id
      })
      newCust.save((err,data) => {
        if(err) {
          res.send(err)
        } else {
          let token = jwt.sign({name: result.name, memberid: result.memberid}, process.env.SECRET_KEY)
          res.send(token)
        }
      })
    }
  })
}

module.exports = {
  addCustomer
}
