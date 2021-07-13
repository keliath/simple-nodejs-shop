const path = require('path');

const express = require('express');

const productsController = require('../controllers/products');

const router = express.Router();


router.get('/add-product', productsController.getAddProducts);

//use post or get (or put, patch) to trigger the middleware when only post or get data request
router.post('/add-product', productsController.postAddProducts);

module.exports = router;