const { validationResult } = require('express-validator');
const mapService = require('../services/maps.service');

module.exports.getCoordinates = async (req, res, next) => {
    const error = validationResult(req);

    if(!error.isEmpty()){
        return res.status(400).json({error: error.array()});
    }

    const {address} = req.query;
 

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
    

    try {
        const result = await mapService.getDistanceTime(origin, destination);
       
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({message: error.message});
        throw new Error(error);
    }
}


module.exports.getAutoCompleteSuggestions = async (req, res, next) => {
    const error = validationResult(req);

    if(!error.isEmpty()){
        return res.status(400).json({error: error.array()});
    }

    const {input} = req.query;


    try {
        const suggestions = await mapService.getAutoCompleteSuggestions(input);
        res.status(200).json({suggestions});
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Failed to field suggestions'});
    }
}
