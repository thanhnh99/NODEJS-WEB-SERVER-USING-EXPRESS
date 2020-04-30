var express = require('express')
var router = express.Router()

var userController = require("../controllers/user.controller")
var userValidate = require("../validate/user.validate")
router.get("/",userController.index);

router.get("/search",userController.search);


router.get("/create",userController.getCreate)


router.post("/create",userValidate.postCreate,userController.postCreate)
router.get('/:phone',userController.view)



module.exports = router;