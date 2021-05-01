var db_conn = require('./db_connection');

exports.getUserData = function provideUserData(res){
    var sql = "SELECT * FROM user";

    db_conn.getConnection().query(sql, function (err, result){
        console.log(result);
        console.log(result.length);
        res.json(result);
    });
}
