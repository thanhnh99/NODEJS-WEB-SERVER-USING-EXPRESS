var express = require("express")
var db = require("../db")

module.exports.getLogin = function(req,res)
{
    res.render("auth/login",{
        
})
}

module.exports.postLogin = function(req,res)
{
    var errs=[];
    if(!req.body.username || req.body.username=="")
    {
        errs.push("User name is required");
    }

    if(!req.body.password || req.body.password=="")
    {
        errs.push("Password is required");
    }
    if(errs.length>0)
    {
        res.render("auth/login",{
            errors:errs,
            value:req.body
        })
    }
    var user = db.get("users").find({"username":req.body.username}).value();
    if(!user)
    {
        errs.push("User does not exist!!!")
        res.render("auth/login",{
            errors:errs,
            value:req.body
        })
    }
    if(!(user.password == req.body.password))
    {
        errs.push("Wrong Password")
        res.render("auth/login",{
            errors:errs,
            value:req.body
        })
    }

    res.cookie("user", user.username)
    res.redirect("/user")


}