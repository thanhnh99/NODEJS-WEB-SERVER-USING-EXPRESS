var express = require('express')
var router = express.Router()

var db = require("../db")

router.get("/",function(req,res)
{
    console.log(db.get("users").value());
    res.render("users/users",{
        data:[
            {"users":db.get("users").value()},
            {"q":""}]
    })
});


router.get("/search",function(req,res){
    var q=req.query.q;
    var searchUsers=db.get("users").value().filter(function(user){
        return user.name.toLowerCase().indexOf(q.toLowerCase()) !==-1;
    });

    res.render("users/users",{
        data:[
            {"users":searchUsers},
            {"q":q}]
        
    });
});

router.get("/create",function(req,res){
     res.render("users/create");
})

router.post("/create",function(req,res)
{
    var name = req.body;
    db.get("users").push(name).write();
    res.redirect("/user");
})
router.get('/:id',function(req,res){
    var id= parseInt(req.params.id);
    var user=db.get("users").find({"id":id}).value();
    console.log(user);
    res.render("users/view",{user:user});
})

module.exports = router;