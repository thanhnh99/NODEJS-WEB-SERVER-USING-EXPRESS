var express = require('express')
var router = express.Router()

var db = require("../db")
var userController = require("../controllers/user.controller")
router.get("/",userController.index);

router.get("/search",userController.search);


router.get("/create",userController.getCreate)

router.post("/create",userController.postCreate)
router.get('/:phone',userController.view)

module.exports = router;