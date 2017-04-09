let Cart = require('../models/cart');
var jwt = require('jsonwebtoken');
let Costumer = require('../models/costumer');
module.exports = {
    checkout: function(req, res) {
        let item_ids = [];
        let item_id = req.body.data
        //console.log(item_id);
        //console.log(req.headers.token);
        item_id.forEach(function(item) {
            item_ids.push(item._id);
        })

        console.log(item_ids);
        let token = req.headers.token
        if (token) {
          jwt.verify(token, 'secret', function(err, decoded) {
            if (err) {
              res.send(err);
            } else {
              //console.log(decoded)
              Cart.create({
                  contumer_facebookid: decoded.data.facebookid,
                  date: Date.now(),
                  item_list: item_ids
              },function(err,data) {
                  if (err) {
                    res.send('checkout data failed');
                  } else {
                    res.send(data);
                  }
              })
            }

          });
        } else {
          res.send('there is no token')
        }

    },

  checkouthistory:function(req,res){
    let token = req.headers.token
    //console.log(token);
    if(token){
      jwt.verify(token, 'secret', function(err, decoded) {
        //console.log(decoded);
        if (err) {
          res.send(err)
        } else {
          Cart.find({
            contumer_facebookid:decoded.data.facebookid
          }, function(err,data){
            if (err) {
              res.send('get cart data failed')
            } else {
              res.send(data)
            }
          }).populate('item_list')
          // .then()
        }



      });

    }
    else{
      res.send('there is no token')
    }

  }

}
