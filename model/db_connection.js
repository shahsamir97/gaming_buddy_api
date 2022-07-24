const mysql = require('mysql');

var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "gamingbuddy"
});

connection.connect(function (err) {
    if (err) {
        console.log("Database disconnected");
    }else
        console.log("Database connected");
});

connection.on('error', function(err) {
    console.log('db error', err);
    if(err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
          console.log("PROTOCOL_CONNECTION_LOST")                  // lost due to either server restart, or a
    } else {                                      // connnection idle timeout (the wait_timeout
        throw err;                                  // server variable configures this)
    }
});

exports.getConnection = function () {
    return connection
}
