var express = require("express");
var bodyParser = require('body-parser');
var userRoute = require("./routes/user.route")

var app = express();
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('db.json')
const db = low(adapter);
db.defaults({ users: []}).write();
app.set("view engine","pug");
app.set("views","./views")
var port=3000;

app.get("/",function(req,res)
{
    res.render("index",
    {
        name:"Coder Tokyo"
    })
});

app.use("/user/",userRoute);

app.listen(port,function()
{
    console.log("Server is listenning on port "+port);
})