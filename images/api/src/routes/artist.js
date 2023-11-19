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

/**
 * Get all artists.
 *
 * @param {import("express").Request} req - Express Request object.
 * @param {import("express").Response} res - Express Response object.
 * @returns {Promise<void>} - Promise representing the asynchronous operation.
 */
router.get('/artists', (req, res) => {
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

/**
 * Post a new artist.
 *
 * @param {import("express").Request} req - Express Request object.
 * @param {import("express").Response} res - Express Response object.
 * @returns {Promise<void>} - Promise representing the asynchronous operation.
 */
router.post('/artists', async (req, res) => {
    const {
        name,
        age
    } = req.body;
    const artistUUID = uuidv4();
    const existingArtist = await db("artists").select().where("name", name).first();

    if (existingArtist) {
        res.status(409).send({
            message: "This artist already exists"
        });
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

module.exports = router;