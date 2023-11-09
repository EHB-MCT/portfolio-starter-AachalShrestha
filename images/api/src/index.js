const express = require('express');
const knex = require('knex');
const knexfile = require('./knexfile');

const app = express();
const PORT = 3000;


// Create a Knex.js instance
const db = knex(knexfile.development);
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);

});

app.get('/songs', (req, res) => {
  knex('songs')
    .select('*')
    .then((songs) => {
      res.json(songs);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({
        error: 'Unable to fetch songs'
      });
    });
});

app.post('/artists', (req, res) => {
  const {
    name
  } = req.body;

  knex('artists')
    .insert({
      name: name
    })
    .returning('id')
    .then((artistId) => {
      res.status(201).json({
        message: `${name} has been added!`
      });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({
        error: 'Unable to add a new artist'
      });
    });
});
/* app.post('/songs', (req, res) => {
  const {
    name,
    artistName
  } = req.body;

  return knex('songs')
    .insert({
      name,
      artist_id: artistId
    })
    .returning('id');
  .then((songId) => {
      res.status(201).json({
        id: songId
      });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({
        error: 'Unable to add a new song'
      });

    });
}) */