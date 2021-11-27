
class ConnectedUserOperations{
    findUser(username){}
    addUser(username, socketId){}
    removeUser(username){}
}

class ConnectedUserStore extends ConnectedUserOperations{
    constructor() {
        super();
        this.users = new Map();
    }

    findUser(username) {
        return this.users.get(username)
    }

    addUser(username, socketId) {
        this.users.set(username, socketId)
        console.log(username + " added to connected user")
    }

    removeUser(username) {
        this.users.delete(username)
        console.log(username + " removed")
    }
}

module.exports = {
   ConnectedUserStore
}