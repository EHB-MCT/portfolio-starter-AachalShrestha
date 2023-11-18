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
    const {
        username,
        email,
        password
    } = req.body;

    const userUUID = uuidv4();

    const existingUser = await db("users").select().where("email", email).first();
    if (!username || !email || !password) {
        res.status(400).send({
            status: "Bad request",
            message: "Some fields are missing: username, email, password"
        });
    } else {
        if (existingUser) {
            res.status(409).send({
                message: "User with this email already exists"
            });
        } else {
            const resp = await db("users").insert({
                    username: username,
                    email: email,
                    password: password
                })
                .returning();

            res.status(200).send({
                message: `User has been registered!: ${username, email}`
            });
        }
    }
})

module.exports = router;