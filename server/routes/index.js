const routes = require('express').Router();
const customer = require('../controllers/userControls')
const product = require('../controllers/productControls')


//get product
routes.get('/products',product.getProducts)

//delete product
routes.delete('/products/:id' , product.deleteProducts)


//post
routes.post('/products',product.postProducts)
routes.post('/customers', customer.findOrCreate)

module.exports = routes;