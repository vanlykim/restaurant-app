"use strict";
const bcrypt = require("bcryptjs");

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Users", [
      {
        name: "user1",
        email: "user1@email.com",
        password: await bcrypt.hash("123456", 8),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "user2",
        email: "user2@email.com",
        password: await bcrypt.hash("123456", 8),
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Users", null, {});
  },
};
