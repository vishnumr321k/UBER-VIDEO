const dotenv = require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const cookiParser = require('cookie-parser');
const connectToDb  = require('./db/db');
const userRoutes = require('./routes/user.routes');
const captainRoutes = require('./routes/captain.routes');
const mapsRoutes = require('./routes/maps.routes');
const rideRoutes = require('./routes/ride.routes');

connectToDb();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookiParser());


app.get('/', (req, res) => {
    res.send('Hello World');
})

app.use('/users', userRoutes);
app.use('/captians', captainRoutes);
app.use('/maps', mapsRoutes);
app.use('/rides', rideRoutes);


module.exports = app;