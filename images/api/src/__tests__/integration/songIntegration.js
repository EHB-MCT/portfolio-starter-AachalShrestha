const request = require('supertest');
const app = require('../../app'); // Update the path as needed
const knexfile = require('../../db/knexfile');
const db = require('knex')(knexfile.development);

describe('Song Integration Tests', () => {
    beforeAll(async () => {
        // Create artist
        const artist = {
            name: 'testartist'
        };
        await db('artists').insert(artist);

        const song = {
            name: 'testsong',
            artist_id: 1,
        };
        await db('songs').insert(song);
    });

    afterAll(async () => {
        await db.destroy();
    });

    test('GET /songs should return a list of all songs', async () => {
        const response = await request(app).get('/songs');
        console.log(response.body)
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body.data)).toBe(true);
    });

    // Add more tests as needed
});