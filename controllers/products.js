const Product = require('../models/product');

exports.getAddProducts = (req, res, next) => {
    // res.sendFile(path.join(rootDir, "views", 'add-product.html'));

    res.render('add-product', {
        pageTitle: "add-product-cs",
        path: "/admin/add-product",
        formsCss: true, //hbs
        productCss: true, //hbs
        activeAddProduct: true //hbs
    });
}

exports.postAddProducts = (req, res, next) => {
    const product = new Product(req.body.title);
    product.save();
    res.redirect('/');
}

exports.getProducts = (req, res, next) => {
    Product.fetchAll(products => {
        res.render('shop', {
            prods: products,
            pageTitle: 'Shop',
            path: '/',
            hasProducts: products.length > 0 ? true : false, //hbs
            productCss: true, //hbs
            activeShop: true //hbs
        });
    });

}