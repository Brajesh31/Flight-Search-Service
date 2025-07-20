'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Seat extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.FlightInstance,{
        foreignKey: 'flightInstanceId',
        as: 'flightInstance'
      })
    }
  }
  Seat.init({
    flightInstanceId:{
      type:DataTypes.INTEGER,
      allowNull:false
    }, 
    row:{
      type:DataTypes.INTEGER,
      allowNull:false
    },
    col:{
      type:DataTypes.STRING,
      allowNull:false
    },
    type:{
      type:DataTypes.ENUM,
      values : ['business','economy','premium-economy','first-class'],
      defaultValue : 'economy',
      allowNull:false
    }
  }, {
    sequelize,
    modelName: 'Seat',
  });
  return Seat;
};