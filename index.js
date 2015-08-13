var $ = require("jquery");
var ejs = require("ejs");
var express = require("express");
var app = express();

app.set("port",(process.env.PORT || 5000));
app.set('views', __dirname + '/ejs');
app.set('view engine', 'ejs');

var data = {
	title: "hello",
	}
data.array = [1,2,3];


app.get("/",function(req,res){
	console.log("dir name = " + __dirname);
	
	// load the template file, then render it with data
	res.render("template",data);	
});

app.listen(app.get("port"),function(){
	console.log("port = %s",app.get("port"));
});

