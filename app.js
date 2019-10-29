/* eslint-disable no-console */
require('dotenv').config();
const API_TOKEN = process.env.API_SECRET;
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');

const playstore = require('./movies-data-small');

const app = express();

app.use(morgan('common'));
app.use(cors());
app.use(helmet());

function validateBearer(req, res, next) {
    const authVal = req.get('Authorization') || '';
    if (!authVal.startsWith('Bearer ')) {
        return res.status(400).json({error: 'Authorization token not found'})
    }
    const [bearer ,token] = authVal.split(' ');
    if(token !== API_TOKEN) {
        return res.status(401).json({error: 'Token is invalid'})
    }
    next();
}

app.get('/', (req, res) => {
    res.send('Hello Express!');
});

app.get('/movie', validateBearer, (req, res) => {
    let apps = playstore;
    const {genre, country, avg_vote} = req.query;

    if (genre) {
        apps = apps.filter(app => app.genre.toLowerCase().includes(genre.toLowerCase()));
    } 

    if (country) {
        apps = apps.filter(app => app.country.toLowerCase().includes(country.toLowerCase()));
    } 

    if (avg_vote) {
        apps = apps.filter(app => app.avg_vote >= avg_vote);
    }
    
    res.json(apps);
});


app.listen(8000, () => {
    console.log('Express server is listening on port 8000!');
});
