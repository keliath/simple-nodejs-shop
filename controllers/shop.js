const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getProducts = (req, res, next) => {
    Product.fetchAll(products => {
        res.render('shop/product-list', {
            prods: products,
            pageTitle: 'Shop',
            path: '/products',
        });
    });
}

exports.getProduct = (req, res, next) => {
    const prodId = req.params.productId;
    Product.findById(prodId, product => {
        // console.log(product);
        res.render('shop/product-detail', {
            product: product,
            pageTitle: 'Product Detail',
            path: '/products'
        })
    });
}

exports.getHome = (req, res, next) => {
    res.render('shop/index', {
        path: '/',
        pageTitle: 'Home'
    });
}

exports.getCart = (req, res, next) => {
    res.render('shop/cart', {
        path: '/cart',
        pageTitle: 'Your Cart'
    });
}

exports.postCart = (req, res, next) => {
    const productId = req.body.prodId;
    Product.findById(productId, product => {
        console.log(product);
        Cart.addProduct(productId, product.price);
    });
    res.redirect('/cart');
};

exports.getCheckout = (req, res, next) => {
    res.render('shop/checkout', {
        path: '/checkout',
        pageTitle: 'Your checkout'
    });
}

exports.getOrders = (req, res, next) => {
    res.render('shop/orders', {
        path: '/orders',
        pageTitle: 'Your Order'
    });
}