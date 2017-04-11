var express = require('express');
var router = express.Router();
var customerController = require('../controllers/customer');

router.post('/', customerController.addCustomer)

module.exports = router;
