const mysql = require('mysql');
const util = require('util');
const logo = require('asciiart-logo');
const config = require('./package.json');

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "2b.D_?rtwbjm",
    database: "employee_tracker_db",
});

connection.connect(function (err) {
    if (err) throw err;
    console.log(logo(config).render());
    init();
    console.log('Connected as id: ' + connection.threadId)
});

connection.query = util.promisify(connection.query);

module.exports = connection;