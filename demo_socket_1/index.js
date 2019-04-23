const express = require('express');
var app = express();
app.use(express.static("./public"));
app.set('view engine','ejs');
app.set('views','./views');

var server =  require("http").Server(app);
var io = require('socket.io')(server)
server.listen(3000);
//lang nghe ket noi
io.on("connection",function(socket){
    console.log("Co nguoi ket noi:"+socket.id);
    //ngat ket noi
    socket.on("disconnect",function(){
        console.log(socket.id+" Ngat ket noi ")
    });
    //nhan data tu client
    socket.on("Client-send-data",function(data){
        console.log(data);

        //Gui data ve client
        // io.sockets.emit("Server-send-data",data+"8888");

        //Gui ve chinh client ban data
        // socket.emit("Server-send-data",data+"8888")

        //Gui data cho nhung client khac
        socket.broadcast.emit("Server-send-data",data+"8888")
    })
});

app.get('/',function(req,res){
    res.render('trangchu');
});