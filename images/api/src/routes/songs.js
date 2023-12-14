const express = require('express');
const knex = require('knex');
const knexfile = require('../db/knexfile');
const {
    v4: uuidv4
} = require('uuid');
const router = express.Router();
const PORT = 3000;

const db = knex(knexfile.development);

const {
    checkNumber
} = require('../helpers/songEndpointChecker');
const bodyParser = require('body-parser');
const {
    checkArtistName
} = require('../helpers/artistEndpointChecker');
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
    const id = parseInt(req.params.artist_id, 10);
    if (checkNumber(id)) {
        try {
            const existingArtist = await db('artists').select().where("id", id);
            console.log("existingartist:", existingArtist);
            if (existingArtist.length > 0) {
                await db('songs')
                    .select()
                    .where("artist_id", id)
                    .then((songs) => {
                        res.status(200).send({
                            status: "OK request",
                            message: `Got all songs of artist with ID:${id}`,
                            data: songs
                        });
                    });
            } else {
                res.status(404).json({
                    status: "Artist doesn't exist"
                });
            }

        } catch (error) {
            console.log(err);
            res.status(500).json({
                error: 'Unable to fetch songs'
            });
        }
    } else {
        res.status(401).send({
            message: "Artist ID not correctly formatted"
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
    console.log(name, artist)
    if (!name || !artist) {
        return res.status(400).json({
            status: 'Bad Request',
            message: 'Both name and artist must be provided in the request body',
        });
    }

    if (checkArtistName(artist)) {
        const songUUID = uuidv4();

        try {
            const existingSong = await db('songs').select("id").where("name", name);

            if (existingSong.length > 0) {
                return res.status(409).json({
                    status: "Bad Request",
                    message: "This song already exists"
                });
            }

            const existingArtist = await db('artists').select("id").where("name", artist).first();

            const toPostSong = {
                name: name,
                artist_id: existingArtist.id,
                uuid: songUUID
            }
            if (existingArtist) {
                const resp = await db('songs')
                    .insert(toPostSong);

                return res.status(201).json({
                    status: "OK Request",
                    message: "Song added!",
                    data: toPostSong
                });
            } else {
                return res.status(404).json({
                    status: "Not Found",
                    message: "This artist doesn't exist"
                });
            }
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                status: 'Internal Server Error'
            });
        }
    } else {
        res.status(401).send({
            message: "Artist name not correctly formatted"
        });
    }

});


module.exports = router;