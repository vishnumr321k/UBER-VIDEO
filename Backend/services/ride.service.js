const rideModel = require('../models/ride.model');
const { getDistanceTime } = require('../services/maps.service');
const crypto = require('crypto');
const { sentMessageToSocketId } = require('../socket');


async function getFare(pickup, destination) {
    if (!pickup || !destination) {
        throw new Error('Pickup and destination are required');
    }

    const distanceTime = await getDistanceTime(pickup, destination);

    const distance_km = distanceTime.distance_km;
    const distance_min = distanceTime.duration_min

    const baseFare = {
        auto: 30,
        car: 50,
        motorcycle: 20
    };

    const perKmRate = {
        auto: 10,
        car: 15,
        motorcycle: 8
    };

    const perMinuteRate = {
        auto: 2,
        car: 3,
        motorcycle: 1.5
    };

    const fare = {
        auto: baseFare.auto + (distanceTime.distance_km * perKmRate.auto) + (distanceTime.duration_min * perMinuteRate.auto),
        car: baseFare.car + (distanceTime.distance_km * perKmRate.car) + (distanceTime.duration_min * perMinuteRate.car),
        motorcycle: baseFare.motorcycle + (distanceTime.distance_km * perKmRate.motorcycle) + (distanceTime.duration_min * perMinuteRate.motorcycle)
    };

    return {
        fare,
        distance_km,
        distance_min
    };
}

module.exports.getFare = getFare;

function getOtp(num) {
    function generateOtp(num) {
        const otp = crypto.randomInt(Math.pow(10, num - 1), Math.pow(10, num)).toString();
        return otp;
    }

    return generateOtp(num);
}

module.exports.createRide = async ({ user, pickup, destination, vehicleType }) => {
    if (!user, !pickup, !destination, !vehicleType) {
        throw new Error('All fields are required...');
    };

    const { fare, distance_km, distance_min } = await getFare(pickup, destination);


    
    const ride = rideModel.create({
        user,
        pickup,
        destination,
        fare: Math.round(fare[vehicleType]),
        otp: getOtp(6),
        distance: distance_km,
        duration: distance_min
    });

    return ride;
};

module.exports.confirmRide = async (rideId, captain) => {
    if (!rideId) {
        throw new Error('Ride id is required');
    }




    await rideModel.findOneAndUpdate({
        _id: rideId,
    }, {
        status: 'accepted',
        captain: captain._id
    })

    const ride = await rideModel.findOne({
        _id: rideId
    }).populate('user').populate('captain').select('+otp');



    console.log('ride:', ride);

    if (!ride) {
        throw new Error('Ride not found');
    }

    return ride;
}


module.exports.startRides = async ({ rideId, otp, captain }) => {
    if(!rideId, !otp){
        throw new Error('Ride id and OTP are required');
    }

    const ride = await rideModel.findOne({
        _id: rideId
    }).populate('user').populate('captain').select('+otp');

    if(!ride){
        throw new Error('Ride not found');
    }

    if(ride.status !== 'accepted'){
        throw new Error('Rid not accepted');
    }

    if(ride.otp !== otp){
        throw new Error('Invalid OTP');
    }

    const updateRide = await rideModel.findByIdAndUpdate({
        _id: rideId
    }, {
        status: 'ongoing'
    }).populate('user').populate('captain');


    console.log('updateRide', updateRide);

    return updateRide;
}