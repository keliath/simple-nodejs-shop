const path = require("path");

const express = require('express');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views'); //type views it wouldnt necessary because its already the deafult value

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const errorsController = require('./controllers/errors');

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



app.listen(3000);