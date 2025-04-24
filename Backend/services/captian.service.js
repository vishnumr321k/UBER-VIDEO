const Captain = require('../models/captain.model');


module.exports.createCaptain = async ({ firstName, lastName, email, password, color, plate, capacity, vehicleType }) => {

    console.log('sjbdflnsdhdlkn')

    
    
        if(!firstName || !lastName || !email || !password || !color || !plate || !capacity || !vehicleType){
            throw new Error('All Fields are required');
        }

        const captain = Captain.create({
            fullName:{
                firstName,
                lastName
            },
            email,
            password,
            vehicle:{
                color,
                plate,
                capacity,
                vehicleType,
            },
            
        });

        return captain;
} 