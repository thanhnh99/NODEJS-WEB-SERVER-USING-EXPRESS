var express = require("express");

var app = express();

var port=3000;

app.get("/",function(req,res)
{
    res.send("<h1>Hello Coder-Tokyo");
});

app.listen(port,function()
{
    console.log("Server is listenning on port "+port);
})