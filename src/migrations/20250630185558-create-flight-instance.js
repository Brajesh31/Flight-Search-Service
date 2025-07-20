'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('FlightInstances', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      flightId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Flights',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      flightDate: {
        type: Sequelize.DATEONLY,
        allowNull: false
      },
      status: {
        type: Sequelize.ENUM('SCHEDULED', 'COMPLETED', 'CANCELLED'),
        defaultValue: 'SCHEDULED'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });

    await queryInterface.addIndex('FlightInstances', {
      fields: ['flightId', 'flightDate'],
      unique: true,
      name: 'unique_flight_date'
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('FlightInstances');
  }
};