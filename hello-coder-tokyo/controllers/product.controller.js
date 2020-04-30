var db = require("../db")

module.exports.viewProduct = function(req,res)
{
    var page = parseInt(req.query.page) || 1;
    var perPage = 9

    var start = (page-1)*perPage;
    var end = page*perPage;
    var products = db.get("products").value().slice(start,end);

    var paging = [];
    
    paging.push(page-1);
    paging.push(page);
    paging.push(page+1);
    console.log(paging)


    res.render("product/product",{
        products:products,
        paging:paging
    })
}
