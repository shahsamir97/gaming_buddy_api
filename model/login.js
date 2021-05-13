var db_conn = require('./db_connection');
var config = require('../config');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

exports.loginUser = function (req, res){
    const email = req.body.email;
    const password = req.body.password;

    if(email == null || password == null){
        res.status(500)
    }

    console.log(email + password)

    var sql = "SELECT id,password FROM user where email=?";
    db_conn.getConnection().query(sql, [email], function (err, result){
        if (result.length > 0){
            console.log(result[0].id);
            const isPasswordValid = bcrypt.compareSync(password, result[0].password)
            if (!isPasswordValid){
                res.status(200).send({auth: false, token: null, userId : null,message:"Incorrect email and password!"});
            }
            else {
                var token = jwt.sign({id: result.id}, config.secret, {
                    expiresIn: 86000 //expires in 24 hour
                });
                console.log(result[0].id)
                res.status(200).send({auth: true, token: token, userId: result[0].id, message:"Login Successful"})
            }
        }else{
            res.status(200).send({auth: false, token: null,userId : null, message:"No account found with this email address!"});
        }
    });
}
