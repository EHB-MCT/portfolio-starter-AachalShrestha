const request = require('supertest');
const app = require('../../index.js');
const knexfile = require('../../knexfile.js');
const db = require('knex')(knexfile.development);

describe('GET /users', () => {
    beforeAll(async () => {
        await db.raw('BEGIN');
    });

    afterAll(async () => {
        await db.destroy();
    });

    test('should return a list of all users', async () => {
        // Perform the request to the /users endpoint
        const response = await request(app).get('/users');

        // Check if the status code is 200 (OK)
        expect(response.status).toBe(200);

        // Add more assertions based on your API response structure and expectations
        // For example, you might check if the response body is an array of users
        expect(Array.isArray(response.body)).toBe(true);
        // You might also check specific properties of the users in the array
        // ...

        // If you're using a transaction, you may need to commit it here
        // await db.commit();
    });
});