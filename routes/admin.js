const path = require('path');

const express = require('express');

const adminController = require('../controllers/admin.js');

const router = express.Router();


router.get('/add-product', adminController.getAddProducts);

router.get('/product-list', adminController.getProducts);

//use post or get (or put, patch) to trigger the middleware when only post or get data request
router.post('/add-product', adminController.postAddProducts);

router.get('/edit-product/:productId', adminController.getEditProducts);

router.post('/edit-product', adminController.postEditProduct);

router.post('/delete-product', adminController.postDeleteProduct);

module.exports = router;