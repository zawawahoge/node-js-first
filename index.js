var $ = require("jquery");
console.log("hello");
var express = require("express");
var app = express();

app.set("port",(process.env.PORT || 5000));

app.get("/",function(req,res){
	res.send("hello");	
});

app.listen(3000,function(){
	console.log("port = %s",app.get("port"));
});