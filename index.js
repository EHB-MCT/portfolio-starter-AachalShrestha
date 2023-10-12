const express = require('express')
const app = express()
const port = 3000

require('dotenv').config();

var bodyParser = require('body-parser')



const {
    MongoClient
} = require("mongodb")
const url = process.env.url;

const client = new MongoClient(url);

app.use(bodyParser.json())

app.get('/', async (req, res) => {
    try {

        await client.connect();

        const coll = client.db('DEV_5').collection('songs');

        //get all dances
        const allDances = await coll.find({}).toArray();
        console.log(allDances);
        res.status(200).send({
            status: 'OK request',
            message: 'got all dances',
            data: allDances
        });

    } catch (err) {

        console.log(err.stack);

    } finally {

        await client.close();

    }
})

app.post('/song', async (req, res) => {
    try {
        await client.connect();
        const coll = client.db('course_project').collection('songs');
        const song = {
            singer: req.body.singer,
            title: req.body.title
        }

        await coll.insertOne(song);

        res.status(201).send({
            status: "OK request",
            message: "song saved",
            data: {
                name: song.singer,
                dance_steps: song.title
            }

        });
    } catch (err) {
        console.log(err.stack);
        res.send(err);
    }

});


app.listen(port, async () => {
    console.log(`Example app listening on port ${port}`)

})