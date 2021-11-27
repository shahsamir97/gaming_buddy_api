exports.connectedUserLog = function (users) {
    console.log("--------------Connected Users")
    users.forEach(function (key, value){
        console.log(value)
    })
    console.log("--------------")
}