var express = require("express");
var bodyParser = require("body-parser");
var axios = require("axios");

console.log("starting server");

var app =  express();

app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", function(req, res) {
    res.send("Hello World Ankita!");
});

app.get("/setcookie", function(req, res){
    res.cookie('name', 'ankita');
    res.cookie('age',25);
    res.end();
});

app.get("/getcookie", function(req,res){
     console.log(req.headers.cookie);
     res.send(req.headers.cookie);
});

app.get("/robots.txt", function(req, res){
    res.status(403).end();
})

app.get("/html", function(req,res){
    res.send(
        `
        <html>
            <body>
                <div>
                    <h1>First Page</h1>
                    <p>This is my first paragraph in html</p>
                </div>
            </body>
        </html>
        `
        )
});

app.get("/input",function(req,res){
    res.send(
       ` 
        <html>
        <body>
            <h1>Form Submission</h1>
            <form  method="post">
                <input name="UserName" type="text"/>
                <input type="submit" value="OK"/>
            </form>
        </body>
        </html>
       `);
});

app.post("/input",function(req,res){
    res.send(
       ` 
        <html>
        <body>
            <h1>Recieved</h1>
        </body>
        </html>
       `);
    console.log(req.body.UserName);
});

app.get("/authors", function(req,res){
    axios
    .get("https://jsonplaceholder.typicode.com/users")
    .then(function(usersResponse) {
        axios
        .get("https://jsonplaceholder.typicode.com/posts")
        .then(function(postsResponse){
            console.log(usersResponse.data);
            console.log(postsResponse.data);
            var users = usersResponse.data;
            var posts = postsResponse.data;

            var authors = '';
            for(i = 0; i < users.length; i++) {
                var currentUser = users[i];

                var count = 0;
                for(k = 0; k < posts.length; k++) {
                    if(posts[k].userId == currentUser.id) {
                        count = count + 1;
                    }
                }

                authors = authors + '\n' + currentUser.name + ' ' +  count;
                
            }

            res.send(authors);
        });
    })
})

app.listen(8080,function(){
    console.log("started server");
});

