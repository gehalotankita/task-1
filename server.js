var express = require("express");
console.log("starting server");

var app =  express();

app.get("/", function(req, res) {
    res.send("Hello World Ankita!");
});

app.get("/setcookie", function(req, res){
    res.cookie('name', 'ankita');
    res.cookie('age',25);
    res.end();
});


app.listen(8080,function(){
    console.log("starting server");
});

