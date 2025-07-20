const express = require('express')

const {FlightInstanceController,FlightController, AirplaneController}=require('../../controllers')
const router=express.Router()

// api/v1/airplanes  POST
router
    .post('/',
        FlightInstanceController.createFlightInstance)

router
    .get('/',
        FlightInstanceController.getAllFlightInstances)
    
router
    .get('/:id',
       FlightController.getFlight)      
       
router
    .delete('/:id',
       AirplaneController.destoryAirplane)       
       
router
       .patch('/:id/seats',
           FlightController.updateSeats
       )       

module.exports= router