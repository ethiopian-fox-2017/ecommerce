var Cart = require('../models/cart')

module.exports = {
  getTransaction: (req, res) => {
    Cart.find((err,results) => {
      if(err) {
        res.send(err)
      } else {
        res.send(results)
      }
    })
  },
  createTransaction: (req, res) => {
    let newTransaction = new Cart({
      memberid: req.body.iduser,
      products: req.body.listItem,
      in_date: new Date(),
      subtotal: req.body.subtotal
    })

    newTransaction.save((err) => {
      if(err) {
        res.send(err)
      } else {
        res.send('sukses');
      }
    })
  }
};