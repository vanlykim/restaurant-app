const express = require("express");
const router = express.Router();
const {
  createCollection,
  getCollections,
  updateCollection,
  deleteCollection,
} = require("../controllers/collection");
const { protect } = require("../middlewares/authMiddleware");

router.route("/").post(protect, createCollection).get(protect, getCollections);
router
  .route("/:id")
  .put(protect, updateCollection)
  .delete(protect, deleteCollection);

module.exports = router;
