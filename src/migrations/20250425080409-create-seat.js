'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Seats', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
        allowNull : false
      },
      airplaneId: {
        type: Sequelize.INTEGER,
        allowNull : false,
        references:{
          model:'Airplanes',
          key:'id'
        },
        onDelete:'CASCADE'
      },
      row: {
        type: Sequelize.INTEGER,
        allowNull : false
      },
      col: {
        type: Sequelize.STRING,
        allowNull : false
      },
      type: {
        type: Sequelize.ENUM,
        values : ['business','economy','premium-economy','first-class'],
        defaultValue : 'economy',
        allowNull : false
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
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Seats');
  }
};