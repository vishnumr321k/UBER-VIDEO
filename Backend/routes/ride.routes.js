const express = require('express');
const router = express.Router();
const { body, query } = require('express-validator');
const rideController = require('../controllers/ride.controller');
const authMiddleware = require('../middlewares/auth.middleware');


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
)

module.exports = router;