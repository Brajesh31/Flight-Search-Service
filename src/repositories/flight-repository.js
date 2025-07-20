const CrudRepository=require('./crud-repository')
const { Flight, Airplane , Airport , City} = require('../models')
const {Sequelize} =require('sequelize')
const db=require('../models')

class FlightRepository extends CrudRepository {
    constructor(){
        super(Flight)
    }

    async getAllFlights(filter,sort){
        const response=await Flight.findAll({
            where: filter,
            order:sort,
            include:[
                {
                    model : Airplane,
                    required : true,
                    as : 'airplaneDetail'
                },
                {
                    model: Airport,
                    required : true,
                    as : 'departureAirport',
                    on : Sequelize.where(Sequelize.col("Flight.departureAirportId"),"=",Sequelize.col("departureAirport.code")),
                    include : {
                        model :  City,
                        required : true
                    }
                },
                {
                    model: Airport,
                    required : true,
                    as : 'arrivalAirport',
                    on : Sequelize.where(Sequelize.col("Flight.arrivalAirportId"),"=",Sequelize.col("arrivalAirport.code")),
                    include : {
                        model :  City,
                        required : true
                    }
                }
            ]
        })
     return response
    }

    async updateRemainingSeats(flightId,seats,dec=true){
        const transaction = await db.sequelize.transaction();
        console.log(seats)
        try {
            await db.sequelize.query(`SELECT * from Flights WHERE Flights.id = ${flightId} FOR UPDATE;`);
            const flight = await Flight.findByPk(flightId);
            if(+dec) {
                await flight.decrement('totalSeats', {by: seats}, {transaction: transaction});
            } else {
                await flight.increment('totalSeats', {by: seats}, {transaction: transaction});
            }
            await transaction.commit();
            return flight;
        } catch(error) {
            await transaction.rollback();
            throw error;
        }
      }
}

module.exports = FlightRepository