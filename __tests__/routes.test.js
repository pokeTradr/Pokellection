// make sure no spurious imports/requires up here
const request = require('supertest');
// const server = require('./../server/server');
const app = 'http://localhost:3000'; // where the server is being hosted

// after all, shut down the server

describe('test express routes', () => {
  // afterAll(async () => {
  //   jest.setTimeout(10000);
  //   await server.close();
  // });

  describe('/', () => {
    describe('GET', () => {
      test('responds with 200', async () => {
        try {
          const result = await request(app).get('/').expect(200);
          // result.expect(200);
          console.log('succesful test', result.status);
        } catch (err) {
          console.log(err);
        }
      });
    });
  });

  // test('signup and login routes', () => {
  //   expect(false).toEqual(true);
  // });
});
