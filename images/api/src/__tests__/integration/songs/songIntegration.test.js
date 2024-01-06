const request = require('supertest');
const app = require('../../../app'); 
const knexfile = require('../../../db/knexfile');
const db = require('knex')(knexfile.development);

const ARTIST = {
    name: 'testartist2'
};

const SONG = {
    name: 'testsong2',
    artist_id: 1,
};

describe('Song Integration Tests', () => {
    beforeAll(async () => {
        try {
            const [insertedArtistId] = await db('artists').insert(ARTIST).returning('id');
            artistId = insertedArtistId.id;

            await db('songs').insert({
                ...SONG,
                artist_id: artistId
            });
        } catch (error) {
            console.error('Error during setup:', error.message);
        }
    });

    afterAll(async () => {
        try {
            await db('songs').where({
                name: 'testsong2'
            }).delete();
            await db('artists').where({
                name: 'testartist2'
            }).delete();
        } catch (error) {
            console.error('Error during cleanup:', error.message);
        } finally {
            await db.destroy();
        }
    });

    test('GET /songs should return a list of all songs', async () => {
        const response = await request(app).get('/songs');
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body.data)).toBe(true);
    });


});