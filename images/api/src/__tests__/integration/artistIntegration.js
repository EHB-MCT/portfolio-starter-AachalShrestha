const request = require('supertest');
const app = require('../../app'); // Update the path as needed
const knexfile = require('../../db/knexfile');
const db = require('knex')(knexfile.development);

const ARTIST = {
    name: 'testartist'
};

let ARTIST_ID

describe('Song Integration Tests', () => {
    beforeAll(async () => {
        try {
            // Insert the artist
            const [insertedArtistId] = await db('artists').insert(ARTIST).returning('id');
            ARTIST_ID = insertedArtistId.id;

            // Insert the song using the retrieved artistId
        } catch (error) {
            console.error('Error during setup:', error.message);
        }
    });


    afterAll(async () => {
        try {
            // Delete the song and artist
            await db('artists').where({
                name: 'testartist'
            }).delete();
        } catch (error) {
            console.error('Error during cleanup:', error.message);
        } finally {
            await db.destroy();
        }
    });

    test('GET /songs should return a list of all artists', async () => {
        const response = await request(app).get('/artists');
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body.data)).toBe(true);
    });
})