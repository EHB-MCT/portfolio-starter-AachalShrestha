const request = require('supertest');
const app = require('../../app'); // Update the path as needed
const knexfile = require('../../db/knexfile');
const db = require('knex')(knexfile.development);

describe('GET /songs/:artist_id', () => {
    const ARTIST = {
        name: 'testartist2',
    }

    let artistId;
    const SONG = {
        name: 'testsong2',
        artist_id: 1,
    };


    beforeAll(async () => {
        try {
            // Insert the artist
            const [insertedArtistId] = await db('artists').insert(ARTIST).returning('id');
            artistId = insertedArtistId.id;
            console.log("ARTIST ID", artistId)
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
            // Delete the song and artist
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
        const existingartist = await db('artists').select('*');
        const existingsong = await db('songs').select('*');
        console.log(existingartist, existingsong);
        expect(response.status).toBe(200);

        const responseBody = response.body;
        expect(responseBody.status).toBe('OK request');
        expect(responseBody.data).toBeInstanceOf(Array);
        console.log(response.body)
        if (responseBody.data.length > 0) {
            const firstSong = responseBody.data[0];
            expect(firstSong).toHaveProperty('id');
            expect(firstSong).toHaveProperty('title');
        }
    });

    /*     test('should return 401 for incorrectly formatted artist ID', async () => {
            const response = await request(app).get(`/songs/${artistId}`);
            expect(response.status).toBe(401);
            expect(response.body.message).toBe('Artist ID not correctly formatted');
        }); */
});