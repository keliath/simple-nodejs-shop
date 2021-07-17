const path = require("path");

const express = require('express');

const sequelize = require('./utils/database');
const Product = require('./models/product');
const User = require('./models/user');
const Cart = require("./models/cart");
const CartItem = require('./models/cart-item');
const Order = require('./models/order');
const OrderItem = require('./models/order-item');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views'); //type views it wouldnt necessary because its already the deafult value

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const errorsController = require('./controllers/errors');

app.use((req, res, next) => {
    User.findByPk(1).then(user => {
        req.user = user;
        console.log(req.user);
        next();
    }).catch(err => console.log(err));
});

// Browsers will by default try to request /favicon.ico from the root of a hostname, in order to show an icon in the browser tab.
// If you want to avoid this request returning a 404, you can either:
app.get('/favicon.ico', (req, res) => res.status(204)); //with this the console with not print twice

//updated bodyParser for parse body request
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorsController.error404);

//relations
Product.belongsTo(User, {
    constraints: true,
    onDelete: 'CASCADE'
});
User.hasMany(Product); //only one of both relations its needed
User.hasOne(Cart);
Cart.belongsTo(User); //optional, only need one direction relation
Cart.belongsToMany(Product, {
    through: CartItem
});
Product.belongsToMany(Cart, {
    through: CartItem
});
Order.belongsTo(User);
User.hasMany(Order);
Order.belongsToMany(Product, {
    through: OrderItem
});

sequelize.sync({
    // force: true
}).then(result => { //force: forces to overwrite the database even already exist, basically force drop tables
    // console.log(result);
    return User.findByPk(1);
}).then(user => { // then; for create user example
    if (!user) {
        return User.create({
            name: 'John',
            email: 'test@test.com'
        });
    }
    return user; //Promise.resolve to nested promises with one return of object if conditional
}).then(user => {
    // console.log(user);
    return user.createCart();
}).then(cart => {
    app.listen(3000);
}).catch(err => {
    console.log(err);
});