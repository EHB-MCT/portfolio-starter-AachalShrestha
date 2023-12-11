//CHATGPT said to put this:
/* jshint esversion: 6 */


const express = require('express');
const knex = require('knex');
const knexfile = require('../db/knexfile.js');
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


const {
    checkUserName,
    checkPassword,
    checkUserEmail
} = require("../helpers/userEndPointChecker.js");


const {
    checkNumber
} = require("../helpers/songEndpointChecker.js");

/**
 * Get all users.
 *
 * @param {import("express").Request} req - Express Request object.
 * @param {import("express").Response} res - Express Response object.
 * @returns {Promise<void>} - Promise representing the asynchronous operation.
 */

router.get('/users', async (req, res) => {
    try {
        await db('users')
            .select('id', 'username', 'email')
            .then((users) => {
                res.json(users);
            })
    } catch {
        (error) => {
            console.error(error);
            res.status(500).json({
                status: 'Internal Server Error'
            });
        }
    };
});

router.get('/users/:userid', async (req, res) => {
    const id = parseInt(req.params.userid, 10);
    console.log('Received user ID:', id);

    if (checkNumber(id)) {
        try {
            // Use async/await for database query
            const allusers = await db('users').select('*');
            console.log("USER ROUTE all users:", allusers)
            await db('users')
                .where({
                    id
                })
                .first().then((user) => {
                    console.log("user", user);
                    if (user) {
                        res.status(200).send({
                            data: user
                        });
                    } else {
                        // Handle case where user with the given ID is not found
                        res.status(404).json({
                            status: 'User not found'
                        });
                    }
                });

        } catch (error) {
            console.error(error);
            // Handle database query error
            res.status(500).json({
                status: 'Internal Server Error'
            });
        }
    } else {
        // Handle case where userId is not a valid number
        res.status(401).send({
            message: "User ID not correctly formatted"
        });
    }
});


/**
 * Register a new user.
 *
 * @param {import("express").Request} req - Express Request object.
 * @param {import("express").Response} res - Express Response object.
 * @returns {Promise<void>} - Promise representing the asynchronous operation.
 */
router.post('/users/register', async (req, res) => {
    try {
        const {
            username,
            email,
            password
        } = req.body;

        const userUUID = uuidv4();

        if (checkUserName(username) && checkPassword(password)) {
            if (!username || !email || !password) {
                res.status(400).json({
                    status: "Bad Request",
                    message: "Some fields are missing: username, email, password"
                });
            } else {
                const existingUser = await db("users").select().where("email", email).first();

                if (existingUser) {
                    res.status(409).json({
                        status: "Conflict",
                        message: "User with this email already exists"
                    });
                } else {
                    const resp = await db("users").insert({
                        username: username,
                        email: email,
                        password: password
                    }).returning();

                    res.status(200).json({
                        status: "OK",
                        message: `User has been registered!: ${username, email}`
                    });
                }
            }
        } else {
            res.status(401).send({
                message: "username or password not correctly formatted"
            });
        }


    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 'Internal Server Error',
            error: error.message, // Include additional error details if needed
        });
    }
});


/**
 * Log in a user.
 *
 * @param {import("express").Request} req - Express Request object.
 * @param {import("express").Response} res - Express Response object.
 * @returns {Promise<void>} - Promise representing the asynchronous operation.
 */
router.post('/users/login', async (req, res) => {
    try {
        const {
            email,
            password
        } = req.body;

        const userUUID = uuidv4();

        if (checkUserEmail(email)) {
            if (!email || !password) {
                res.status(400).send({
                    status: "Bad request",
                    message: "Some fields are missing: email, password"
                });
            } else {
                const existingUser = await db("users").select().where("email", email).first();
                console.log(existingUser);
                if (existingUser) {
                    if (existingUser.password == password) {
                        res.status(200).send({
                            status: "OK request",
                            message: "logged in",
                            data: existingUser
                        });
                    } else {
                        res.status(401).json({
                            status: "Unauthorized",
                            message: "Wrong password"
                        });
                    }
                } else {
                    res.status(401).json({
                        status: "Unauthorized",
                        message: "User with this email doesn't exist"
                    });
                }
            }
        } else {
            res.status(401).send({
                message: "email not correctly formatted"
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 'Internal Server Error'
        });
    }
});

/**
 * Add a song to favorites of a user.
 *
 * @param {import("express").Request} req - Express Request object.
 * @param {import("express").Response} res - Express Response object.
 * @returns {Promise<void>} - Promise representing the asynchronous operation.
 */
router.post('/users/add-favorite-song', async (req, res) => {
    const {
        user_id,
        favorite_song_id
    } = req.body;


    try {
        if (checkNumber(user_id) && checkNumber(favorite_song_id)) {
            const existingFavoriteSong = await db("users_songs").select().where({
                user_id,
                favorite_song_id
            }).first();

            if (existingFavoriteSong) {
                res.status(409).send({
                    status: "Conflict",
                    message: "This song is already in favorites",
                });
            } else {
                await db("users_songs").insert({
                    user_id,
                    favorite_song_id,
                });

                res.status(200).send({
                    status: "OK request",
                    message: "Song added to favorites",
                });
            }
        } else {
            res.status(401).send({
                message: "song id or user id not correctly formatted"
            });

        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'Unable to add song to favorites',
        });

    }
});

/**
 * Delete a favorite song of a user.
 *
 * @param {import("express").Request} req - Express Request object.
 * @param {import("express").Response} res - Express Response object.
 * @returns {Promise<void>} - Promise representing the asynchronous operation.
 */
router.delete('/users/delete-favorite-song', async (req, res) => {
    const {
        user_id,
        favorite_song_id
    } = req.body;

    try {
        const existingFavoriteSong = await db("users_songs").select().where({
            user_id,
            favorite_song_id
        }).first();

        if (existingFavoriteSong) {
            const deletedCount = await db("users_songs")
                .where({
                    user_id,
                    favorite_song_id
                })
                .del();

            if (deletedCount > 0) {
                res.status(200).send({
                    status: "OK request",
                    message: "Song removed from favorites",
                });
            } else {
                res.status(404).send({
                    status: "Bad request",
                    message: "Song not removed from favorites",
                });
            }
        } else {

            res.status(409).send({
                status: "Bad request",
                message: "This song is not in favorites",
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'Unable to delete song from favorites',
        });
    }
});

/**
 * Get favorite songs of a user.
 *
 * @param {import("express").Request} req - Express Request object.
 * @param {import("express").Response} res - Express Response object.
 * @returns {Promise<void>} - Promise representing the asynchronous operation.
 */
router.get('/users/:user_id/favorite-songs', async (req, res) => {
    const user_id = req.params.user_id;
    console.log(user_id);
    try {
        const fetch_favorite_songs = await db('users_songs')
            .select()
            .where("user_id", user_id);

        const favorite_songs = [];

        await Promise.all(
            fetch_favorite_songs.map(async (song) => {
                const getSongs = await db('songs')
                    .select()
                    .where("id", song.favorite_song_id);
                favorite_songs.push(getSongs[0]);
            })
        );

        console.log(favorite_songs);

        res.status(200).send({
            status: "OK request",
            data: favorite_songs
        });



    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'Unable to fetch songs'
        });

    }

});

module.exports = router;