const mysql = require('mysql');

var connection = mysql.createConnection({
    host: "us-cdbr-east-06.cleardb.net",
    user: "bdcb0964024fe7",
    password: "b7fb9b26",
    database: "heroku_a8eee1adfb448c3"
});

connection.connect(function (err) {
    if (err) {
        console.log("Database disconnected");
    }
    console.log("Database connected");
});

exports.getConnection = function () {
    return connection
}


