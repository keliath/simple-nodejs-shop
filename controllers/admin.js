const Product = require('../models/product');

exports.getAddProducts = (req, res, next) => {
    res.render('admin/edit-product', {
        pageTitle: "add-product",
        path: "/admin/add-product",
        editing: false
    });
};

exports.postAddProducts = (req, res, next) => {
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const description = req.body.description;
    const price = req.body.price;
    req.user.createProduct({
        title: title,
        price: price,
        imageUrl: imageUrl,
        description: description
    }).then(result => {
        // console.log('product created');
        res.redirect('product-list');
    }).catch(err => console.log(err));


    // files json database use
    // const product = new Product(null, title, imageUrl, description, price);
    // console.log(product);
    // product.save().then(() => {
    //     res.redirect('/');
    // }).catch(err => console.log(err));
};

exports.getEditProducts = (req, res, next) => {
    const editMode = req.query.edit; //edit seria el nombre de la variable url, siempre devuelve el valor en string ya sea true o false

    if (!editMode) {
        return res.redirect('/');
    }
    const prodId = req.params.productId;

    Product.findByPk(prodId).then(product => {
        if (!product) {
            return res.redirect('/');
        }
        res.render('admin/edit-product', {
            pageTitle: "edit-product",
            path: "/admin/edit-product",
            editing: editMode,
            product: product
        });
    }).catch();

    //              files
    // Product.findById(prodId, product => {
    //     if (!product) {
    //         return res.redirect('/');
    //     }
    //     res.render('admin/edit-product', {
    //         pageTitle: "edit-product",
    //         path: "/admin/edit-product",
    //         editing: editMode,
    //         product: product
    //     });
    // });
};

exports.postEditProduct = (req, res, next) => {
    const prodId = req.body.productId;
    const updatedTitle = req.body.title;
    const updatedPrice = req.body.price;
    const updatedImageUrl = req.body.imageUrl;
    const updatedDescription = req.body.description;
    req.user.getProducts({
        where: {
            id: prodId
        }
    }).then(products => {
        const product = products[0];
        // Product.findByPk(prodId).then(product => {
        product.title = updatedTitle;
        product.price = updatedPrice;
        product.description = updatedDescription;
        product.imageUrl = updatedImageUrl;
        return product.save();
    }).then(result => {
        // console.log('updated product');
        res.redirect('/admin/product-list');
    }).catch(err => console.log(err));

    //              files
    // const updatedProduct = new Product(prodId, updatedTitle, updatedImageUrl, updatedDescription, updatedPrice);
    // console.log(updatedProduct);
    // updatedProduct.save();
    // res.redirect('/admin/product-list');
};

exports.postDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    // Product.destroy({where: {id:prodId}}).then().catch(); //alternative
    Product.findByPk(prodId).then(product => {
        return product.destroy();
    }).then(result => {
        res.redirect('/admin/product-list');
    }).catch(err => console.log(err));

    //          Files
    // Product.deleteById(prodId);
    // res.redirect('/admin/product-list');
};

exports.getProducts = (req, res, next) => {

    req.user.getProducts().then(products => {
        // Product.findAll().then(products => {
        res.render('admin/product-list', {
            prods: products,
            pageTitle: 'Shop',
            path: '/admin/product-list',
        });
    }).catch(err => console.log(err));

    // uses files
    // Product.fetchAll(products => {
    //     res.render('admin/product-list', {
    //         prods: products,
    //         pageTitle: 'Shop',
    //         path: '/admin/product-list',
    //     });
    // });
};