"use strict";
const restaurants = require("../data/restaurant-data");

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Restaurant", restaurants);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Restaurant", null, {});
  },
};
