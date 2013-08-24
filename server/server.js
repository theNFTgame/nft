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
 
server.listen(8081);

console.log('Server running');
 
app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});
 
// 連線
io.sockets.on('connection', function (socket) {
 
    // 偵聽 send 事件
    socket.on('send', function (data) {
 
        // 然後我們依據 data.act 做不同的動作
        switch ( data.act )
        {
            // 這個是使用者打開手機網頁後發生的事件
            case "enter":
            io.sockets.emit('get_response', data);
            console.log("Sending getEnter");
            break;
 
            // 這個是使用者在手機網頁中點擊按鈕，讓電腦網頁背景變色的事件
            case "changebg":
            io.sockets.emit('get_response', data);
            console.log("Sending changeBg");
            break;
        }
 
    });
 
});