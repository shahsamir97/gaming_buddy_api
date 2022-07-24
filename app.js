const loginModule = require('./model/login');
const registerModule = require('./model/register_user');
const userModule = require('./model/user');
//const forgetPasswordModule = require('./model/forget_password')
const gameListModule = require('./model/game_list')
const verifyToken = require('./token');
const bodyParser = require('body-parser');
const searchPlayersModule = require('./model/search_player');
const sendFriendRequestModule = require('./model/send_friend_request')
const utils = require('./utils/utils')

const { ConnectedUserStore } = require('./scripts/connected_userStore')
const connectedUserStore = new ConnectedUserStore()

var server = require('express')();
var http = require('http').Server(server);
var io = require('socket.io')(http, {
    cors : ["http://localhost:63342"]
});

server.get('/', function(req, res) {
    res.sendFile(__dirname + '/view/index.html');
});

io.use((socket, next)=>{
    const username  = socket.handshake.auth.username;
    if(!username){
        console.log("Invalid username!");
        return next(new Error("Invalid Username"));
    }
    console.log(socket.id);
    connectedUserStore.addUser(username, socket.id)
    socket.username = username;
    next();
})

io.on('connection', function(socket) {
    console.log('A user connected');
    console.log("--------------Connected Users")
    connectedUserStore.users.forEach(function (key, value){
        console.log(value)
    })
    console.log("--------------")


    socket.on('chat message', (msg) => {
        const roomId = connectedUserStore.findUser("shah")
        if (roomId){
            console.log(roomId + "rrom ID")
            socket.to(roomId).emit('chat message',{message : msg})
        }

    });

    socket.onAny((event, ...args) => {
        console.log(event, args);
    });

    //Send a message after a timeout of 4seconds
    setTimeout(function() {
        socket.send('Sent a message 4seconds after connection!');
    }, 4000);

    socket.on('disconnect', function () {
       console.log(socket.username + " disconnected")
        connectedUserStore.removeUser(socket.username)
        //logging
        utils.connectedUserLog(connectedUserStore.users)
    });
});


server.use(bodyParser.urlencoded({extended : false}));
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

http.listen( process.env.PORT || 3000, function() {
    console.log('listening on *:3000');
});