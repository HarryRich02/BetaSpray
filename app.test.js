const request = require('supertest');
const app = require('./app');

describe('Test climb API calls', () => {
    test('GET /api/climb/get returns climb by index', async () => {
        const response = await request(app).get('/api/climb/get?i=0');
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('name');
        expect(response.body).toHaveProperty('difficulty');
        expect(response.body).toHaveProperty('imgURL');
    });

    test('POST /api/climb/add', async () => {
        const newClimb = {
            floatingName: 'Alphane',
            floatingDifficulty: 'V17',
            floatingImageURL:
                'https://cdn.climbing.com/wp-content/uploads/2022/08/Neilson-021822-05775-scaled.jpg?width=730',
        };
        const response = await request(app)
            .post('/api/climb/add')
            .send(newClimb);
        expect(response.statusCode).toBe(200);
        expect(response.text).toBe('OK');
    });

    test('GET /api/climb/length returns number of climbs', async () => {
        const response = await request(app).get('/api/climb/length');
        expect(response.statusCode).toBe(200);
        expect(Number(response.text)).toBeGreaterThan(0);
    });
});

describe('Comment API Tests', () => {
    test('GET /api/comment/get returns comments by climb', async () => {
        const response = await request(app).get(
            '/api/comment/get?climb=Burden%20of%20Dreams',
        );
        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    test('POST /api/comment/add', async () => {
        const response = await request(app)
            .post('/api/comment/add?climb=Burden%20of%20Dreams')
            .send({
                commentText:
                    'Left hand on a small undercling, right hand on a sharp crimp.',
            });
        expect(response.statusCode).toBe(200);
        expect(response.text).toBe('OK');
    });
});
