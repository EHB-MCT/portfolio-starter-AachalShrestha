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
app.post('/artists', async (req, res) => {
  const {
    name,
    age
  } = req.body;
  const artistUUID = uuidv4();
  const existingArtist = await db("artists").select().where("name", name).first();
  console.log(existingArtist)
  if (existingArtist) {
    res.status(409).send({
      message: "This artist already exists"
    })
  } else {
    const resp = await db("artists")
      .insert({
        name: name,
        age: age,
        uuid: artistUUID
      })
      .returning();

    res.status(200).send(`Artist added!: ${name}`);
  }
});






app.post('/songs', async (req, res) => {
  const {
    name,
    artist
  } = req.body;

  const songUUID = uuidv4();
  const existingSong = await db('songs').select("id").where("name", name).first();
  const existingArtist = await db('artists').select("id").where("name", artist).first();
  console.log(existingSong);

  if (existingSong) {
    res.status(409).send({
      message: "This song already exists"
    });
  } else {
    if (existingArtist) {
      const resp = await db('songs')
        .insert({
          name: name,
          artist_id: existingArtist.id,
          uuid: songUUID
        });
      console.log(resp)
      res.status(200).send(`Artist added!: ${resp}`);

    } else {
      res.status(409).send({
        message: "This artist doesn't exist"
      });
    }
  }




});