var db_conn = require('./db_connection');
var con = db_conn.getConnection();

exports.getFriendList = function (req, res){
    const userId  = req.query.userId

    const query = "SELECT user.id,user.name FROM friends,user WHERE friends.userId=? and user.id=friends.friendId";

    con.query(query, [userId], function (err, result) {
        if (err) res.status(500)

        res.json(result)
    })
}