var express = require("express")
var cardController = require("../controllers/cart.controller")
var router = express.Router();

router.get("", cardController.getCard)
router.get("/add/:productId", cardController.addToCard) 

module.exports = router;