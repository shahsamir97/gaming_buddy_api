var db_conn = require('./db_connection');
var con = db_conn.getConnection();

exports.sendMessage = function (req, res) {

    const senderId = req.body.senderId
    const receiverId = req.body.receiverId
    const message = req.body.message
    var chatId = req.body.chatId

    var query = ""
    if (chatId == undefined){
        //checking If sender and receiver already have a chatId.
        query = "SELECT chatId FROM chat where senderId=? and receiverId=?  or senderId=? and receiverId=? limit 1"
        con.query(query, [senderId,receiverId, receiverId,senderId], function (err, result) {
            if (err) {
                console.log(err)
                res.status(500)
            }else{
                if (result.length > 0){
                    chatId = result[0].chatId
                    query = "INSERT INTO chat (chatId, senderId, receiverId, message) values (?,?,?,?)";
                    con.query(query, [chatId, senderId, receiverId, message], function (err, result) {
                        if (err) {
                            console.log(err)
                            res.status(500)
                        }
                        else{
                            res.send({message: "Message Sent"})
                        }
                    })
                }else{
                    console.log(result.length)
                    query = "INSERT INTO chat (chatId, senderId, receiverId, message) values (UUID_SHORT(),?,?,?)";
                    con.query(query, [senderId, receiverId, message], function (err, result) {
                        if (err) {
                            console.log(err)
                            res.status(500)
                        }
                        else{
                            res.send({message: "Message Sent"})
                        }
                    })
                }
            }
        })


    }else {
        query = "INSERT INTO chat (chatId, senderId, receiverId, message) values (?,?,?,?)";

        con.query(query, [chatId,senderId, receiverId, message], function (err, result) {
            if (err) {
                console.log(err)
                res.status(500)
            }
            else {
                console.log(result)
                res.status(200).send({message: "Message Sent"})
            }
        })
    }


}

exports.getChats = function (req, res) {
    const userId = req.query.userId
    const query = "SELECT DISTINCT chatId FROM chat WHERE senderId=? or receiverId=?"//and user.id=chat.receiverId and user.id=chat.senderId"
    con.query(query, [userId,userId], function (err, result) {
        if (err) {
            console.log(err)
            res.status(500)
        }
        else{
            res.json(result)
        }
    })
}

exports.getChatInfo = function (req, res) {
    const chatId= req.query.chatId
    const userId = req.query.userId

    const  query = "SELECT DISTINCT user.id, user.name from user , chat WHERE chat.chatId=? and (chat.senderId=user.id or chat.receiverId=user.id)"
    con.query(query, [chatId], function (err, result) {
        if (err){
            res.status(500)
        }else{
            if (result.length > 0){
                result.forEach( user =>{
                    if (user.id !== userId){
                        res.json(user)
                    }
                })
            }else{
                res.status(500)
            }
        }
    })
}

exports.getMessages = function (req, res) {
    const userId = req.query.userId
    const receiverId = req.query.receiverId
    const chatId = req.query.chatId

    const query = "SELECT * FROM chat where (senderId=? and receiverId=?) or (senderId=? and receiverId?)"
    con.query(query, [userId, receiverId, receiverId, userId], function (err, result) {
        if (err) res.status(500)
        else {
            res.json(result)
        }
    })
}