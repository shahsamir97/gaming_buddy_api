
var db_conn = require('./db_connection');
var con = db_conn.getConnection();

exports.gameList = function (req, res) {

    const filter = wrapForLikeCaluse(req.query.filter)

    var sql = "SELECT id,name,imgUrl FROM game where name like ?";
    con.query(sql, [filter], function (err, result) {
        if (err) console.log(err)
        console.log(result);
        res.json(result);
    })
}

function wrapForLikeCaluse(value){
    // % % used to user this values inside mysql like operator
    if (value == undefined){
        value = "";
    }
    console.log(value)
    return "%"+value+"%";
}