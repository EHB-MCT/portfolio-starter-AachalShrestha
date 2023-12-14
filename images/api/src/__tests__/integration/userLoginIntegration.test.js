const request = require('supertest');
const app = require('../../app'); // Update the path as needed
const knexfile = require('../../db/knexfile');
const db = require('knex')(knexfile.development);

describe('POST /user/login', () => {
    let userId;
    const existingUser = {
        username: 'existingUser',
        email: 'existing@user.com',
        password: 'onetwothree'
    };
    const nonExistingUser = {
        username: 'noUser',
        email: 'no@user.com',
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
            email: nonExistingUser.email
        }).delete();
        await db.destroy();
    });


    test('should return 201 to login', async () => {
        const response = await request(app)
            .post('/users/login')
            .send(existingUser);

        console.log("register USER: response", response.body);
        expect(response.status).toBe(200);
        const responseBody = response.body;
        expect(responseBody.status).toBe('OK Request');
    });

    test('should return 401 inexistent email', async () => {
        const response = await request(app)
            .post('/users/login')
            .send(nonExistingUser);
        expect(response.status).toBe(401);
        expect(response.body.message).toBe("User with this email doesn't exist");
    });

    test('should return 401 for wrong password', async () => {
        const response = await request(app)
            .post('/users/login')
            .send({
                email: existingUser.email,
                password: "wrongPassword"
            });
        expect(response.status).toBe(401);
        expect(response.body.message).toBe('Wrong password');
    });

});