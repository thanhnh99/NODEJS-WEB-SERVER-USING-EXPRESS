module.exports.postCreate = function(req,res,next)
{
    var data=req.body;
    var errors=[];
    if(req.body.name == null || req.body.name == "" )
    {
        errors.push("Tên cần được điền");
    }
    
    if(req.body.phone == null || req.body.phone == "" )
    {
        errors.push("Số điện thoại cần được điền");
    }

    if(errors.length)
    {
        res.render("users/create",{
            "errors":errors,
            "value":data
        })
    }
    
    next();
}