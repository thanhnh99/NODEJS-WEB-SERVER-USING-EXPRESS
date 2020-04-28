var express = require('express')
var router = express.Router()

var db = require("../db")
var userController = require("../controllers/user.controller")
var userValidate = require("../validate/user.validate")
router.get("/",userController.index);

router.get("/search",userController.search);


router.get("/create",userController.getCreate)

router.post("/create",userValidate.postCreate,userController.postCreate)
router.get('/:phone',userController.view)


router.get("/cookie",function(req,res,next){
    res.cookie("user-id",12345);
    res.send(" Hello ");
})
module.exports = router;