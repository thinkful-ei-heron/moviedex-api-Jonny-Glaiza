const express = require('express');
const cors = require('cors');
const playstore = require('./playstore');

const app = express();

app.get('/', (req, res) => {
    res.send('Hello Express!');
});

app.get('/apps', (req, res) => {
    let apps = playstore;
    const {sort, genres} = req.query;

    if (sort) {
        if ((!['app', 'rating'].includes(sort.toLowerCase()))) {
            return res.status(400).send('Please provide a valid Sort');
        }
        apps.sort((a, b) => {
            let word = sort.toLowerCase().substring(0,1).toUpperCase()+sort.toLowerCase().substring(1);
            return a[word] > b[word] ? 1 : a[word] < b[word] ? -1 : 0;
        });
        if(sort.toLowerCase().includes('rating')){
            apps.reverse();
        }
    }
    if (genres) {
        if (['action', 'puzzle', 'strategy', 'casual', 'arcade', 'card'].includes(genres.toLowerCase())) {
            apps = apps.filter(app => app.Genres.toLowerCase().includes(genres.toLowerCase()));
        } else {
            return res.status(400).send('Please provide a valid Genre');
        }
    }
    res.json(apps);
});


app.listen(8000, (req, res) => {
    app.use(cors());
    console.log('Express server is listening on port 8000!');
});
