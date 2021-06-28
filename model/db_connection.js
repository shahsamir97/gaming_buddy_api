const mysql = require('mysql');

var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "gamingbuddyapi"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected")
});

exports.getConnection = function () {
    return connection
}


