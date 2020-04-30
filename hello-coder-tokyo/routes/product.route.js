var express = require('express')
var router = express.Router()

var productController =require("../controllers/product.controller")

router.get("", productController.viewProduct)

module.exports = router