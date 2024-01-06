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
        const users = response.body; 
        expect(response.status).toBe(200);
        expect(Array.isArray(users)).toBe(true);

        users.forEach(user => {
            expect(user).toHaveProperty('id');
            expect(user).toHaveProperty('username');
            expect(user).toHaveProperty('email');
        });
    });


});

