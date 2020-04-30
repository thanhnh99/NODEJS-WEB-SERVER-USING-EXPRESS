var express = require("express");
var bodyParser = require('body-parser');
var userRoute = require("./routes/user.route")
var authRoute = require("./routes/auth.route")
var authMiddleware = require("./middleware/auth.middleware")
var cookieParser = require('cookie-parser')

var app = express();



app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static("publics"))
app.use(bodyParser.json())
app.use(cookieParser("you are hacker???"))

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

app.use("/user/",authMiddleware.requireLogin,userRoute);

app.use("/auth/",authRoute);

app.listen(port,function()
{
    console.log("Server is listening on port "+port);
})