const customer = require('../models/customer');
const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = {
  findOrCreate: (req, res) => {
    customer.findOne({memberid: req.body.id}, (err,result) => {
      if(err) {
        res.send(err)
      } else if (result) {
        let token = jwt.sign({name:result.name, memberid: result.memberid},process.env.SECRET_KEY)
        res.send(token);
      } else {
        let newCust = new customer({
          name: req.body.name,
          memberid: req.body.id
        })
        newCust.save((err,data) => {
          if(err) {
            res.send(err)
          } else {
            let token = jwt.sign({name:data.name, memberid: data.memberid},process.env.SECRET_KEY)
            res.send(token);
          }
        })
      }
    })
    // console.log(req.body);
  }
};