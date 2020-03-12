const express = require("express");
const router = express.Router();
const { check } = require('express-validator')

const ordersControllers = require("../controllers/orders.js")

router.post("/createOrder", [check("Fullname", "Fullname must be less than 60 characters").isLength({max:60}),
                                check("EmailAddress", "This is not a valid Email").isEmail()] ,ordersControllers.postCreateOrder)

router.post("/changeCurrency/:price", ordersControllers.postChangeCurrency)

module.exports = router
                                                                                                                                
