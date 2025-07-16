const express = require('express');
const router = express.Router();
const { body, query } = require('express-validator');
const rideController = require('../controllers/ride.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const rideModel = require('../models/ride.model');


router.post('/create',
    authMiddleware.authUser,
    body('pickup').isString().isLength({ min: 3 }).withMessage('Invalid destination address'),
    body('destination').isString().isLength({ min: 3 }).withMessage('Invaid destination address'),
    body('vehicleType').isString().isIn(['car', 'auto', 'motorcycle']).withMessage('Invalid destination vehicleType'),
    rideController.createRide
);

router.get('/get-fare',
    authMiddleware.authUser,
    query('pickup').isString().isLength({min : 3}).withMessage('Invalied pickup'),
    query('destination').isString().isLength({min: 3}).withMessage('Invlied destination.'),
    rideController.getFare
)

router.post('/confirm',
    authMiddleware.authCaptain,
    body('rideId').isMongoId().withMessage('Invalid ride id'),
    // body('otp').isString().isLength({min: 6, max:6}).withMessage('Invalid Otp'),
    rideController.confirmRide
);

router.post('/start-ride',
    authMiddleware.authCaptain,
    body('rideId').isMongoId().withMessage('Invalid rideId'),
    body('otp').isString().isLength({min: 6, max:6}).withMessage('Invalid otp'),
    rideController.startRide
)

router.post('/end-ride', 
    authMiddleware.authCaptain,
    body('rideId').isMongoId().withMessage('Invalid ride id'),
    rideController.endRide
)

module.exports = router;