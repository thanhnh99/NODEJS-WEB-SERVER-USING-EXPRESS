var db = require("../db")

module.exports.viewProduct = function(req,res)
{
    var page = req.query.page || 1;
    var perPage = 9

    var start = (page-1)*perPage;
    var end = page*perPage;
    var products = db.get("products").value().slice(start,end);
    res.render("product/product",{
        products:products
    })
}
