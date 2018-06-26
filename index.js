console.log("Starting server...");

// Import modules
var express = require('express');
var path = require('path');

// Initialize the application and socket IO connections
var app = express();

// Import game file here. 

app.use(express.static('framework'));
  

var server = require('http').createServer(app).listen(process.env.PORT || 8080);

// Create the Socket.IO server and attach it to the HTTP server
var io = require('socket.io').listen(server);

var playerSocket = null;

io.of("/player").on('connection', function(socket) {
    console.log('The player connected');

    playerSocket = socket; 

    //Whenever someone disconnects this piece of code executed
    socket.on('disconnect', function () {
       console.log('The player disconnected');
    });
});

io.of("/controller").on('connection', function(socket) {
    console.log('A controller connected');

    socket.on('load game', function(msg) {
        console.log("loading game: " + msg);
        if (playerSocket != null) {
            playerSocket.emit('load game', msg);
        }
    });

    socket.on('disconnect', function () {
        console.log('A controller disconnected.');
    })
});