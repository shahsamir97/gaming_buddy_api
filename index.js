const express = require('express');
const loginModule = require('./model/login');
const registerModule = require('./model/register_user');
const userModule = require('./model/user');
const forgetPasswordModule = require('./model/forget_password')
const verifyToken = require('./token');
const bodyParser = require('body-parser');
const searchPlayersModule = require('./model/search_player');

const app = express();

app.use(bodyParser.urlencoded({extended : false}));

app.post("/login", function (req, res) {
    loginModule.loginUser(req, res);
});

app.post("/register", function (req, res) {
    registerModule.createUser(res, req);
});

app.get("/me", verifyToken, function (req, res, next) {
   userModule.userInfo(req,res);
});

app.get("/searchPlayers",function (req, res) {
    searchPlayersModule.searchPlayer(req, res)
});

app.post("/forgetPassword", function (req, res) {
   forgetPasswordModule.forgetPassword(req,res);
});

app.get('/', function (req, res) {
    res.send("Serviver running")
})

app.listen(3000);