var express = require('express')
var router = express.Router()

var userController = require("../controllers/user.controller")

router.get("/",userController.index);

router.get("/search",userController.search);


router.get('/:phone',userController.view)



module.exports = router;