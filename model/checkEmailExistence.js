var db_conn = require('./db_connection');
var con = db_conn.getConnection()

exports.checkEmail = function (req, res) {
    const email = req.query.email
    //checking if email already exist
    var sql = "SELECT * FROM user where email=?";
    con.query(sql, [email], function (err, result){
        if (result.length > 0){
            res.status(200).send({auth: false, token: null, message:"This email already exists"})
        }else {
            res.status(200).send({auth: true, token: null, message:"ok"})
        }
    })
}