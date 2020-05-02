var db = require("../db")

module.exports.requireLogin = function(req,res,next)
{
    if(!req.signedCookies.user)
    {
        res.redirect("/auth/login");
    }
    console.log(req.signedCookies.user)
    var user = db.get("users").find({"email":req.signedCookies.user}).value();
    if(!user)
    {
        res.redirect("/auth/login");
    }
    res.locals.user = user
    next();
}