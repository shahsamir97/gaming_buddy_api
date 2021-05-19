var db_conn = require('./db_connection');
var con = db_conn.getConnection();

exports.getFriendRequests = function (req, res){
    const userId  = req.query.userId

    const query = "SELECT user.id,user.name FROM friend_request,user WHERE friend_request.receiverId=? and friend_request.senderId=user.id";
    con.query(query, [userId], function (err, result) {
        if (err) res.status(500)

        res.json(result)
    })
}