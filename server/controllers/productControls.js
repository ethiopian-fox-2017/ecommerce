const product = require('../models/product');

module.exports = {
  getProducts: (req, res) => {
    product.find({},(err,results) => {
      if(err) {
        res.send(err)
      } else {
        res.send(results)
      }
    })
  },
  deleteProducts: (req, res) => {
    product.findOneAndRemove({_id:req.params.id}, (err) => {
      if(err) {
        res.send(err)
      } else {
        res.send('deleted')
      }
    })
  },
  postProducts: (req, res) => {
    let newProduct = new product(req.body);
    newProduct.save((err,success) => {
      if(err) {
        res.send(err)
      } else {
        res.send(success)
      }
    })

  }
};