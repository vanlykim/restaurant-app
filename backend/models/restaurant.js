"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Restaurant extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.OpeningHour);
    }
  }
  Restaurant.init(
    {
      name: DataTypes.STRING,
    },
    {
      underscored: true,
      sequelize,
      modelName: "Restaurant",
      freezeTableName: true,
    }
  );
  return Restaurant;
};
