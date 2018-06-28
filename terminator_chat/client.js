var io = require('socket.io-client');
var socket = io('http://localhost:3000');
socket.once('connect', () => {

});
var user;

const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
rl.question('whats your name:', (name) => {
    user = name;
    console.log('>>____ hi,' + name + '_____<<');

    socket.emit('newuser', name);

});

rl.on('line', (msg) => {
    rl.clearLine();
    console.log(`you>>${msg}`);
    // rl.cursorTo(process.stdout, 0);
    socket.emit('message', {
        name: user,
        msg: msg
    });
});
socket.on('chat', (msg) => {
    if (user)
        console.log(msg.name + '>>' + msg.msg);

});
socket.on('newuser', name => {
    if (user)
        console.log(name + " joined into chat");
})