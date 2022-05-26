"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class OpeningHour extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  OpeningHour.init(
    {
      weekday: DataTypes.INTEGER,
      open: DataTypes.TIME,
      close: DataTypes.TIME,
      restaurant_id: DataTypes.INTEGER,
    },
    {
      underscored: true,
      sequelize,
      modelName: "OpeningHour",
      freezeTableName: true,
    }
  );
  return OpeningHour;
};
