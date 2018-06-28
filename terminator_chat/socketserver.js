var express = require('express');
var socket = require('socket.io');
var app = express();

var server = app.listen(3000, (req, res) => {
    console.log('server listening at port 3000');

});
app.get('/', (req, res) => {
    res.end('hello world');
})
var io = socket(server);
io.on('connection', (socket) => {
    console.log('an user connected...', socket.id);

    socket.on('message', (msg) => {
        console.log(msg);
        // io.sockets.emit('chat', msg);//to send msg to all include sender
        socket.broadcast.emit('chat', msg); //excludes sender 
    });
    socket.on('newuser', name => {
        socket.broadcast.emit('newuser', name);
    });
    socket.on('disconnect', () => {
        console.log('disconnected');

    });
});