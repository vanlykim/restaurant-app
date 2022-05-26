const asyncHandler = require("express-async-handler");

// @desc    Create new restaurant collection
// @route   POST /api/restaurant-collections
// @access  Private
const createRestaurantCollection = asyncHandler(async (req, res) => {
  res.send("Create new restaurant collection");
});

// @desc    Get all restaurant collections
// @route   GET /api/restaurant-collections
// @access  Private
const getRestaurantCollections = asyncHandler(async (req, res) => {
  res.send("Get all restaurant collections");
});

// @desc    Delete restaurant collection
// @route   DELETE /api/restaurant-collections/:restaurantId/:collectionId
// @access  Private
const deleteRestaurantCollection = asyncHandler(async (req, res) => {
  res.send("Delete restaurant collection");
});

module.exports = {
  createRestaurantCollection,
  getRestaurantCollections,
  deleteRestaurantCollection,
};
