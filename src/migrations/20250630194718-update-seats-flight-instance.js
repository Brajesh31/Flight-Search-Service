'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.addColumn('Seats', 'flightInstanceId', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'FlightInstances',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });

     await queryInterface.removeColumn('Seats', 'airplaneId');
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.addColumn('Seats', 'airplaneId', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Airplanes',
        key: 'id'
      }
    });

    await queryInterface.removeColumn('Seats', 'flightInstanceId');
  }
};
