const asyncHandler = require("express-async-handler");
const { Collection } = require("../models");

// @desc    Create new collection
// @route   POST /api/collections
// @access  Private
const createCollection = asyncHandler(async (req, res) => {
  const { name } = req.body;
  if (!name) {
    res.status(400);
    throw new Error("Please add collection name");
  }
  if (await Collection.isCollectionNameExist(name, req.user.id)) {
    res.status(400);
    throw new Error("Collection name exists");
  }
  const collection = await Collection.create({
    name,
    user_id: req.user.id,
  });
  if (collection) {
    collection.dataValues.restaurants = [];
    res.status(201).json(collection);
  } else {
    res.status(400);
    throw new Error("Invalid collection data");
  }
});

// @desc    Get all collections
// @route   GET /api/collections
// @access  Private
const getCollections = asyncHandler(async (req, res) => {
  const collection = await Collection.findAll({
    where: {
      user_id: req.user.id,
    },
    order: [["createdAt", "ASC"]],
  });
  res.status(200).json(collection);
});

// @desc    Update collection
// @route   PUT /api/collections/:id
// @access  Private
const updateCollection = asyncHandler(async (req, res) => {
  const { name } = req.body;
  if (!name) {
    res.status(400);
    throw new Error("Please add collection name");
  }
  if (!(await Collection.isCollectionExist(req.params.id))) {
    res.status(400);
    throw new Error("Collection not found");
  }
  const collection = await Collection.update(
    { name },
    {
      where: { id: req.params.id },
      raw: true,
      returning: true,
      plain: true,
    }
  );
  if (collection) {
    res.status(200).json(collection);
  } else {
    res.status(400);
    throw new Error("Invalid collection data");
  }
});

// @desc    Delete collection
// @route   DELETE /api/collections/:id
// @access  Private
const deleteCollection = asyncHandler(async (req, res) => {
  if (!(await Collection.isCollectionExist(req.params.id))) {
    res.status(400);
    throw new Error("Collection not found");
  }
  const collection = await Collection.destroy({
    where: { id: req.params.id },
  });
  if (collection) {
    res.status(200).json({ message: "Collection deleted" });
  } else {
    res.status(400);
    throw new Error("Invalid collection data");
  }
});

module.exports = {
  createCollection,
  getCollections,
  updateCollection,
  deleteCollection,
};
