"use strict";
const openingHours = require("../data/opening-hour-data");

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("OpeningHours", openingHours);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("OpeningHours", null, {});
  },
};
