const mysql = require('mysql');

var connection = mysql.createConnection({
    host: "eu-cdbr-west-03.cleardb.net",
    user: "b6ed446cb9886e",
    password: "3c83becd",
    database: "heroku_ce45d63fb4417ef"
});

connection.connect(function (err) {
    if (err) {
        console.log("Database disconnected");
    }
});

connection.on('error', function(err) {
    console.log('db error', err);
    if(err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
        handleDisconnect();                         // lost due to either server restart, or a
    } else {                                      // connnection idle timeout (the wait_timeout
        throw err;                                  // server variable configures this)
    }
});


handleDisconnect();

exports.getConnection = function () {
    return connection
}
