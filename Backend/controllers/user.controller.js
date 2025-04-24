const blacklistTokenModel = require('../models/blacklistToken.model');
const Captain = require('../models/captain.model');
const userModel = require('../models/user.model');
const userService = require('../services/user.service');
const { validationResult } = require('express-validator');

module.exports.registerUser = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors.array())
        return res.status(400).json({ errors: errors.array() });
    }



    const { fullName, email, password } = req.body;

    const userAlreadyExit = await Captain.findOne({email});

    if(userAlreadyExit){
        return res.status(400).json({message: 'User is already Exist...'});
    }

    const hashedPasswrod = await userModel.hashPassword(password);
    console.log("hashPassword:", hashedPasswrod)
    console.log('req.body:', req.body);
    const user = await userService.createUser({
        firstName: fullName.firstName,
        lastName: fullName.lastName,
        email,
        password: hashedPasswrod
    });

    console.log('user:', user)

    const token = user.generateAuthToken();

    res.status(201).json({ token, user })

}

module.exports.loginUser = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors.array());
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    const user = await userModel.findOne({ email }).select('+password');

    if (!user) {
        return res.status(401).json({ message: 'Invalid email or password...🥲' });
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
        return res.status(401).json({ message: 'Invalid email or password, The email and password dont match...🥲' });
    }

    const token = user.generateAuthToken();

    res.cookie('token', token);

    return res.status(200).json({ token, user });
}

module.exports.getUserProfile = async (req, res, next) => {
    res.status(200).json(req.user);
}

module.exports.userLogout = async (req, res, next) => {
    res.clearCookie('token');
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

    await blacklistTokenModel.create({token});

    res.status(200).json({message: 'The User is Logout successfully...🫡'});
}