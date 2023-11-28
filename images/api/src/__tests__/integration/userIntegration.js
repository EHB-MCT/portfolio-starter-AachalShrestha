const request = require('supertest');
const app = require('../../index.js');
const knexfile = require('../../knexfile.js');
const db = require("knex")(knex.development);

describe('GET /users', () => {
    beforeAll(async () => {
        await db.raw('BEGIN');
    });

    afterAll(async () => {
        await db.destroy();
    });

    test('should return a list of all users', async () => {

        const response = await request(app).get('/users');

        // Check if the status code is 200 (OK)
        expect(response.status).toBe(200);

    });
});