var env = require("dotenv").config()

var express = require("express");
var bodyParser = require('body-parser');
var userRoute = require("./routes/user.route")
var authRoute = require("./routes/auth.route")
var productRoute = require("./routes/product.route")
var sessionMiddleware = require("./middleware/session.middleware")
var authMiddleware = require("./middleware/auth.middleware")
var cookieParser = require('cookie-parser')
var cardRoute = require("./routes/cart.route")

var app = express();



app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static("publics"))
app.use(bodyParser.json())
app.use(cookieParser("env.process().SECRET_COOKIE"))
app.use(sessionMiddleware.session)
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('db.json')
const db = low(adapter);
db.defaults({ users: []},{sessions:[]}).write();
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

app.use("/products",productRoute)

app.use("/cart",cardRoute)

app.listen(port,function()
{
    console.log("Server is listening on port "+port);
})