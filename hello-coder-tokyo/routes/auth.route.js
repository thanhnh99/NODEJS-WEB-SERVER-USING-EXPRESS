var express = require("express");
var router = express.Router();
var userValidate= require("../validate/user.validate")
var controller = require("../controllers/auth.controller")
var userValidate = require("../validate/user.validate")
var multer = require("multer")
var upload = multer({ dest: './publics/uploads/' })

router.get("/login",controller.getLogin);
router.post("/login",controller.postLogin);
router.get('/register',controller.getRegister)
router.post("/register",upload.single("avatar"),userValidate.postRegister,controller.postRegister)
module.exports = router;