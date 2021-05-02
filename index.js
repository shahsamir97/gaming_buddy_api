var express = require('express');
var loginModule = require('./model/login');
var registerModule = require('./model/register_user');
const userModule = require('./model/user')
const bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.urlencoded({extended : false}))

app.post("/login", function (req, res) {
    loginModule.loginUser(req, res)
});

app.post("/register", function (req, res) {
    registerModule.createUser(res, req)
})

var verifyToken = require('./token')
app.get("/me", verifyToken, function (req, res, next) {
   userModule.userInfo(req,res)
})

app.listen(3000);