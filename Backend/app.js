const dotenv = require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello World');
})

module.exports = app;