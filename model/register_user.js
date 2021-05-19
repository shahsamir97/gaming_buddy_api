var db_conn = require('./db_connection');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var config = require('../config');

const con = db_conn.getConnection()

exports.createUser = function (response, request){
    const password = request.body.password;
    const email = request.body.email;
    const name = request.body.name;
    const age = request.body.age;
    const institution = request.body.institution;
    const country = request.body.country;
    const city = request.body.city;
    const selectedGames = request.body.selectedGames

    //checking if email already exist
    var sql = "SELECT name FROM user where email=?";
    con.query(sql, [email], function (err, result){
        if (err) {
             response.status(500).send({auth: false, token: null, message: "Couldn't create user"})
        }else {
            if(result.length < 1) {
                //when email is new or not exist in the database
                const hashedPassword = bcrypt.hashSync(password, 8)
                var sql = "INSERT INTO user ( id,name, email, password, age, institution, country, city, selected_games) VALUES (UUID_SHORT(),?,?,?,?,?,?,?,?)";
                con.query(sql, [name, email, hashedPassword, age, institution, country, city, selectedGames], function (err, result) {
                    if (err) {
                        //Create user failed
                        console.log(err.message)
                        response.status(500).send({
                            auth: false,
                            token: null,
                            message: "Couldn't create a user.Try again"
                        })
                    }else {
                        //create user successful
                        //generating token for user
                        const token = jwt.sign({id: result.insertId}, config.secret, {
                            expiresIn: 86400 // expires in 24 hours
                        });
                        response.status(200).send({auth: true, token: token, userId: result.insertId, message: "User Created Successfully"})
                    }
                });
            }else{
                //when email exist
                response.status(409).send({auth: false, token: null, userId: null, message: "Email Already Exist"})
            }
        }
    })

}

