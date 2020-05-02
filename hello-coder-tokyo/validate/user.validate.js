module.exports.postRegister = function(req,res,next)
{
    var data=req.body;
    var errors=[];
    if(req.body.email == null || req.body.email == "" )
    {
        errors.push("Email is require");
    }
    
    if(req.body.password == null || req.body.password == "" )
    {
        errors.push("Password is require");
    }

    if(!req.file)
    {
        errors.push("Avatar is require");
    }
    if(errors.length)
    {
        res.render("auth/register",{
            "errors":errors,
            "value":data
        })
        return;
    }
    
    next();
}