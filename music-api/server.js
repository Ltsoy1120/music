const express = require('express');
const mongoose = require('mongoose');
const artists = require('./app/artists');
const albums = require('./app/albums');
const tracks = require('./app/tracks');
const users = require('./app/users');
const track_history = require('./app/track_history');
const cors = require('cors');
const config = require('./app/config');

const app = express();
const port = 8000;

const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200
}

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.static('public'));

const run = async () => {
    
    await mongoose.connect(config.db.url+'/'+config.db.name, {useNewUrlParser:true})

    app.use('/artists', artists());
    app.use('/albums', albums());
    app.use('/tracks', tracks());
    app.use('/users', users());
    app.use('/track_history', track_history());

    app.listen(port, () => {
        console.log(`Server started on port ${port}!`)
    })
    console.log('Mongoose connected!');
};
run().catch(console.log);