"use strict";
const restaurants = require("../data/restaurant-data");

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Restaurants", restaurants);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Restaurants", null, {});
  },
};
