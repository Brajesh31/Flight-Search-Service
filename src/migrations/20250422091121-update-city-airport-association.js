'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   await queryInterface.addConstraint('Airports',{
    type:'FOREIGN KEY',
    name: 'city-foreign-key-constraint',
    fields:['cityId'],
    references : {
      table:'Cities',
      field: 'id'
    },
    onDelete: 'CASCADE'
   })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint('Airports','city-foreign-key-constraint')
  }
};
