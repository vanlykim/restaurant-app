const asyncHandler = require("express-async-handler");
const { Op } = require("sequelize");
const { RestaurantCollection, Collection } = require("../models");

// @desc    Create new restaurant collection
// @route   POST /api/restaurant-collections
// @access  Private
const createRestaurantCollection = asyncHandler(async (req, res) => {
  const { restaurantId, collectionId } = req.body;
  if (!restaurantId || !collectionId) {
    res.status(400);
    throw new Error("Please add all fields");
  }
  const restaurantCollection = await RestaurantCollection.create({
    restaurant_id: restaurantId,
    collection_id: collectionId,
  });
  if (restaurantCollection) {
    res.status(201).json(restaurantCollection);
  } else {
    res.status(400);
    throw new Error("Invalid collection data");
  }
});

// @desc    Get all restaurant collections
// @route   GET /api/restaurant-collections
// @access  Private
const getRestaurantCollections = asyncHandler(async (req, res) => {
  const userCollections = await Collection.findAll({
    attributes: ["id"],
    where: { user_id: req.user.id },
    raw: true,
  });
  const restaurantCollection = await RestaurantCollection.findAll({
    where: {
      collection_id: {
        [Op.in]: userCollections.map((collection) => collection.id),
      },
    },
  });
  res.status(200).json(restaurantCollection);
});

// @desc    Delete restaurant collection
// @route   DELETE /api/restaurant-collections/:restaurantId/:collectionId
// @access  Private
const deleteRestaurantCollection = asyncHandler(async (req, res) => {
  const { restaurantId, collectionId } = req.params;
  if (
    !(await RestaurantCollection.isRestaurantCollectionExist(
      restaurantId,
      collectionId
    ))
  ) {
    res.status(400);
    throw new Error("Restaurant collection not found");
  }
  const restaurantCollection = await RestaurantCollection.destroy({
    where: { restaurant_id: restaurantId, collection_id: collectionId },
  });
  if (restaurantCollection) {
    res.status(200).json({
      message: "Restaurant collection deleted",
      restaurantId: parseInt(restaurantId),
      collectionId: parseInt(collectionId),
    });
  } else {
    res.status(400);
    throw new Error("Invalid restaurant collection data");
  }
});

module.exports = {
  createRestaurantCollection,
  getRestaurantCollections,
  deleteRestaurantCollection,
};
