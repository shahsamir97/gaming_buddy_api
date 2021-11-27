import  io  from "https://cdn.socket.io/4.3.2/socket.io.esm.min.js";
const  socket = io("http://localhost:3000",{autoConnect: false});
socket.auth = {"username": "samir"};
socket.reconnect = true;
socket.connect();


var form = document.getElementById('form');
var input = document.getElementById('input');

form.addEventListener('submit', function(e) {
    e.preventDefault();
    if (input.value) {
        socket.emit('chat message', {message : input.value});
        input.value = '';
    }
});

socket.onAny((event, ...args) => {
    console.log(event, args);
});