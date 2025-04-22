const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const userSchema = new mongoose.Schema({
    fullName:{
        firstName:{
            type:String,
            required:true,
            minlength: [3, 'First name must be at least 3 characters'],
        },
        lastName: {
            type: String,
            minlength: [3, 'Last name must be at least 3 characters'],
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: [3, 'Email must be at least 5 characters'],
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    socketId: {
        type: String,
    }
})

userSchema.methods.generateAuthToken = function(){
    const token = jwt.sign(
        {_id: this._id, email: this.email},
        process.env.JWT_SECRET,
        {expiresIn: '24h'}
    );
    return token;
}

userSchema.methods.comparePassword = async function(userEnterPassword){
    return await bcrypt.compare(userEnterPassword, this.password)
}

userSchema.statics.hashPassword = async function(userEnterPassword){
    return await bcrypt.hash(userEnterPassword, 10)
}

const userModel = mongoose.model('user', userSchema);
module.exports = userModel;