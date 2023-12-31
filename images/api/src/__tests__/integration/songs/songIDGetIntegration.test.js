const request = require('supertest');
const app = require('../../../app'); 
const knexfile = require('../../../db/knexfile');
const db = require('knex')(knexfile.development);

describe('GET /songs/:artist_id', () => {
    const ARTIST = {
        name: 'testartist2',
    }

    let artistId;
    const SONG1 = {
        name: 'testsong1',
        artist_id: 1,
    };
    const SONG2 = {
        name: 'testsong2',
        artist_id: 1,
    };



    beforeAll(async () => {
        try {
            const [insertedArtistId] = await db('artists').insert(ARTIST).returning('id');
            artistId = insertedArtistId.id;
            await db('songs').insert({
                ...SONG1,
                artist_id: artistId
            });
            await db('songs').insert({
                ...SONG2,
                artist_id: artistId
            });
        } catch (error) {
            console.error('Error during setup:', error.message);
        }
    });

    afterAll(async () => {
        try {
            await db('songs').where({
                name: 'testsong1'
            }).delete();
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

    test('should return all songs from a certain artist', async () => {
        const response = await request(app).get(`/songs/${artistId}`);
        expect(response.status).toBe(200);
        const responseBody = response.body;
        expect(responseBody.status).toBe('OK request');
        if (responseBody.data.length > 0) {
            const firstSong = responseBody.data[0];
            expect(firstSong).toHaveProperty('id');
            expect(firstSong).toHaveProperty('name');
        }
    });

    test('should return 404 for non-existent artist', async () => {
        const nonExistentArtistId = 999;
        const response = await request(app).get(`/songs/${nonExistentArtistId}`);
        expect(response.status).toBe(404);
    });

    test('should return 401 for incorrectly formatted artist ID', async () => {
        const nonExistentArtistId = "f";
        const response = await request(app).get(`/songs/${nonExistentArtistId}`);
        expect(response.status).toBe(401);
        expect(response.body.message).toBe('Artist ID not correctly formatted');
    });
});