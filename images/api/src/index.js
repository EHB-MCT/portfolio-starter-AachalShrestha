const express = require('express');
const knex = require('knex');
const knexfile = require('./knexfile');
const {
  v4: uuidv4
} = require('uuid');
const app = express();
const PORT = 3000;


// Create a Knex.js instance
const db = knex(knexfile.development);


const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(express.json());


app.get('', (req, res) => {
  res.send('gogoggo')
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);

});

//GET
app.get('/songs', (req, res) => {
  db('songs')
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

app.get('/artists', (req, res) => {
  db('artists')
    .select('*')
    .then((artists) => {
      res.json(artists);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({
        error: 'Unable to fetch artists'
      });
    });
});


//POST
app.post('/artists', (req, res) => {
  const {
    name,
    age
  } = req.body;
  const artistUUID = uuidv4()

  db('artists')
    .select('id')
    .where('name', name)
    .then((existingArtists) => {
      if (existingArtists.length > 0) {
        return res.status(409).json({
          error: 'Artist with the same name already exists'
        });
      }

      return db('artists')
        .insert({
          uuid: artistUUID,
          name: name,
          age: age
        })
        .returning('id');
    })
    .then((artistId) => {
      if (artistId) {
        res.status(201).json({
          message: `${name} has been added with id ${artistId[0]}!`
        });
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({
        error: 'Unable to add a new artist'
      });
    });
});

app.post('/songs', (req, res) => {
  const {
    name,
    artist
  } = req.body;

  return db('artists')
    .select('id')
    .where('name', artist)
    .then((existingArtists) => {
      if (existingArtists.length > 0) {
        return db('songs')
          .insert({
            name: name,
            artist_id: existingArtists.id
          })
          .returning('id');
      }

      return res.status(409).json({
        error: "Artist doesn't exist yet, add artist first"
      });

    })
    .then((artist) => {
      if (artist) {
        res.status(201).json({
          message: `${name} has been added with id ${artist[0]}!`,
          data: artist
        });
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({
        error: 'Unable to add a new artist'
      });
    });
})


app.post('/songs', (req, res) => {
  const {
    name,
    artist
  } = req.body;

  return db('artists')
    .select('id')
    .where('name', artist)
    .then((existingArtists) => {
      if (existingArtists.length > 0) {
        return db('songs')
          .insert({
            name: name,
            artist_id: existingArtists.id
          })
          .returning('id');
      }

      return res.status(409).json({
        error: "Artist doesn't exist yet, add artist first"
      });

    })
    .then((artist) => {
      if (artist) {
        res.status(201).json({
          message: `${name} has been added with id ${artist[0]}!`,
          data: artist
        });
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({
        error: 'Unable to add a new artist'
      });
    });
})