const express = require("express");
const router = express.Router();
const {
  createRestaurantCollection,
  getRestaurantCollections,
  deleteRestaurantCollection,
} = require("../controllers/restaurant-collection");

router
  .route("/")
  .post(createRestaurantCollection)
  .get(getRestaurantCollections);
router.route("/:restaurantId/:collectionId").delete(deleteRestaurantCollection);

module.exports = router;
