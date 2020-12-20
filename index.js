const mysql = require('mysql');
const inquirer = require('inquirer');
const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "2b.D_?rtwbjm",
    database: "greatBay_DB",
});
connection.connect(function (err) {
    if (err) throw err;
    start();
});