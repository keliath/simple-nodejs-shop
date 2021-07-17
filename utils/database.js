const Sequelize = require('sequelize');

const sequelize = new Sequelize('node-example', 'root', '', {
    dialect: 'mysql',
    host: 'localhost'
});

module.exports = sequelize;

// const mysql = require('mysql2');

// const pool = mysql.createPool({
//     host: 'localhost',
//     user: 'root',
//     database: 'node-example',
//     password: ''
// });

// module.exports = pool.promise();