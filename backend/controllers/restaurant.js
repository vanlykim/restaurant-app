const asyncHandler = require("express-async-handler");
const { Op } = require("sequelize");
const { Restaurant, OpeningHour } = require("../models");

// @desc    Get restaurants
// @route   GET /api/restaurants
// @access  Public
const getRestaurants = asyncHandler(async (req, res) => {
  const { q, w, t } = req.query;
  const restaurants = await Restaurant.findAll({
    where: {
      name: { [Op.iLike]: `%${q}%` },
      $weekday$: w,
      $open$: { [Op.lte]: t },
      $close$: { [Op.gte]: t },
    },
    include: [
      {
        model: OpeningHour,
        required: false,
      },
    ],
  });
  res.status(200).json(restaurants);
});

module.exports = {
  getRestaurants,
};
