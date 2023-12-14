const request = require('supertest');
const app = require('../../app'); // Update the path as needed
const knexfile = require('../../db/knexfile');
const db = require('knex')(knexfile.development);

const ARTIST = {
    name: 'testartist'
};


describe('GET /artists', () => {
    beforeAll(async () => {
        try {
            await db('artists').insert(ARTIST).returning('id');
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

    test('Should return a list of all artists', async () => {
        const response = await request(app).get('/artists');
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body.data)).toBe(true);
    });
})