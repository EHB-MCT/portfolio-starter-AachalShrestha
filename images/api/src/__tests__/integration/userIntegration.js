const request = require('supertest');
const app = require('../../app');
const knexfile = require('../../db/knexfile');
const db = require('knex')(knexfile.development);

const user = {
    username: 'thealiciachickenwings',
    email: 'alicia@gmail.com',
    password: 'onetwothree'
};

let USERID;

describe('users', () => {
    beforeAll(async () => {
        await db.raw('BEGIN');
        [USERID] = await db('users').insert(user).returning('id');
    });

    afterAll(async () => {
        await db('users').where({
            email: user.email
        }).delete();
        await db.destroy();
    });

    test('GET /users should return a list of all users', async () => {
        const response = await request(app).get('/users');
        expect(response.status).toBe(200);

        const users = response.body;
        expect(Array.isArray(users)).toBe(true);
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