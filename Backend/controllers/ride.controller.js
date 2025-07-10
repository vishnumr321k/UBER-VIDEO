const {createRide} = require('../services/ride.service');
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