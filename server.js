const loginModule = require('./model/login');
const registerModule = require('./model/register_user');
const userModule = require('./model/user');
//const forgetPasswordModule = require('./model/forget_password')
const gameListModule = require('./model/game_list')
const verifyToken = require('./token');
const bodyParser = require('body-parser');
const searchPlayersModule = require('./model/search_player');
const sendFriendRequestModule = require('./model/send_friend_request')

var server = require('express')();
var http = require('http').Server(server);
var io = require('socket.io')(http);
var MySQLEvents = require('mysql-events');
var events = MySQLEvents({
    host: "localhost",
    user: "root",
    password: ""
})

server.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket) {
    console.log('A user connected');

    //Send a message after a timeout of 4seconds
    setTimeout(function() {
        socket.send('Sent a message 4seconds after connection!');
    }, 4000);

    socket.on('disconnect', function () {
        console.log('A user disconnected');
    });
});


//server.use(bodyParser.urlencoded({extended : false}));
//server.use('/img/games', express.static('./img/games'))

server.post("/login", function (req, res) {
    loginModule.loginUser(req, res);
});

server.post("/register", function (req, res) {
    registerModule.createUser(res, req);
});

server.get("/me", verifyToken, function (req, res, next) {
   userModule.userInfo(req,res);
});

server.get("/searchPlayers", verifyToken,function (req, res) {
    searchPlayersModule.searchPlayer(req, res)
});

// server.post("/forgetPassword", function (req, res) {
//    forgetPasswordModule.forgetPassword(req,res);
// });

server.get('/gameList', function (req, res) {
    gameListModule.gameList(req,res)
})

const checkEmailModule = require('./model/checkEmailExistence')
server.get('/checkEmail', function (req, res) {
checkEmailModule.checkEmail(req, res)
})

server.get('/verifyToken', verifyToken)

server.post('/sendFriendRequest', function (req, res) {
    sendFriendRequestModule.sendFriendRequest(req, res)
})

const friendRequest = require('./model/friend_requests')
server.get('/friendRequests',  function (req, res) {
    friendRequest.getFriendRequests(req, res)
})

const addToFriendListModule = require('./model/addToFriendList')
server.post('/addToFriends', function (req, res) {
    addToFriendListModule.addToFriendList(req, res)
})

const friendListModule = require('./model/friendlist')
server.get('/friendlist', function (req, res) {
    friendListModule.getFriendList(req, res)
})

const chatModule = require('./model/chat')
server.post('/sendMessage',function (req, res) {
chatModule.sendMessage(req, res)
})

server.get('/getchats', function (req, res) {
    chatModule.getChats(req,res)
})

server.get('/getChatInfo', function (req, res) {
    chatModule.getChatInfo(req,res)
})

server.get('/getChatMessages', function (req, res) {
    chatModule.getMessages(req,res)
})




http.listen(process.env.PORT || 8888, function() {
    console.log('listening on *:3000');
});