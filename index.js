
var ejs = require("ejs");
var express = require("express");
var app = express();

var http = require("http").Server(app);
var io = require("socket.io")(http);

app.set("port",(process.env.PORT || 5000));
app.set('views', __dirname + '/ejs');
app.set('view engine', 'ejs');




app.get("/",function(req,res){
	res.sendfile("index.html");	
});

var clients = [];
var msgList = [];

io.on("connection", function(socket){
	var clientIp = socket.handshake.address;
	clients.push(clientIp);
	console.log("get a client!");
	io.emit("change clients",clients);
	socket.emit("init",msgList);

	socket.on("disconnect",function(){
		clients.splice(clients.indexOf(socket.id),1);
		io.emit("change clients",clients);
		console.log("client disconnected");
	});
	
	
	socket.on("chat message", function(data){
		if(data.nickname=="")data.nickname = "名無し";
		var s = data.nickname + " さん:"+data.message;
		
		msgList.push(s);
		if(msgList.length > 10) msgList.shift();
		io.emit("chat message",s);
	});
});

http.listen(app.get("port"),function(){
	console.log("port = %s",app.get("port"));
});

