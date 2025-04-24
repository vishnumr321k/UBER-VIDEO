const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const captianSchema = new mongoose.Schema({
    fullName: {
        firstName: {
            type: String,
            required: true,
            minlenght: [3, 'First name must be at least 3 characters long...🤨'],
        },
        lastName: {
            type: String,
            required: true,
            minlenght: [3, 'Last name must be at least 3 characters long...🫡']
        }
    },
    email: {
        type: String,
        required: true,        
        unique: true,         
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email...(Endha mone....😏)']
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    socketId:{
        type: String
    },
    status:{
        type: String,
        enum: ['active', 'inactive'],
        default: 'inactive'
    },
    vehicle:{
        color:{
            type: String,
            required: true,
            minlength: [3, 'Color must be at least 3 characters long...'],
        },
        plate:{
            type: String,
            required: true,
            minlength: [3, 'Plate must be at least 3 character long...']
        },
        capacity:{
            type: Number,
            required: true,
            min: [3, 'Capacity must be at least 1...']
        },
        vehicleType:{
            type: String,
            required: true,
            enum: ['car', 'motorcycle', 'auto']
        }
    },
    location:{
        latitude:{
            type: Number,
        },
        longitude:{
            type: Number
        }
    }
})

captianSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({_id: this._id, email: this.email}, process.env.JWT_SECRET, {expiresIn: '24h'});
    return token;
}

captianSchema.methods.comparePassword = async function(password) {
    return await bcrypt.compare(password, this.password)
}

captianSchema.statics.hashPassword = async function(password){
    return await bcrypt.hash(password, 10);
}

const Captain = mongoose.model('Captain', captianSchema);

module.exports = Captain;