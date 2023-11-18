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
        password
    } = req.body;

    const userUUID = uuidv4();

})

module.exports = router;