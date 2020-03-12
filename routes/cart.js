const express = require("express");
const router = express.Router();

const cartControllers = require("../controllers/cart.js")

router.get("/getToken", cartControllers.getGetToken)
router.get("/fetchCart", cartControllers.getFetchCart)
router.post("/addToCart", cartControllers.postAddToCart)

module.exports = router