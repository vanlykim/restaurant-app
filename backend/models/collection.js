"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Collection extends Model {
    static async isCollectionNameExist(name, userId) {
      const collection = await this.findOne({
        where: { name, user_id: userId },
      });
      return !!collection;
    }
    static async isCollectionExist(id) {
      const collection = await this.findByPk(id);
      return !!collection;
    }
  }
  Collection.init(
    {
      name: DataTypes.STRING,
      user_id: DataTypes.INTEGER,
    },
    {
      underscored: true,
      sequelize,
      modelName: "Collection",
      freezeTableName: true,
    }
  );
  return Collection;
};
