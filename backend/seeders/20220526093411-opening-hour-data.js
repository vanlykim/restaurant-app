"use strict";
const openingHours = require("../data/opening-hour-data");

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("OpeningHour", openingHours);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("OpeningHour", null, {});
  },
};
