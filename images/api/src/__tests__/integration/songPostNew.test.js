const request = require('supertest');
const app = require('../../app'); // Update the path as needed
const knexfile = require('../../db/knexfile');
const db = require('knex')(knexfile.development);

describe('POST /songs', () => {

    const testArtist = {
        name: 'testArtist',
    };
    const testSong = {
        name: 'testSong',
        artist: '',
    };


    beforeAll(async () => {
        try {
            // Insert the artist
            const [insertedArtistName] = await db('artists').insert(testArtist).returning('name');
            testSong.artist = insertedArtistName.name;
            console.log("testSONG", testSong)
        } catch (error) {
            console.error('Error during setup:', error.message);
        }
    });

    afterAll(async () => {
        try {
            // Delete the song and artist
            await db('songs').where({
                name: 'testSong'
            }).delete();
            await db('artists').where({
                name: 'testArtist'
            }).delete();
        } catch (error) {
            console.error('Error during cleanup:', error.message);
        } finally {
            await db.destroy();
        }
    });

    test('should create a song associated with an artist', async () => {
        const response = await request(app)
            .post('/songs')
            .send(testSong);

        console.log("POST USER: response", response.body);
        expect(response.status).toBe(201);
        const responseBody = response.body;
        expect(responseBody.status).toBe('OK Request');
    });

    test('should return 404 for non-existent artist', async () => {
        const nonExistentArtistName = "aliciachickenwings";
        const response = await request(app)
            .post('/songs')
            .send({
                name: 'testSong2',
                artist: nonExistentArtistName
            });
        console.log("NONEXISTENT ARTSITS:", response.body)
        expect(response.status).toBe(404);
    });

    test('should return 409 for already existing song', async () => {
        const incorrectlyFormattedArtistName = 123;
        const response = await request(app)
            .post('/songs')
            .send({
                name: 'testSong',
                artist: incorrectlyFormattedArtistName
            });
        expect(response.status).toBe(401);
        expect(response.body.message).toBe('Artist name not correctly formatted');
    });
    test('should return 404 for a non existing artist', async () => {
        const incorrectlyFormattedArtistName = "newartist";
        const response = await request(app)
            .post('/songs')
            .send({
                name: 'testSong3',
                artist: incorrectlyFormattedArtistName
            });
        expect(response.status).toBe(404);
        expect(response.body.message).toBe("This artist doesn't exist");
    });
});