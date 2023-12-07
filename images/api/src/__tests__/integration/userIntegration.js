const request = require('supertest');
const app = require('../../app'); // Update the path as needed
const knexfile = require('../../db/knexfile');
const db = require('knex')(knexfile.development);


const user = {
    username: 'thealiciachickenwings',
    email: 'alicia@gmail.com',
    password: 'onetwothree'
};

describe('GET /users', () => {
    beforeAll(async () => {
        db.raw('BEGIN')
            .then(() => {
                console.log('Database connection successful');
            })
            .catch((error) => {
                console.error('Database connection error:', error.message);
            });
        await db('users').insert(user);
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
        console.log(response.body)
        expect(Array.isArray(response.body)).toBe(true);
    });
});

/* describe('GET /users/:userid', () => {
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
}); */