var db = require("../db")

module.exports.index = function(req,res)
{
    console.log(db.get("users").value());
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
    var data=req.body;
    console.log(data);
    var errors=[];
    if(data.name == null || data.name == "" )
    {
        errors.push("Tên cần được điền");
    }
    
    if(data.phone == null || data.phone == "" )
    {
        errors.push("Số điện thoại cần được điền");
    }

    if(errors.length<=0)
    {
        db.get("users").push(req.body).write();
        res.redirect("/user");
    }
    res.render("users/create",{
        "errors":errors,
        "value":data
    })
}

module.exports.view = function(req,res){
    var phone= (req.params.phone);
    var user=db.get("users").find({"phone":phone}).value();
    res.render("users/view",{user:user});
}