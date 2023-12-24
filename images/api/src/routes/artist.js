const express = require('express');
const knex = require('knex');
const knexfile = require('../db/knexfile.js');
const {
    v4: uuidv4
} = require('uuid');
const router = express.Router();
const PORT = 3000;

const db = knex(knexfile.development);
const {
    checkArtistName
} = require("../helpers/artistEndpointChecker.js");

const {checkNumber} = require("../helpers/songEndpointChecker.js")
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
            res.status(200).send({
                status: "OK request",
                data: artists,
            });
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
        name
    } = req.body;
    const artistUUID = uuidv4();
    const existingArtist = await db("artists").select().where("name", name).first();
    console.log("existingartist", existingArtist)
    if (checkArtistName(name)) {
        if (existingArtist) {
            res.status(409).send({
                status: "OK Request",
                message: "This artist already exists",
            });
        } else {
            const resp = await db("artists")
                .insert({
                    name: name,
                    uuid: artistUUID
                })
                .returning();

            res.status(201).send({
                status: "OK Request",
                message: `Artist added!: ${name}`,
            });
        }
    } else {

        res.status(401).send({
            message: "Artist name not correctly formatted"
        });

    }
});

router.get('/artists/:artist_id', async (req, res) => {
    const id = parseInt(req.params.artist_id, 10);
    if (checkNumber(id)) {
        try {
            const existingArtist = await db('artists').select().where("id", id);
            console.log("existingartist:", existingArtist);
            if (existingArtist.length > 0) {
                    res.status(200).send({
                        status: "OK request",
                        message: `Got artist with ID:${id}`,
                        data: existingArtist
                    });
            } else {
                res.status(404).json({
                    status: "Artist doesn't exist"
                });
            }

        } catch (error) {
            console.log(err);
            res.status(500).json({
                error: 'Unable to fetch artist'
            });
        }
    } else {
        res.status(401).send({
            message: "Artist ID not correctly formatted"
        });
    }

});

module.exports = router;