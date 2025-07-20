'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
      await queryInterface.addColumn('Seats', 'seat_status', {
      type: Sequelize.ENUM('AVAILABLE', 'LOCKED', 'BOOKED'),
      defaultValue: 'AVAILABLE',
      allowNull: false
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Seats', 'seat_status');
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_Seats_seat_status";');
  }
};
