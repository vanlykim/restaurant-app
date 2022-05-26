const express = require("express");
const router = express.Router();
const { getRestaurants } = require("../controllers/restaurant");

router.route("/").get(getRestaurants);

module.exports = router;
