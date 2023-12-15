const request = require('supertest');
const app = require('../../../app'); // Update the path as needed
const knexfile = require('../../../db/knexfile');
const db = require('knex')(knexfile.development);

describe('POST /users/delete-favorite-song', () => {
    let artistId;
    let userId;
    let favSongId;
    let nonExistingSongId;
    const user = {
        username: 'existingUser',
        email: 'existing@user.com',
        password: 'onetwothree'
    };

    const testArtist = {
        name: 'testArtist'
    };

    const testSong = 'testSong';

    const nonExistingSong = 'nonExistingSong';

    beforeAll(async () => {
        [artistId] = await db('artists').insert(testArtist).returning('id');

        [favSongId] = await db('songs').insert({
            name: testSong,
            artist_id: artistId.id
        }).returning('id');

        [nonExistingSongId] = await db('songs').insert({
            name: nonExistingSong,
            artist_id: artistId.id
        }).returning('id');

        [userId] = await db('users').insert(user).returning('id');

        await db("users_songs").insert({
            user_id: userId.id,
            favorite_song_id: favSongId.id,
        });
    });

    afterAll(async () => {
        await db('songs').where({
            name: 'testSong'
        }).delete();
        await db('songs').where({
            name: 'nonExistingSong'
        }).delete();
        await db('artists').where({
            name: 'testArtist'
        }).delete();
        await db('users').where({
            email: user.email
        }).delete();
        await db.destroy();
    });


    test("should return 200 to delete a song from a user's favorites", async () => {
        console.log("THESONG THAT IS IN FAVORITES", favSongId)
        const response = await request(app)
            .delete('/users/delete-favorite-song')
            .send({
                user_id: userId.id,
                favorite_song_id: favSongId.id
            });
        expect(response.status).toBe(200);
        const responseBody = response.body;
        expect(responseBody.status).toBe('OK Request');
        expect(responseBody.message).toBe('Song removed from favorites');
    });

    test('should return 409 if song is not in favorites', async () => {
        const response = await request(app)
            .delete('/users/delete-favorite-song')
            .send({
                user_id: userId.id,
                favorite_song_id: nonExistingSongId.id,
            });
        expect(response.status).toBe(409);
        expect(response.body.message).toBe('This song is not in favorites');
    });
    test('should return 401 incorrectly formatted fields', async () => {
        const incorrectlyFormattedIds = {
            user_id: "one",
            favorite_song_id: "two"
        };
        const response = await request(app)
            .delete('/users/delete-favorite-song')
            .send(incorrectlyFormattedIds);
        expect(response.status).toBe(401);
        expect(response.body.message).toBe("song id or user id not correctly formatted");
    });
});