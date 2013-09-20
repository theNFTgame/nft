//test case
//test case
//test case
//test case
//test case
//test case
var express = require("express"),
    app = express(),
    http = require("http"),
    server = http.createServer(app),
    io = require('socket.io').listen(server);
 
server.listen(8082);

console.log('Server running');
 
app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});
 

io.sockets.on('connection', function (socket) {
 
    // listen send event
    socket.on('send', function (data) {
 
        // do some thing base on data.act\
        switch ( data.act )
        {
            // this for mobile open page
            case "enter":
                socket.join(data.key);
                io.sockets.emit('get_response', data);
                console.log("Sending getEnter @room:" + data.key);
            break;

            // this for mobile open page
            case "pcenter":
                socket.join(data.key);
                console.log("pc get Enter @room:" + data.key);
            break;
 
            // this for mobile shaking
            case "changebg":
                io.sockets.in(data.key).emit('get_response', data);
                console.log("Sending changeBg @room:" + data.key);
            break;
        }
 
    });
 
});