var socket = io("http://localhost:3000");

socket.on("server-send-dki-thatbai",function(){
    alert("Sai user name(Co nguoi da dang ki)")
})

socket.on("server-send-danhsach-Users",function(data){
    $('#boxContent').html("");
    data.forEach(function(i){
        $("#boxContent").append(" <div class='useonLine'>"+i+"</div>")
    })
})

socket.on("co-nguoi-logout",function(data){
    $('#boxContent').html("");
    data.forEach(function(i){
        $("#boxContent").append(" <div class='useonLine'>"+i+"</div>")
    })
})

socket.on("server-send-dki-thanhcong",function(data){
   $("#currentUser").html(data);
    $("#loginForm").hide();
    $("#chatForm").show(1000);

});

socket.on("server-send-message",function(data){
    $("#listMessage").append("<div class='ms'>"+data.un+":"+data.nd+"</div>");
});


$(document).ready(function(){
    $("#loginForm").show();
    $("#chatForm").hide();
    $("#btnRegister").click(function(){
        socket.emit("client-send-Username",$("#txtUserName").val());
    });

    $("#btnLogout").click(function(){
        socket.emit("logout");
        $("#chatForm").hide(1000);
        $("#loginForm").show(2000);

    });
    $("#btnSendMessage").click(function(){
        socket.emit("user-sendmeassage",$("#txtMessage").val())
    })
});