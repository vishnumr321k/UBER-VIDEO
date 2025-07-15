const rideModel = require('../models/ride.model');
const { createRide, getFare, confirmRide } = require('../services/ride.service');
const { validationResult } = require('express-validator');
const { getCaptainInTheRadius, getAddressCoordinate } = require('../services/maps.service');
const { sentMessageToSocketId } = require('../socket');

module.exports.createRide = async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    };

    const { pickup, destination, vehicleType } = req.body;

    console.log('req.body:',req.user._id)

    try {
        const ride = await createRide({ user: req.user._id, pickup, destination, vehicleType });
        res.status(201).json(ride);

        try {
            const pickupCoordinates = await getAddressCoordinate(pickup);



            const captainInTheRadius = await getCaptainInTheRadius(pickupCoordinates.lat, pickupCoordinates.lng, 2);

            ride.otp = '';

            const rideWithUser = await rideModel.findOne({_id: ride._id}).populate('user');

                console.log('rideModel:', rideWithUser)
            captainInTheRadius.map(captain => {
                console.log('socketId:', captain.socketId);
                sentMessageToSocketId(captain.socketId, {
                    event: 'new-ride',
                    data: rideWithUser
                });
            });

            console.log('captain:', captainInTheRadius);

        } catch (error) {
            console.log('The inner try catch:', error)
        }


    } catch (error) {
        return res.status(500).json({ message: error.message });
    }

};

module.exports.getFare = async (req, res, next) => {
    const error = validationResult(req);

    if (!error.isEmpty()) {
        return res.status(400).json({ error: error.array() });
    }

    const { pickup, destination } = req.query;

    try {
        const fare = await getFare(pickup, destination);
        return res.status(200).json({ fare });
    } catch (error) {
        res.status(500).json({ message: error.me });
    }
}


module.exports.confirmRide = async (req, res, next) => {
     const error = validationResult(req);

     if(!error.isEmpty()){
        return res.status(400).json({error: error.message});
     }

     const {rideId} = req.body;

     console.log('captain._id:', req.captain._id)

     try {
        const ride = await confirmRide(rideId, req.captain._id);

        sentMessageToSocketId(ride.user.socketId, {
            event: 'ride-confirmed',
            data: ride
        })

        return res.status(200).json(ride);
     } catch (error) {
        return res.status(500).json({message: error.message});
     }
}