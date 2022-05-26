"use strict";
const { Model } = require("sequelize");
const bcrypt = require("bcryptjs");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static async isEmailTaken(email) {
      console.log("xxxxxxxxxxxxxxxxxxxxxxx");
      const user = await this.findOne({ where: { email } });
      console.log("xxxxxxxxxxxxxxxxxxxxxxx");
      console.log(user);
      return !!user;
    }

    async isPasswordMatch(password) {
      const user = this;
      return bcrypt.compare(password, user.password);
    }
  }
  User.init(
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
    },
    {
      underscored: true,
      hooks: {
        beforeCreate: async (user) => {
          user.password = await bcrypt.hash(user.password, 8);
        },
        afterCreate: (record) => {
          delete record.dataValues.password;
        },
        afterUpdate: (record) => {
          delete record.dataValues.password;
        },
      },
      sequelize,
      modelName: "User",
      freezeTableName: true,
    }
  );
  return User;
};
