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

router.get('/users', async (req, res) => {
    db('users')
        .select('*')
        .then((users) => {
            res.json(users);
        })
        .catch((error) => {
            console.error(error);
            res.status(500).json({
                error: 'Unable to fetch users'
            });
        });
})

router.post('/users/register', async (req, res) => {
    try {
        const {
            username,
            email,
            password
        } = req.body;

        const userUUID = uuidv4();

        if (!username || !email || !password) {
            res.status(400).send({
                status: "Bad request",
                message: "Some fields are missing: username, email, password"
            });
        } else {
            const existingUser = await db("users").select().where("email", email).first();

            if (existingUser) {
                res.status(409).send({
                    message: "User with this email already exists"
                });
            } else {
                const resp = await db("users").insert({
                    username: username,
                    email: email,
                    password: password
                }).returning();

                res.status(200).send({
                    message: `User has been registered!: ${username, email}`
                });
            }
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'Internal Server Error'
        });
    }
});

router.post('/users/login', async (req, res) => {
    try {
        const {
            email,
            password
        } = req.body;

        const userUUID = uuidv4();

        if (!email || !password) {
            res.status(400).send({
                status: "Bad request",
                message: "Some fields are missing: email, password"
            });
        } else {
            const existingUser = await db("users").select().where("email", email).first();

            if (existingUser) {
                if (existingUser.password == password) {
                    res.status(200).send({
                        status: "OK request",
                        message: "logged in",
                        data: existingUser
                    });
                } else {
                    res.status(401).send({
                        status: "Bad request",
                        message: "Wrong password"
                    });
                }
            } else {
                res.status(401).send({
                    status: "Bad request",
                    message: "User with this email doesn't exist"
                });
            }
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'Internal Server Error'
        });
    }
});

router.post('/users/add-favorite-song', async (req, res) => {
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
            res.status(409).send({
                message: "This song is already in favorites",
            });
        } else {
            await db("users_songs").insert({
                user_id,
                favorite_song_id,
            });

            res.status(200).send({
                message: "Song added to favorites",
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'Unable to add song to favorites',
        });
    }
});
//DELETE a favourite song of a user

//GET favourite song of a user



module.exports = router;