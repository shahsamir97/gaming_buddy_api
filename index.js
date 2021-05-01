var express = require('express');
var loginModule = require('./model/login')
const bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.json());

app.get("/user",async function (req, res) {
    loginModule.getUserData(res)
});

app.listen(3000);