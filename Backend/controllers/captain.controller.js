const Captain = require('../models/captain.model');
const captainService = require('../services/captian.service');
const { validationResult } = require('express-validator');

module.exports.registerCaptain = async (req, res, next) => {

    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.status(400).json({error: error.array()});
    }
    
    const {fullName, email, password, vehicle} = req.body;
   

    
    

    const isCaptainAlreadyExist = await Captain.findOne({email});

    if(isCaptainAlreadyExist){
        res.status(400).json({message: 'Captain already exist...'})
    }

    const hashedPassword = await Captain.hashPassword(password);

    console.log('hashedPassword:', hashedPassword);

    const captain = await captainService.createCaptain({
        firstName: fullName.firstName,
        lastName: fullName.lastName,
        email,
        password: hashedPassword,
        color: vehicle.color,
        plate: vehicle.plate,
        capacity: vehicle.capacity,
        vehicleType: vehicle.vehicleType
    });

    console.log('captain:', captain)
    const token =  captain.generateAuthToken();

    res.status(200).json({token, captain});
;}