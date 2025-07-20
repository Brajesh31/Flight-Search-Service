const { StatusCodes } = require('http-status-codes')
const {AirplaneService} = require('../services')
const {FlightInstanceService} = require('../services')
const AppError = require('../utils/errors/app-error')
const { ErrorResponse , SuccessResponse }= require('../utils/common')

async function createFlightInstance(req,res){
    try{
        const flightInstance = await FlightInstanceService.createFlightInstance({
            flightId: req.body.flightId,
            flightDate: req.body.flightDate,
            status: req.body.status
        })
        SuccessResponse.data=flightInstance
        return res 
           .status(StatusCodes.CREATED)
           .json(SuccessResponse)
    }catch(error){
       ErrorResponse.error=error
       return res
               .status(error.statusCode)
               .json(ErrorResponse)
    }
}

async function getAllFlightInstances(req, res) {
    try {
        const flightInstances = await FlightInstanceService.getAllFlightInstances(req.query);
        SuccessResponse.data = flightInstances;
        return res
                .status(StatusCodes.OK)
                .json(SuccessResponse);
    } catch(error) {
        console.log(error);
        throw new AppError('Cannot fetch data of all the flights', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getFlight(req,res){
    try{
        console.log("id: ",req.params.id)
        const Flight = await FlightService.getFlight(req.params.id)
        SuccessResponse.data=Flight
        return res 
           .status(StatusCodes.OK)
           .json(SuccessResponse)
    }catch(error){
        ErrorResponse.error=error
       return res
               .status(error.statusCode)
               .json(ErrorResponse)
    }
}

async function destoryAirplane(req,res){
    try{
        const response = await AirplaneService.destroyAirplane(req.params.id)
        SuccessResponse.data=response
        return res 
           .status(StatusCodes.OK)
           .json(SuccessResponse)
    }catch(error){
        ErrorResponse.error=error
       return res
               .status(error.statusCode)
               .json(ErrorResponse)
    }
}

async function updateSeats(req,res){
    try{
        const response = await FlightService.updateSeats({
            flightId : req.params.id,
            seats : req.body.seats,
            dec : req.body.dec
        })
        SuccessResponse.data=response
        return res 
           .status(StatusCodes.OK)
           .json(SuccessResponse)
    }catch(error){
        ErrorResponse.error=error
       return res
               .status(error.statusCode)
               .json(ErrorResponse)
    }
}

module.exports = {
    createFlightInstance,
    getAllFlightInstances,
    getFlight,
    destoryAirplane,
    updateSeats
}