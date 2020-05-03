var db = require("../db")

module.exports.getCard = function(req,res)
{
    var data = db.get("sessions")
                    .find({id : req.signedCookies.sessionId})
                    .value();
    var carts=[]
    for(cart in data)
    {
        if(cart!="id")
        {
            var product_name=(db.get("products").find({id : cart.slice(4)}).value().product_name);
            carts.push({"product_name":product_name,
                        "amount":data[cart]});
        }
        // console.log(cart, data[cart]);
    }
    res.render("cart/cart",
    {
        data : carts 
    })
}


module.exports.addToCard = function(req,res)
{
    var productId = req.params.productId;
    var sessionId = req.signedCookies.sessionId;

    if(!sessionId)
    {
        res.redirect("/products")
        return;
    }

    var count = db.get("sessions")
                    .find({"id":sessionId})
                    .get("cart." +productId,0)
                    .value();
    db.get("sessions")
        .find({"id":sessionId})
        .set("cart" + productId,count+1)
        .write();
    res.redirect("/products")
}