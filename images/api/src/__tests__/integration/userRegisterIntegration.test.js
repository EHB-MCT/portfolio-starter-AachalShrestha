const request = require('supertest');
const app = require('../../app'); // Update the path as needed
const knexfile = require('../../db/knexfile');
const db = require('knex')(knexfile.development);

describe('POST /songs', () => {
    let userId;
    const existingUser = {
        username: 'existingUser',
        email: 'existing@user.com',
        password: 'onetwothree'
    };
    const newUser = {
        username: 'newUser',
        email: 'new@user.com',
        password: 'onetwothree'
    };


    beforeAll(async () => {
        [userId] = await db('users').insert(existingUser).returning('id');
    });

    afterAll(async () => {
        await db('users').where({
            email: existingUser.email
        }).delete();
        await db('users').where({
            email: newUser.email
        }).delete();
        await db.destroy();
    });


    test('should return 201 to register a new user', async () => {
        const response = await request(app)
            .post('/users/register')
            .send(newUser);

        console.log("register USER: response", response.body);
        expect(response.status).toBe(201);
        const responseBody = response.body;
        expect(responseBody.status).toBe('OK Request');
    });

    test('should return 409 for already existing user', async () => {
        const response = await request(app)
            .post('/users/register')
            .send(existingUser);
        expect(response.status).toBe(409);
        expect(response.body.message).toBe('User with this email already exists');
    });

    test('should return 401 incorrectly formatted fields', async () => {
        const incorrectlyFormattedEmail = "I'm a user";
        const response = await request(app)
            .post('/users/register')
            .send({
                username: "newUser",
                email: incorrectlyFormattedEmail,
                password: "newPassword"
            });
        expect(response.status).toBe(401);
        expect(response.body.message).toBe("username, email or password not correctly formatted");
    });
});