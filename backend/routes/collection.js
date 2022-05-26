const express = require("express");
const router = express.Router();
const {
  createCollection,
  getCollections,
  updateCollection,
  deleteCollection,
} = require("../controllers/collection");

router.route("/").post(createCollection).get(getCollections);
router.route("/:id").put(updateCollection).delete(deleteCollection);

module.exports = router;
