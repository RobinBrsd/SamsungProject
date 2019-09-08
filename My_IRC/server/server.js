var express = require('express');  
var app = express();  
var server = require('http').createServer(app);  
var io = require('socket.io')(server);
const uuidv4 = require('uuid/v4');

var allRoom = ["Home", "Default"];
var allRoomActif = [{name:"Home", actif:0}, {name:"Default", actif:0}];
var allUser = [];
var allMessage = [];
var allDetailledUser = [];

var connectedUser = "";
var deleteRoom = "";

function checkRoom() {
    allRoomActif.forEach(function(room){
        if(room.actif === 0) {
            if(room.name !== "Home" && room.name !== 'Default') {
                let index = allRoom.indexOf(room.name);
                allRoom.splice(index, 1);
                let index2 = allRoomActif.findIndex(x => x.name === room.name);
                allRoomActif.splice(index2, 1);
            }
        }
    });

    allRoomActif.forEach(function(room){
        room.actif = 0;
    });
}
setInterval(checkRoom, 500000);

io.of("/home")
    .on("connection", socket => {
        // Set User Connected to the Server
        socket.on('pseudo', function(pseudo) {
            connectedUser = pseudo;
            allUser.push(pseudo);
        });

        // Change Logged User Pseudo
        socket.on('changePseudo', function(infos) {
            let index = allUser.indexOf(infos[0]);
            allUser.splice(index, 1);
            connectedUser = infos[1];
            allUser.push(infos[1]);
        });

        // Add a new Room to the Server
        socket.on('addRoom', function(infos) { 
            socket.join(infos[0]);
            let roomActif = { name:infos[0], actif:1}
            allRoom.push(infos[0]); 
            allRoomActif.push(roomActif);

            let d = new Date(Date.now());
            let h = d.getHours();
            let m = d.getMinutes();
            let date = h + "h" + m;
            const msg = {
                id: uuidv4(),
                date: date,
                room: 'all',
                user: "Infos System",
                message: infos[1] + " Created a Room Named : " + infos[0],
                to:'allUser',
            }
            allMessage.push(msg);
            socket.join(infos[0]);
        });

        // Delete a Room from the server
        socket.on('deleteRoom', function (infos) {
            let index = allRoom.indexOf(infos[0]);
            allRoom.splice(index, 1);

            let d = new Date(Date.now());
            let h = d.getHours();
            let m = d.getMinutes();
            let date = h + "h" + m;
            const msg = {
                id: uuidv4(),
                date: date,
                room: 'all',
                user: "Infos System",
                message: infos[1] + " Deleted a Room Named : " + infos[0],
                to:'allUser',
            }
            
            socket.leave(infos[0]);
            allMessage.push(msg);
            deleteRoom = infos[0];
            socket.emit("lastDeletedRoom", infos[0]);
        });

        // Return last Deleted Room to the client
        socket.on('getDeletedRoom', function(){ return socket.emit("lastDeletedRoom", deleteRoom); });

        // Return All Connected User to the Client
        socket.on('getAllUser', function() { return socket.emit("returnAllUser", allUser); });

        // Return All Room to the Client
        socket.on('getAllRoom', function() { return socket.emit("returnRoom", allRoom); });

        // Return Specified Room to the Client
        socket.on('listRoom', async function(val) {
            var listRoom = [];
            await allRoom.forEach(function(roomName) { 
                var pos = roomName.indexOf(val);
                if(pos >= 0)
                    listRoom.push(roomName);
            });
            return socket.emit("returnListRoom", listRoom); 
        });

        // Return User in specified room to the client
        socket.on('listRoomUser', function(room) {
            var listUser = [];
            allDetailledUser.forEach(function(user) {
                if(user.room === room)
                    listUser.push(user.username);
            });
            return socket.emit("returnRoomUser", listUser); 
        });

        // Clear
        socket.on('clearRoom', function(room) {
            allMessage.forEach(function(msg) {
                if(msg.room === room) {
                    let index = allMessage.findIndex(x => x.room === room);
                    if (index !== undefined)
                        allMessage.splice(index, 1);
                }
            });
        });

        // Return and Connect to the selected Room to the Client
        socket.on('connectToRoom', function(infos) {
            const user = {
                room: infos[0],
                username: infos[1],
            }
            allDetailledUser.forEach(function(user){
                if(user.username === infos[1]) {
                    let index = allDetailledUser.findIndex(x => x.username === infos[1]);
                    if (index !== undefined)
                        allDetailledUser.splice(index, 1);
                }
            });
            allDetailledUser.push(user);
            socket.leave(infos[0]);
            return socket.emit("returnConnectedRoom", infos[0]); 
        });

        // Return All Message in specified Room
        socket.on('getRoomMessages', function(room) {
            var msgs = [];
            allMessage.forEach(function(message) { 
                if(message.room === room || message.room === "all" || message.to !== 'allUser') {
                    msgs.push(message);
                } 
            });
            return socket.emit("returnRoomMessages", msgs);
        });

        // Get Message from the Client and set it 
        socket.on('sendMessage', function(infos) {
            let d = new Date(Date.now());
            let h = d.getHours();
            let m = d.getMinutes();
            let date = h + "h" + m;
            const msg = {
                id: uuidv4(),
                date: date,
                room: infos[2],
                user: infos[1],
                message:infos[0],
                to:infos[3],
            }
            allMessage.push(msg);
            
            allRoomActif.forEach(function(room){
                if(room.name === infos[2]) {
                    room.actif = 1;
                    return;
                }
            });
        });

        // Display System Message to warn an user Joined the current room
        socket.on('joinedRoom', function(infos) {
            let d = new Date(Date.now());
            let h = d.getHours();
            let m = d.getMinutes();
            let date = h + "h" + m;
            const msg = {
                id: uuidv4(),
                date: date,
                room: infos[0],
                user: "Infos System",
                message: infos[1] + " Joined the Room",
                to:'allUser',
            }
            allMessage.push(msg);
        });

        // Display System Message to warn an user Leaved the current room
        socket.on('leavedRoom', function(infos) {
            let d = new Date(Date.now());
            let h = d.getHours();
            let m = d.getMinutes();
            let date = h + "h" + m;
            const msg = {
                id: uuidv4(),
                date: date,
                room: infos[0],
                user: "Infos System",
                message: infos[1] + " Leaved the Room",
                to:'allUser',
            }
            allMessage.push(msg);
        });

        // On Disconnect Remove an User From the User List
        socket.on('disconnect', function (pseudo) {
            let index = allUser.indexOf(pseudo);
            allUser.splice(index, 1);
        });
    });

const port = process.env.PORT || 3001;
console.log("Server Running On Port : " + port);
io.listen(3001);