var db_conn = require('./db_connection');

exports.getUserData = function provideUserData(res){
    var sql = "INSERT INTO customers (name, address) VALUES ('Company Inc', 'Highway 37')";
    db_conn.getConnection().query("SELECT * FROM user", function (err, result){
        console.log(result)
        console.log(result.length)
        res.json(result)
    });
}
