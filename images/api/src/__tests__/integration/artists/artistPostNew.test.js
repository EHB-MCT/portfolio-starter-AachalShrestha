const request = require('supertest');
const app = require('../../../app'); // Update the path as needed
const knexfile = require('../../../db/knexfile');
const db = require('knex')(knexfile.development);

describe('POST /artists', () => {

    const testArtist = {
        name: 'testArtist',
    };

    const existingArtist = {
        name: 'existingArtist'
    }

    beforeAll(async () => {
        await db.raw('BEGIN');
    });

    afterAll(async () => {
        try {
            await db('artists').where({
                name: testArtist.name
            }).delete();
            await db('artists').where({
                name: existingArtist.name
            }).delete();
        } catch (error) {
            console.error('Error during cleanup:', error.message);
        } finally {
            await db.destroy();
        }
    });

    test('should create a new artist', async () => {
        const response = await request(app)
            .post('/artists')
            .send(testArtist);
        console.log("POST ARTIST: response", response.body);
        expect(response.status).toBe(201);
        const responseBody = response.body;
        expect(responseBody.status).toBe('OK Request');
    });

    test('should return 409 for already existing artist', async () => {
        const response = await request(app)
            .post('/artists')
            .send({
                name: existingArtist.name
            });
        expect(response.status).toBe(409);
        expect(response.body.message).toBe('This artist already exists');
    });


    test('should return 401 for a non existing artist', async () => {
        const incorrectlyFormattedArtistName = 123;
        const response = await request(app)
            .post('/artists')
            .send({
                name: incorrectlyFormattedArtistName,
            });
        expect(response.status).toBe(401);
        expect(response.body.message).toBe("Artist name not correctly formatted");
    });
});