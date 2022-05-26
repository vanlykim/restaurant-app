const express = require("express");
const router = express.Router();
const {
  createRestaurantCollection,
  getRestaurantCollections,
  deleteRestaurantCollection,
} = require("../controllers/restaurant-collection");
const { protect } = require("../middlewares/authMiddleware");

router
  .route("/")
  .post(protect, createRestaurantCollection)
  .get(protect, getRestaurantCollections);
router
  .route("/:restaurantId/:collectionId")
  .delete(protect, deleteRestaurantCollection);

module.exports = router;
