var db_conn = require('./db_connection');
var con = db_conn.getConnection();

exports.addToFriendList = function (req, res) {
    const userId = req.body.userId
    const friendId = req.body.friendId

    console.log(friendId)

    var query = "INSERT INTO friends (userId, friendId) values (?,?)";
    con.query(query, [userId, friendId], function (err, result) {
        if (err) res.status(500)
        doInReverse(res, userId,friendId)
    })
}

/*
This has to be done because we are creating two row for each user. For example, A send request to B
So when B accept the request, we will insert row in friends table for both user. In one of this row
A is user and B is friend. On the other hand, B is user and A is friend. So that we can retrieve the
friendlist for each user more easily
*/
function doInReverse(res,userId, friendId) {
    // this time userId = friendId and friendId = userId
    var query = "INSERT INTO friends (userId, friendId) values (?,?)";
    con.query(query, [friendId, userId], function (err, result) {
        if (err) res.status(500)

        var query = "DELETE FROM friend_request WHERE senderId=? and receiverId=?";
        con.query(query, [friendId, userId], function (err, result) {
            if (err) res.status(500)

            res.status(200).send({message: "Added to friends"})
        })

    })
}

//TODO:: Delete the inserted rowss if one of this operation fails to execute white a seperate function