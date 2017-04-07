const routes = require('express').Router();
const customer = require('../controllers/userControls')
const product = require('../controllers/productControls')
const transaction = require('../controllers/transactionControls')


//get product
routes.get('/products',product.getProducts)
routes.get('/transactions',transaction.getTransaction)

//delete product
routes.delete('/products/:id' , product.deleteProducts)


//post
routes.post('/products',product.postProducts)
routes.post('/customers', customer.findOrCreate)
routes.post('/transactions', transaction.createTransaction)

module.exports = routes;