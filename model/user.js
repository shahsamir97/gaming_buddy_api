var db_conn = require('./db_connection');
var con = db_conn.getConnection();

exports.userInfo = function (req,res) {
    const email = req.query.email;

    var sql = "SELECT name, email, age, country,city, institution, selected_games FROM user where email=?";
    con.query(sql, [email], function (err, result) {
      console.log(result[0]);
        res.json(result[0]);
    })

}