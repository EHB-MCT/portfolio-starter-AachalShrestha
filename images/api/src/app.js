const express = require('express');
const cors = require('cors')

const {
    v4: uuidv4
} = require('uuid');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const artistsRoutes = require('./routes/artist.js');
const songsRoutes = require('./routes/songs.js');
const userRoutes = require('./routes/users.js');

app.use(cors());
app.use('/', artistsRoutes);
app.use('/', songsRoutes);
app.use('/', userRoutes);

module.exports = app;