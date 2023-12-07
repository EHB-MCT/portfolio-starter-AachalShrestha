const request = require('supertest');
const app = require('../../app'); // Update the path as needed
const knexfile = require('../../db/knexfile');
const db = require('knex')(knexfile.development);

const ARTIST = {
    name: 'testartist'
};

const SONG = {
    name: 'testsong',
    artist_id: 1,
};

describe('Song Integration Tests', () => {
    beforeAll(async () => {
        // Create artist
        await db('artists').insert(ARTIST);

        const song = {
            name: 'testsong',
            artist_id: 1,
        };
        await db('songs').insert(SONG);
    });

    afterAll(async () => {
        await db('songs').where({
            name: 'testsong'
        }).delete();
        await db('artists').where({
            name: 'testartist'
        }).delete();
        await db.destroy();
    });

    test('GET /songs should return a list of all songs', async () => {
        const response = await request(app).get('/songs');
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body.data)).toBe(true);
    });

    // Add more tests as needed
});