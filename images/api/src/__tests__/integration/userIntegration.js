const request = require('supertest');
const app = require('../../app.js');
const knexfile = require('../../db/knexfile.js');
const db = require('knex')(knexfile.development);


const user = {
    username: 'thealiciachickenwings',
    password: 'alicia',
    email: 'alicia@gmail.com'
};

describe('GET /users', () => {
    beforeAll(async () => {
        await db.raw('BEGIN');
        await request(app).post('/users').send(user);
    });

    afterAll(async () => {
        await db.destroy();
    });

    test('should return a list of all users', async () => {
        const response = await request(app).get('/users');
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });
});

describe('GET /users/:userid', () => {
    beforeAll(async () => {
        await db.raw('BEGIN');
    });

    afterAll(async () => {
        await db.destroy();
    });

    test('should return user by id', async () => {
        const response = await request(app).get('/users/1');
        expect(response.status).toBe(200);
        expect(response.body.id).toBe(1); // Assuming user with id 1 exists
    });

    test('should return 404 for non-existent user', async () => {
        const nonExistentUserId = 999;
        const response = await request(app).get(`/users/${nonExistentUserId}`);
        expect(response.status).toBe(404);
    });
});