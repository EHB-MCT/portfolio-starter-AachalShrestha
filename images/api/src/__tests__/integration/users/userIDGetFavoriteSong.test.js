const request = require('supertest');
const app = require('../../../app');
const knexfile = require('../../../db/knexfile');
const db = require('knex')(knexfile.development);


describe('GET /users/:user_id/favorite-songs', () => {
    let userId;
    let artistId;
    let songId1;
    let songId2;

    const user = {
        username: 'thealiciachickenwings',
        email: 'alicia@gmail.com',
        password: 'onetwothree'
    };

    const testArtist = {
        name: 'testArtist'
    };

    const testSong1 = 'testSong1';
    const testSong2 = 'testSong2';
    beforeAll(async () => {
        [artistId] = await db('artists').insert(testArtist).returning('id');
        [userId] = await db('users').insert(user).returning('id');
        [songId1] = await db('songs').insert({
            name: testSong1,
            artist_id: artistId.id
        }).returning('id');
        [songId2] = await db('songs').insert({
            name: testSong2,
            artist_id: artistId.id
        }).returning('id');
        await db("users_songs").insert({
            user_id: userId.id,
            favorite_song_id: songId1.id,
        });
        await db("users_songs").insert({
            user_id: userId.id,
            favorite_song_id: songId2.id,
        });
    });

    afterAll(async () => {
        await db('songs').where({
            name: testSong1
        }).delete();
        await db('songs').where({
            name: testSong2
        }).delete();
        await db('artists').where({
            name: 'testArtist'
        }).delete();
        await db('users').where({
            email: 'alicia@gmail.com'
        }).delete();
        await db.destroy();
    });

    test('should return user by id', async () => {
        const response = await request(app).get(`/users/${userId.id}/favorite-songs`);
        console.log(response.body);
        expect(response.status).toBe(200);
        expect(response.body.status).toBe("OK request");
        expect(response.body.data[0]).toHaveProperty('artist_id', artistId.id);

    });
});