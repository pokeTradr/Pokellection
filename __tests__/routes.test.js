const request = require('supertest');
const app = require('./../server/server');

// after all, shut down the server
afterAll(() => {
  app.close();
});

describe('test express routes', () => {
  test('signup and login routes', () => {
    expect(false).toEqual(true);
  });
});
