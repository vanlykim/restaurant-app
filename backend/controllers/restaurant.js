const asyncHandler = require("express-async-handler");

// @desc    Get restaurants
// @route   GET /api/restaurants
// @access  Public
const getRestaurants = asyncHandler(async (req, res) => {
  res.send("Get restaurants");
});

module.exports = {
  getRestaurants,
};
