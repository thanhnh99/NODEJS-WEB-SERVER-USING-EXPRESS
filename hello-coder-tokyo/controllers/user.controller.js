var db = require("../db")

module.exports.index = function(req,res)
{
    console.log(req.signedCookies.user)
    res.render("users/users",{
            "users":db.get("users").value(),
            "q":""
    })
}

module.exports.search = function(req,res)
{
    var q=req.query.q;
    var searchUsers=db.get("users").value().filter(function(user){
        return user.name.toLowerCase().indexOf(q.toLowerCase()) !==-1;
    });
    res.render("users/users",{
        "users":searchUsers,
        "q":q
    })
}


module.exports.getCreate = function(req,res){
    res.render("users/create");
}

module.exports.postCreate = function(req,res)
{ 
    db.get("users").push(req.body).write();
        res.redirect("/user");
}


module.exports.view = function(req,res){
    var phone= (req.params.phone);
    var user=db.get("users").find({"phone":phone}).value();
    res.render("users/view",{user:user});
}