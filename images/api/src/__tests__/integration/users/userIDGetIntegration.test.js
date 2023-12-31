const request = require('supertest');
const app = require('../../../app');
const knexfile = require('../../../db/knexfile');
const db = require('knex')(knexfile.development);

const user = {
    username: 'thealiciachickenwings',
    email: 'alicia@gmail.com',
    password: 'onetwothree'
};

describe('GET /users/:userid', () => {
    let userId;

    beforeAll(async () => {
        [userId] = await db('users').insert(user).returning('id');
    });

    afterAll(async () => {
        await db('users').where({
            email: 'alicia@gmail.com'
        }).delete();
        await db.destroy();
    });

    test('should return user by id', async () => {
        const response = await request(app).get(`/users/${userId.id}`);
        expect(response.status).toBe(200);
        expect(response.body.data).toHaveProperty('id', userId.id);
    });

    test('should return 404 for non-existent user', async () => {
        const nonExistentUserId = 999;
        const response = await request(app).get(`/users/${nonExistentUserId}`);
        expect(response.status).toBe(404);
    });

    test('should return 401 for incorrectly formatted ID', async () => {
        const nonExistentUserId = "hi";
        const response = await request(app).get(`/users/${nonExistentUserId}`);
        expect(response.status).toBe(401);
    });
});