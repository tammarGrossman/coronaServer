const mysql = require('mysql');
let con = mysql.createConnection({
    host: "127.0.0.1",
    database: "corona",
    port: "3306",
    user: "root",
    password: "tg0583254978"
});

con.connect(function(err) {
    if (err) 
       res.status(400).send({ mas: err });
});

module.exports = con;
