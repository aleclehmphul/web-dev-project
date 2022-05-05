require('dotenv').config();
const mysql = require('msql2');

const con = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PSWD,
    database: process.env.MYSQL_DB
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    con.query("CREATE DATABASE IF NOT EXISTS web_dev_project_db", function (err, result) {
        if (err) throw err;
        console.log("Database created");
    });
});

module.exports = con;