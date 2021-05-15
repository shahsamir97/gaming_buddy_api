const express = require('express');
const loginModule = require('./model/login');
const registerModule = require('./model/register_user');
const userModule = require('./model/user');
const forgetPasswordModule = require('./model/forget_password')
const gameListModule = require('./model/game_list')
const verifyToken = require('./token');
const bodyParser = require('body-parser');
const searchPlayersModule = require('./model/search_player');
const sendFriendRequestModule = require('./model/send_friend_request')

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

app.get("/searchPlayers", verifyToken,function (req, res) {
    searchPlayersModule.searchPlayer(req, res)
});

app.post("/forgetPassword", function (req, res) {
   forgetPasswordModule.forgetPassword(req,res);
});

app.get('/gameList', function (req, res) {
    gameListModule.gameList(req,res)
})

const checkEmailModule = require('./model/checkEmailExistence')
app.get('/checkEmail', function (req, res) {
checkEmailModule.checkEmail(req, res)
})

app.get('/verifyToken', verifyToken)

app.post('/sendFriendRequest', function (req, res) {
    sendFriendRequestModule.sendFriendRequest(req, res)
})

app.get('/', function (req, res) {
    res.send("Serviver running")
})

app.use('/img/games', express.static('./img/games'))

app.listen(5000);