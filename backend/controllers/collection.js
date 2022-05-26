const asyncHandler = require("express-async-handler");

// @desc    Create new collection
// @route   POST /api/collections
// @access  Private
const createCollection = asyncHandler(async (req, res) => {
  res.send("Create new collection");
});

// @desc    Get all collections
// @route   GET /api/collections
// @access  Private
const getCollections = asyncHandler(async (req, res) => {
  res.send("Get all collections");
});

// @desc    Update collection
// @route   PUT /api/collections/:id
// @access  Private
const updateCollection = asyncHandler(async (req, res) => {
  res.send("Update collection");
});

// @desc    Delete collection
// @route   DELETE /api/collections/:id
// @access  Private
const deleteCollection = asyncHandler(async (req, res) => {
  res.send("Delete collection");
});

module.exports = {
  createCollection,
  getCollections,
  updateCollection,
  deleteCollection,
};
