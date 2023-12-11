const request = require('supertest');
const app = require('../../app');
const knexfile = require('../../db/knexfile');
const db = require('knex')(knexfile.development);

const user = {
    username: 'thealiciachickenwings',
    email: 'alicia@gmail.com',
    password: 'onetwothree'
};

describe('GET /users/:userid', () => {
    let userId;

    beforeAll(async () => {
        // No need to start a transaction here, Supertest runs each test in a transaction
        [userId] = await db('users').insert(user).returning('id');
        console.log(userId);
    });

    afterAll(async () => {
        // No need to roll back the transaction here
        await db.destroy();
        console.log("Database connection closed");
    });

    test('should return user by id', async () => {
        const response = await request(app).get(`/users/${userId.id}`);
        const allusers = await db('users').select('*')

        console.log("inserted user", allusers);
        expect(response.status).toBe(200);
        expect(response.body.data).toHaveProperty('id', userId.id);
    });
});


/*     test('should return 404 for non-existent user', async () => {
        const nonExistentUserId = 999;
        const response = await request(app).get(`/users/${nonExistentUserId}`);
        expect(response.status).toBe(401);
    }); */