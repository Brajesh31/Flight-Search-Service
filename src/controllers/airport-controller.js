const { StatusCodes } = require('http-status-codes')
const {AirplaneService} = require('../services')
const {AirportService} = require('../services')
const { ErrorResponse , SuccessResponse }= require('../utils/common')

async function createAirport(req,res){
    try{
        const airport = await AirportService.createAirport({
            name:req.body.name,
            code : req.body.code,
            adress: req.body.adress,
            cityId: req.body.cityId
        })
        SuccessResponse.data=airport
        console.log(airport)
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

async function getAirports(req,res){
    try{
        const airport = await AirportService.getAirports()
        SuccessResponse.data=airport
        return res 
           .status(StatusCodes.OK)
           .json(SuccessResponse)
    }catch(error){
       return res
               .status(error.statusCode)
               .json(ErrorResponse)
    }
}

async function getAirplane(req,res){
    try{
        const airplane = await AirplaneService.getAirplane(req.params.id)
        SuccessResponse.data=airplane
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

async function updateAirplane(req,res){
    try{
        const response = await AirplaneService.updateAirplane(req.params.id,req.params.data)
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
    createAirport,
    getAirports,
    getAirplane,
    destoryAirplane,
    updateAirplane
}