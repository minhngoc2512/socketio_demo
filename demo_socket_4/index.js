const express = require('express');
var app = express();
app.use(express.static("./public"));
app.set('view engine','ejs');
app.set('views','./views');

var server =  require("http").Server(app);
var io = require('socket.io')(server);

var mangUser=["AAA"];

io.on("connection",function(socket){
    console.log("Co nguoi ket noi:"+ socket.id);
    // lay danh dach rooms
    // console.log(socket.adapter.rooms);
    socket.on("tao-room",function(data){
        console.log(data);
        socket.join(data);
        socket.Phong = data;
        // console.log(socket.adapter.rooms);
        var mang = [];
        for(r in socket.adapter.rooms){
            mang.push(r);
        }
        io.sockets.emit("server-send-rooms",mang);
        socket.emit("server-send-room-socket",data);

    });
    //nhan message
    socket.on("user-chat",function(data){
        //gui message cho user trong phong
        io.sockets.in(socket.Phong).emit("server-chat",data);
    })
});

server.listen(3000);
console.log("Start port 3000");
app.get('/',function(req,res){
    res.render('trangchu');
});