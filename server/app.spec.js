const request = require('supertest');
const app = require('./app');

describe('/', () => {
  test('should return {hello: "world" }', async () => {
    const res = await request(app).get('/');
    expect(res.status).toEqual(200);
    expect(res.body).toEqual({ hello: 'world' });
  });
});