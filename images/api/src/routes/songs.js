const express = require('express');
const knex = require('knex');
const knexfile = require('../db/knexfile');
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

/**
 * Get all songs.
 *
 * @param {import("express").Request} req - Express Request object.
 * @param {import("express").Response} res - Express Response object.
 * @returns {Promise<void>} - Promise representing the asynchronous operation.
 */
router.get('/songs', (req, res) => {
    db('songs')
        .select('*')
        .then((songs) => {
            res.status(200).send({
                status: "OK request",
                data: songs,
            });
        })
        .catch((error) => {
            console.error(error);
            res.status(500).json({
                error: 'Unable to fetch songs'
            });
        });
});

/**
 * Get all songs of a certain artist.
 *
 * @param {import("express").Request} req - Express Request object.
 * @param {import("express").Response} res - Express Response object.
 * @returns {Promise<void>} - Promise representing the asynchronous operation.
 */
router.get('/songs/:artist_id', async (req, res) => {
    const artist_id = req.params.artist_id;

    try {
        const resp = await db('songs')
            .select()
            .where("artist_id", artist_id)
            .then((songs) => {
                res.status(200).send({
                    status: "OK request",
                    message: `Got all songs of artist with ID:${artist_id}`,
                    data: songs
                });
            });
    } catch (error) {
        console.log(err);
        res.status(500).json({
            error: 'Unable to fetch songs'
        });
    }
});

/**
 * Post a new song.
 *
 * @param {import("express").Request} req - Express Request object.
 * @param {import("express").Response} res - Express Response object.
 * @returns {Promise<void>} - Promise representing the asynchronous operation.
 */
router.post('/songs', async (req, res) => {
    const {
        name,
        artist
    } = req.body;

    const songUUID = uuidv4();
    const existingSong = await db('songs').select("id").where("name", name).first();
    const existingArtist = await db('artists').select("id").where("name", artist).first();
    console.log(existingSong);

    try {
        if (existingSong) {
            res.status(409).send({
                status: "Bad request",
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
                res.status(200).send({
                    status: "OK request",
                    message: `Song added!: ${resp}`,
                });

            } else {
                res.status(409).send({
                    status: "Bad request",
                    message: "This artist doesn't exist"
                });
            }
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 'Internal Server Error'
        });
    }




});

module.exports = router;