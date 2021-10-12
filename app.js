const loginModule = require('./model/login');
const registerModule = require('./model/register_user');
const userModule = require('./model/user');
//const forgetPasswordModule = require('./model/forget_password')
const gameListModule = require('./model/game_list')
const verifyToken = require('./token');
const bodyParser = require('body-parser');
const searchPlayersModule = require('./model/search_player');
const sendFriendRequestModule = require('./model/send_friend_request')

var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var MySQLEvents = require('mysql-events');
var events = MySQLEvents({
    host: "localhost",
    user: "root",
    password: ""
})

app.get('/', function(req, res) {
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


//app.use(bodyParser.urlencoded({extended : false}));
//app.use('/img/games', express.static('./img/games'))

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

// app.post("/forgetPassword", function (req, res) {
//    forgetPasswordModule.forgetPassword(req,res);
// });

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

const friendRequest = require('./model/friend_requests')
app.get('/friendRequests',  function (req, res) {
    friendRequest.getFriendRequests(req, res)
})

const addToFriendListModule = require('./model/addToFriendList')
app.post('/addToFriends', function (req, res) {
    addToFriendListModule.addToFriendList(req, res)
})

const friendListModule = require('./model/friendlist')
app.get('/friendlist', function (req, res) {
    friendListModule.getFriendList(req, res)
})

const chatModule = require('./model/chat')
app.post('/sendMessage',function (req, res) {
chatModule.sendMessage(req, res)
})

app.get('/getchats', function (req, res) {
    chatModule.getChats(req,res)
})

app.get('/getChatInfo', function (req, res) {
    chatModule.getChatInfo(req,res)
})

app.get('/getChatMessages', function (req, res) {
    chatModule.getMessages(req,res)
})




http.listen(process.env.PORT || 8888, function() {
    console.log('listening on *:3000');
});