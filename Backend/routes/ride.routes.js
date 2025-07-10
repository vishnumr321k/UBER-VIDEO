const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const rideController = require('../controllers/ride.controller');
const authMiddleware = require('../middlewares/auth.middleware');


router.post('/create',
    authMiddleware.authUser,
    body('pickup').isString().isLength({ min: 3 }).withMessage('Invalid destination address'),
    body('destination').isString().isLength({ min: 3 }).withMessage('Invaid destination address'),
    body('vehicleType').isString().isIn(['car', 'auto', 'motorcycle']).withMessage('Invalid destination vehicleType'),
    rideController.createRide
)

module.exports = router;