const sendEmailHelper  = require('../email_sender');
const db_conn = require('./db_connection');

const con = db_conn.getConnection();

exports.forgetPassword = function (req, res) {
    const email = req.body.email;

    //checking if email already exist
    var sql = "SELECT * FROM user where email=?";
    con.query(sql, [email], function (err, result) {
        if (err) res.status(500)
        if (result.length < 1){
            res.status(200).send({auth: false, message:"No account found with this email!"});
        }else {
            sendEmailHelper.sendEmail(email, function (err, info) {
                if (err) {
                    console.log(err);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            })
        }
    });
}