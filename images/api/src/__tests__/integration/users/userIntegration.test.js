const request = require('supertest');
const app = require('../../../app');
const knexfile = require('../../../db/knexfile');
const db = require('knex')(knexfile.development);

const user = {
    username: 'thealiciachickenwings',
    email: 'alicia@gmail.com',
    password: 'onetwothree'
};


describe('users', () => {
    beforeAll(async () => {
        [userId] = await db('users').insert(user).returning('id');
    });

    afterAll(async () => {
        await db('users').where({
            email: 'alicia@gmail.com'
        }).delete();
        await db.destroy();
    });

    test('GET /users should return a list of all users', async () => {
        const response = await request(app).get('/users');
        const users = response.body; // Assuming your users are nested under 'data'
        expect(response.status).toBe(200);
        expect(Array.isArray(users)).toBe(true);

        // Check each user in the array
        users.forEach(user => {
            expect(user).toHaveProperty('id');
            expect(user).toHaveProperty('username');
            expect(user).toHaveProperty('email');
        });
    });


});


/* describe('GET /users/:userid', () => {
    beforeEach(async () => {
        await db.raw('BEGIN');
        [USERID] = await db('users').insert(user).returning('id');
    });

    afterEach(async () => {
        await db('users').where({
            email: user.email
        }).delete();
        await db.destroy();
    });

    test('should return user by id', async () => {
        const response = await request(app).get(`/users/${USERID}`);
        expect(response.status).toBe(200);

        expect(response.body.id).toBe(USERID);
    });

    test('should return 404 for non-existent user', async () => {
        const nonExistentUserId = 999;
        const response = await request(app).get(`/users/${nonExistentUserId}`);
        expect(response.status).toBe(404);
    });
}); */