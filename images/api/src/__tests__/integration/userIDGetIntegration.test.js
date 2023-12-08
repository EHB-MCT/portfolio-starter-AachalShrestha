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
describe('GET /users/:userid', () => {
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

    test('should return user by id', async () => {
        const response = await request(app).get(`/users/${parseInt(USERID.id, 10)}`);
        const allusers = await db('users').select('*');
        console.log('all users HGJHHJHGJGH:', allusers, USERID.id);
        console.log("response body", response.body);
        expect(response.status).toBe(200);
        expect(response.body.id).toBe(USERID.id);
    });

    /*     test('should return 404 for non-existent user', async () => {
            const nonExistentUserId = 999;
            const response = await request(app).get(`/users/${nonExistentUserId}`);
            expect(response.status).toBe(401);
        }); */
});