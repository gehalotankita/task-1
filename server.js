var express = require("express");
console.log("starting server");

var app =  express();

app.get("/", function(req, res) {
    res.send("Hello World Ankita!");
});

app.listen(8080,function() {
    console.log("starting server");
});