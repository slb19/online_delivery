const express = require("express");
const router = express.Router();
const foodsControllers = require("../controllers/foods.js")

router.get("/foods", foodsControllers.getAllFoods)

module.exports = router