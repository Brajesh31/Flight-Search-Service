// models/flightinstance.js
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class FlightInstance extends Model {
    static associate(models) {
      this.belongsTo(models.Flight, {
        foreignKey: 'flightId',
        as: 'flight'
      });
         this.hasMany(models.Seat, {
        foreignKey: 'flightInstanceId',
        onDelete: 'CASCADE'
     });
    }
  }
  FlightInstance.init({
    flightId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Flight',
        key: 'id'
      }
    },
    flightDate: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM('SCHEDULED', 'COMPLETED', 'CANCELLED'),
      defaultValue: 'SCHEDULED'
    }
  }, {
    sequelize,
    modelName: 'FlightInstance',
    indexes: [
      {
        unique: true,
        fields: ['flightId', 'flightDate']
      }
    ]
  });
  return FlightInstance;
};