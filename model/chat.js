var db_conn = require('./db_connection');
var con = db_conn.getConnection();

exports.sendMessage = function (req, res) {
    const senderId = req.body.senderId
    const receiverId = req.body.receiverId
    const message = req.body.message
    let chatId = req.body.chatId;

    con.beginTransaction(function(err) {
        if (err) {
            throw err;
        }

        if (chatId == null) {
            chatId = new Date().getUTCMilliseconds()+senderId+receiverId;
        }

        con.query('UPDATE user SET inbox=CONCAT(inbox,?) WHERE id=?', [chatId+",", senderId], function (err, results) {
            if (err || results.affectedRows === 0) {
                return con.rollback(function () {
                    throw err
                });
            }

            con.query('UPDATE user SET inbox=CONCAT(inbox,?) WHERE id=?', [chatId+",", receiverId], function (err, results) {
                if (err || results.affectedRows === 0) {
                    throw err
                    return con.rollback(function () {
                        res.send({message: "failed"})
                    });
                }

                con.query('Insert into chat (chatId, last_message, senderId, receiverId) values (?,?,?,?)', [chatId, message, senderId, receiverId], function (err, results) {
                    if (err) {
                        throw err
                        return con.rollback(function () {
                            res.send({message: "failed"})
                        });
                    }

                    con.query('Insert into messages (chatId, message, senderId, receiverId) values (?,?,?,?)',[chatId,message,senderId, receiverId],function (error, results) {
                        if (error) {
                            throw err
                            return con.rollback(function () {
                                res.send({message: "failed"})
                            });
                        }

                        con.commit(function (err) {
                            if (err) {
                                throw err
                                return con.rollback(function () {
                                    res.send({message: "failed"})
                                });
                            }
                            console.log('success!');
                            res.send({message: "success"})
                        });
                    });
                });
            });
        });
    });
}

exports.getChats = function (req, res) {
    const userId = req.query.userId
    const sql = "select inbox from user where id=?"
    con.query(sql, [userId], function (err, result) {
        if (err) throw  err
        console.log(result.dataType)
        res.json.send(result[0])
    });
}

exports.getChatInfo = function (req, res) {
    let chatId = req.query.chatId
    let userId = req.query.userId

        con.query("select senderId, receiverId, last_message from chat where chatId=?", [chatId],
            function (err, result) {
                if (err || result.length == 0){
                    res.status(500)
                    return
                }
                console.log(result.length.toString())

                let lastMessage = result[0].last_message.toString()
                let chatPerson = ""
                if (result[0].senderId == userId){
                    chatPerson = result[0].receiverId
                }else{
                    chatPerson = result[0].senderId
                }

                con.query("select name from user where id=?",[chatPerson.toString()],
                    function (err, result) {
                        if (err || result.length == 0){
                            res.status(500).send()
                            return
                        }
                        let output = Object.assign(result[0],{last_message:lastMessage})

                        res.send(output)
                    })
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
