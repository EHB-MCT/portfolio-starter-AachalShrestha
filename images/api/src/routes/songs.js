const express = require('express');
const knex = require('knex');
const knexfile = require('../knexfile');
const {
    v4: uuidv4
} = require('uuid');
const router = express.Router();
const PORT = 3000;

const db = knex(knexfile.development);

const bodyParser = require('body-parser');
router.use(bodyParser.json());
router.use(express.json());
router.use(bodyParser.json());

//GET
router.get('/songs', (req, res) => {
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

router.post('/songs', async (req, res) => {
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

module.exports = router;