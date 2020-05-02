var md5 = require("md5")
var db = require("../db")
const shortid = require('shortid');


module.exports.getLogin = function(req,res)
{
    res.render("auth/login",{
        errors:[]
        
    })
}

module.exports.postLogin = function(req,res)
{
    var errs=[];
    if(!req.body.email || req.body.email=="")
    {
        errs.push("Email is required");
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
    var user = db.get("users").find({"email":req.body.email}).value();
    if(!user)
    {
        errs.push("User x not exist!!!")
        res.render("auth/login",{
            errors:errs,
            value:req.body
        })
    }
    var hashPassword = md5(req.body.password);
    if(!(user.password == hashPassword))
    {
        errs.push("Wrong Password")
        res.render("auth/login",{
            errors:errs,
            value:req.body
        })
    }

    res.cookie("user", user.email,{
        signed:true
    })
    res.redirect("/user")


}

module.exports.getRegister = function(req,res)
{
    res.render("auth/register")
}

module.exports.postRegister = function(req,res)
{
    if(db.get("users").find({"email": req.body.email}).value())
    {
        var errors=[]
        errors.push("User existed")
        res.render("auth/register",{
            errors:errors
        })
    }
    var data={};
    data.email= req.body.email;
    data.password = md5(req.body.password);
    data.avatar= req.file.path.split("\\").slice(1).join("/");
    data.id=shortid.generate();
    db.get("users").push(data).write();
    res.redirect("/auth/login")
}
