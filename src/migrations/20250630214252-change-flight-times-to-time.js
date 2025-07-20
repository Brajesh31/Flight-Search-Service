'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn('Flights', 'departureTime', {
      type: Sequelize.TIME,
      allowNull: false,
    });

    await queryInterface.changeColumn('Flights', 'arrivalTime', {
      type: Sequelize.TIME,
      allowNull: false,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn('Flights', 'departureTime', {
      type: Sequelize.DATE,
      allowNull: false,
    });

    await queryInterface.changeColumn('Flights', 'arrivalTime', {
      type: Sequelize.DATE,
      allowNull: false,
    });
  }
};
