const userModel = require('../models/user.model');


module.exports.createUser = async ({
    firstName, lastName, email, password
}) => {
    console.log('sdkndndf')
    if(!firstName || !email || !password){
        throw new Error('All Fields are required');
    }
    console.log('firstName:', firstName)
    const user = await userModel.create({
        fullName:{
            firstName,
            lastName
        },
        email,
        password
    })
    console.log('user in createUser:', user)
    return user
}

