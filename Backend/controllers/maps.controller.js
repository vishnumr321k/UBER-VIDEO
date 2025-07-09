const { validationResult } = require('express-validator');
const mapService = require('../services/maps.service');

module.exports.getCoordinates = async (req, res, next) => {
    const error = validationResult(req);

    if(!error.isEmpty()){
        return res.status(400).json({error: error.array()});
    }

    const {address} = req.query;
    console.log('address:', address);

    try {
        const coordinates = await mapService.getAddressCoordinate(address);
        res.status(200).json(coordinates);
    } catch (error) {
        res.status(404).json({message: 'Coordinate nor found..'});
        throw error;
    }
};


module.exports.getDistanceTime = async (req, res, next) => {
    const error = validationResult(req);

    if(!error.isEmpty()){
        return res.status(400).json({error: error.array()});
    }

    const {origin, destination} = req.query;
    console.log( ' {origin, destination}:',{origin, destination})

    try {
        const result = await mapService.getDistanceTime(origin, destination);
        console.log('result:', result);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({message: error.message});
        throw new Error(error);
    }
}