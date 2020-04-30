var db = require("../db")

module.exports.requireLogin = function(req,res,next)
{
    if(!req.cookies.user)
    {
        res.redirect("/auth/login");
    }
    console.log(req.cookies.user)
    var user = db.get("users").find("username",req.cookies.user).value();
    console.log(user)
    if(!user)
    {
        res.redirect("/auth/login");
    }

    next();
}