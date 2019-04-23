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
    socket.on("client-send-Username",function(data){
        if(mangUser.indexOf(data)>=0){
            //fail
            socket.emit("server-send-dki-thatbai");
        }else{
            //true
            mangUser.push(data);
            socket.Username = data;
            socket.emit("server-send-dki-thanhcong",data);
            io.sockets.emit("server-send-danhsach-Users",mangUser);
        }
    });
    socket.on("logout",function(){
        mangUser.splice(mangUser.indexOf(socket.Username),1);
        console.log("logout");
        socket.broadcast.emit("co-nguoi-logout",mangUser)
    })
    socket.on("user-sendmeassage",function(data){
        io.sockets.emit("server-send-message",{un:socket.Username,nd:data})
    });
});

server.listen(3000);
console.log("Start port 3000");
app.get('/',function(req,res){
    res.render('trangchu');
});