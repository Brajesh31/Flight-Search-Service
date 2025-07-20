const { StatusCodes } = require('http-status-codes')
const { FlightInstanceRepository,FlightRepository}= require('../repositories')
const {Op}=require('sequelize')
const AppError = require('../utils/errors/app-error')
const flightInstanceRepository=new FlightInstanceRepository
const flightRepository = new FlightRepository

async function createFlightInstance(data) {
    try {
        console.log(data)
        const flightInstance = await flightInstanceRepository.create(data);
        return flightInstance
    } catch(error) {
         console.log(error)
        if(error.name == 'SequelizeValidationError') {
            let explanation = [];
            error.errors.forEach((err) => {
                explanation.push(err.message);
            });
            throw new AppError(explanation, StatusCodes.BAD_REQUEST);
        }
        throw new AppError('Cannot create a new Flight object', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getAllFlightInstances(query) {
  const endingTripTime = " 23:59:00";
  let sortFilter = [];
  let customFilter = {};

  if(query.trips){
    [departureAirportId , arrivalAirportId] = query.trips.split("-")
    customFilter['$flight.departureAirportId$'] = departureAirportId;
    customFilter['$flight.arrivalAirportId$'] = arrivalAirportId;
  }
  if(query.price){
    [minPrice,maxPrice] = query.price.split("-")
    customFilter.price = {
        [Op.between]: [minPrice,(maxPrice == undefined)? 90000 : maxPrice ]
    }
  }
  if(query.travellers){
     customFilter.totalSeats = {
        [Op.gte]:query.travellers
     }
  }
  if(query.tripDate) {
    customFilter.flightDate = query.tripDate;
  }
  if(query.sort) {
    const params = query.sort.split(',');
    const sortFilters = params.map((param) => param.split('_'));
    sortFilter = sortFilters
  }
  try {
    console.log(customFilter,sortFilter) 
       const flightInstances=await flightInstanceRepository.getFlightInstances(customFilter,sortFilter)
       return flightInstances
  } catch (error) {
    console.log("Service Error:", error);
    throw new AppError('Cannot fetch flight instances', StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

async function getFlight(id){
  try{
   const flight=await flightRepository.get(id)
   return flight
  }catch(error){
    if(error.statusCode==StatusCodes.NOT_FOUND){
      throw new AppError('Airport you requested is not present',error.statusCode)
    }
    throw new AppError('Cannot fetch data of all the airplane',StatusCodes.INTERNAL_SERVER_ERROR)
  }
}

async function destroyAirport(id){
  try{
   const response=await airportRepository.destroy(id)
   return response
  }catch(error){
    if(error.statusCode==StatusCodes.NOT_FOUND){
      throw new AppError('The Airport you requested to delete is not found',error.statusCode)
    }
    throw new AppError('Cannot remove airplane',StatusCodes.INTERNAL_SERVER_ERROR)
  }
}

async function updateSeats(data){
  try{
   const response=await flightRepository.updateRemainingSeats(data.flightId,data.seats,data.dec)
   console.log(response)
   return response
  }catch(error){
    if(error.statusCode==StatusCodes.NOT_FOUND){
      throw new AppError('The Airplane you requested to update is not found',error.statusCode)
    }
    throw new AppError('Cannot update airplane',StatusCodes.INTERNAL_SERVER_ERROR)
  }
}

module.exports = {
    createFlightInstance,
    getAllFlightInstances,
    getFlight,
    destroyAirport,
    updateSeats
}