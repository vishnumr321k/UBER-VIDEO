const rideModel = require('../models/ride.model');
const {createRide, getFare} = require('../services/ride.service');
const {validationResult} = require('express-validator');

module.exports.createRide = async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    };

    const { pickup, destination, vehicleType } = req.body;

    try {
        const ride = await createRide({ user: req.user._id, pickup, destination, vehicleType });
        console.log('ride:', ride);
        return res.status(201).json(ride);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }

};

module.exports.getFare = async (req, res, next) => {
    const error = validationResult(req);

    if(!error.isEmpty()){
        return res.status(400).json({error: error.array()});
    }

    const {pickup, destination} = req.query;

    try {
        const fare = await getFare(pickup, destination);
        return res.status(200).json({fare});
    } catch (error) {
        res.status(500).json({message: error.me});
    }
}