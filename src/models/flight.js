'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class flight extends Model {
    static associate(models) {
      this.belongsTo(models.Airplane,{
         foreignKey:'airplaneId',
         as: 'airplaneDetail'
      })
      this.belongsTo(models.Airport,{
        foreignKey: 'departureAirportId',
        as: 'departureAirport'
      })
      this.belongsTo(models.Airport,{
        foreignKey: 'arrivalAirportId',
        as: 'arrivalAirport'
      }) 
    }
  }
  flight.init({
    flightNumber: {
      type: DataTypes.STRING,
    },
    airplaneId: {
      type: DataTypes.INTEGER,
    },
    departureAirportId:{
      type: DataTypes.STRING,
    },
    arrivalAirportId:{
      type: DataTypes.STRING,
    },
    arrivalTime:{
      type: DataTypes.TIME,
    },
    departureTime:{
      type: DataTypes.TIME,
    },
    price:{
      type: DataTypes.INTEGER,
    },
    boardingGate: {
      type: DataTypes.STRING,
    },
    totalSeats:{
      type: DataTypes.INTEGER,
    }
  }, {
    sequelize,
    modelName: 'Flight',
  });
  return flight;
};