/* eslint-disable no-console */
const express = require('express');
const cors = require('cors');

const playstore = require('./movies-data-small');

const app = express();

app.get('/', (req, res) => {
    res.send('Hello Express!');
});

app.get('/movie', (req, res) => {
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
    app.use(cors());
    console.log('Express server is listening on port 8000!');
});
