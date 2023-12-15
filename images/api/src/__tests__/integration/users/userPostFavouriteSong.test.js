const request = require('supertest');
const app = require('../../../app'); // Update the path as needed
const knexfile = require('../../../db/knexfile');
const db = require('knex')(knexfile.development);

describe('POST /users/add-favorite-song', () => {
    let artistId;
    let userId;
    let alreadyFavSongId;
    let newSongId;
    const user = {
        username: 'existingUser',
        email: 'existing@user.com',
        password: 'onetwothree'
    };

    const testArtist = {
        name: 'testArtist'
    };

    const testSong = 'testSong';

    const newSong = 'newSong';

    beforeAll(async () => {
        [artistId] = await db('artists').insert(testArtist).returning('id');

        [alreadyFavSongId] = await db('songs').insert({
            name: testSong,
            artist_id: artistId.id
        }).returning('id');

        [newSongId] = await db('songs').insert({
            name: newSong,
            artist_id: artistId.id
        }).returning('id');

        [userId] = await db('users').insert(user).returning('id');

        await db("users_songs").insert({
            user_id: userId.id,
            favorite_song_id: alreadyFavSongId.id,
        });
    });

    afterAll(async () => {
        await db('songs').where({
            name: 'testSong'
        }).delete();
        await db('songs').where({
            name: 'newSong'
        }).delete();
        await db('artists').where({
            name: 'testArtist'
        }).delete();
        await db('users').where({
            email: user.email
        }).delete();
        await db.destroy();
    });


    test("should return 200 to add a song to a user's favorites", async () => {
        console.log("ALREADYEXISTINGSONGID", alreadyFavSongId)
        const response = await request(app)
            .post('/users/add-favorite-song')
            .send({
                user_id: userId.id,
                favorite_song_id: newSongId.id
            });
        expect(response.status).toBe(200);
        const responseBody = response.body;
        expect(responseBody.status).toBe('OK Request');
    });

    test('should return 409 is song is already in favorites', async () => {
        const response = await request(app)
            .post('/users/add-favorite-song')
            .send({
                user_id: userId.id,
                favorite_song_id: alreadyFavSongId.id,
            });
        expect(response.status).toBe(409);
        expect(response.body.message).toBe('This song is already in favorites');
    });

    test('should return 401 incorrectly formatted fields', async () => {
        const incorrectlyFormattedIds = {
            user_id: "one",
            favorite_song_id: "two"
        };
        const response = await request(app)
            .post('/users/add-favorite-song')
            .send(incorrectlyFormattedIds);
        expect(response.status).toBe(401);
        expect(response.body.message).toBe("song id or user id not correctly formatted");
    });
});