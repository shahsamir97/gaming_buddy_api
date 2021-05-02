var db_conn = require('./db_connection');
var con = db_conn.getConnection();

exports.searchPlayer = function (req,res) {
    const game = req.query.game;
    const page = req.query.page;
   

    var sql = "SELECT * FROM user where email=?";
    con.query(sql, [email], function (err, result) {
        console.log(result[0]);
        res.json(result[0]);
    })

}