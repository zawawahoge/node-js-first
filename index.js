var $ = require("jquery");
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

io.on("connection", function(socket){
	console.log("get a client!");
	socket.on("disconnect",function(){
		console.log("client disconnected");
	});
	socket.on("chat message", function(data){
		var s = data.nickname + " さん:"+data.message;
		io.emit("chat message",s);
	});
});

http.listen(app.get("port"),function(){
	console.log("port = %s",app.get("port"));
});

