const express = require('express');
const knex = require('knex');
const knexfile = require('./knexfile');
const {
  v4: uuidv4
} = require('uuid');
const app = express();
const PORT = 3000;

const db = knex(knexfile.development);

// Remove the following line
const bodyParser = require('body-parser');
app.use(bodyParser.json());

const artistsRoutes = require('./routes/artist.js');
const songsRoutes = require('./routes/songs.js');
const userRoutes = require('./routes/users.js')

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.use('/', artistsRoutes);
app.use('/', songsRoutes);
app.use('/', userRoutes);