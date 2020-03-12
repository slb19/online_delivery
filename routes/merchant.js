const express = require("express");
const router = express.Router();
const merchantControllers = require("../controllers/merchant.js")

const auth = require('../middleware/auth.js')

router.post("/admin/login", merchantControllers.postLogin)
router.get("/admin/getAllOrders", auth, merchantControllers.getAllOrders)
router.get("/admin/getAllOrders/:orderId",auth, merchantControllers.getAllOrdersById)

module.exports = router