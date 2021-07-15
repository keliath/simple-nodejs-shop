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
};

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
};

exports.getHome = (req, res, next) => {
    res.render('shop/index', {
        path: '/',
        pageTitle: 'Home'
    });
};

exports.getCart = (req, res, next) => {
    Cart.getCart(cart => {
        if (cart) {
            Product.fetchAll(products => {
                // console.log(cart);
                const cartProducts = [];
                for (product of products) {
                    const cartProductData = cart.products.find(prod => prod.id === product.id);
                    if (cartProductData) {
                        cartProducts.push({
                            productData: product,
                            qty: cartProductData.qty
                        });
                    }
                }
                res.render('shop/cart', {
                    path: '/cart',
                    pageTitle: 'Your Cart',
                    products: cartProducts
                });

            });
        }
        //
    });
};

exports.postCart = (req, res, next) => {
    const productId = req.body.prodId;
    Product.findById(productId, product => {
        console.log(product);
        Cart.addProduct(productId, product.price);
        res.redirect('/cart');
    });
};

exports.postCartDeleteItem = (req, res, next) => {
    const prodId = req.body.productId;
    Product.findById(prodId, product => {
        Cart.deleteProduct(prodId, product.price);
        res.redirect('/cart');
    });
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