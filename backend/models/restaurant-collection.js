"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class RestaurantCollection extends Model {
    static async isRestaurantCollectionExist(restaurantId, collectionId) {
      const restaurantCollection = await this.findOne({
        where: { restaurant_id: restaurantId, collection_id: collectionId },
      });
      return !!restaurantCollection;
    }
  }
  RestaurantCollection.init(
    {
      collection_id: DataTypes.INTEGER,
      restaurant_id: DataTypes.INTEGER,
    },
    {
      underscored: true,
      sequelize,
      modelName: "RestaurantCollection",
      freezeTableName: true,
    }
  );
  return RestaurantCollection;
};
