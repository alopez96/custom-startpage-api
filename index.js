const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');

const { mongoURI } = require('./keys');
const userRoutes = require('./models/Users/routes');

mongoose.connect(mongoURI, { useNewUrlParser: true });

mongoose.connection
    .once('open', () => console.log('Mongodb running')) //successful
    .on('error', err => console.log(err)); //error connecting


const app = express();
app.use(bodyParser.json());
app.use(cors());
//debugging for HTTP requests
app.use(morgan('dev'));
//get routes from models
app.use('/', [userRoutes]);

app.listen(3000, () => {
    console.log('app is running on port 3000');
})