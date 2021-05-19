var db_conn = require('./db_connection');
var con = db_conn.getConnection();

exports.sendFriendRequest = function (req,res) {
    const senderId = req.body.senderId
    const receiverId = req.body.receiverId

    console.log("senderId :",senderId)

    //checking whether a request already in db
    var sql =  "SELECT * FROM friend_request WHERE receiverId=? and senderId=?";
    con.query(sql,[receiverId, senderId], function (err, result) {
        if (result.length > 0){
            //Friend request already exists
            res.status(200).send({message: "Friend request already sent"})
        }else{
            //Unique friend request
            var sql = "INSERT INTO friend_request (senderId, receiverId) values (?, ?)"
            con.query(sql, [senderId, receiverId], function (err, result) {
               if (!err) {
                   res.status(200).send({message: "Friend request sent"})
               }else {
                   res.status(500).send()
               }
            })
        }
    })
}