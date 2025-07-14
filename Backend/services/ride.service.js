const rideModel = require('../models/ride.model');
const { getDistanceTime } = require('../services/maps.service');
const crypto = require('crypto');


async function getFare(pickup, destination) {
    if (!pickup || !destination) {
        throw new Error('Pickup and destination are required');
    }

    const distanceTime = await getDistanceTime(pickup, destination);

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

    return fare;
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

    const fare = await getFare(pickup, destination);

    const ride = rideModel.create({
        user,
        pickup,
        destination,
        fare: Math.round(fare[vehicleType]),
        otp: getOtp(6),
    });

    return ride;
};

