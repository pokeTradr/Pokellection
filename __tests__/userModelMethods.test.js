// writing tests using the mongo memory server
// possible refactor? https://jestjs.io/docs/mongodb

const { MongoMemoryServer } = require('mongodb-memory-server-core');
const mongoose = require('mongoose');
const User = require('../server/models/userModel');
// const { exit } = require('process');

console.log(MongoMemoryServer);

describe('mongo db tests', () => {
  let mongo;
  beforeAll(async () => {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

    mongo = await MongoMemoryServer.create();
    const mongoUri = await mongo.getUri();

    await mongoose.connect(mongoUri);
  });

  beforeEach(async () => {
    const collections = await mongoose.connection.db.collections();

    for (let collection of collections) {
      await collection.deleteMany({});
    }
  });

  afterAll(async () => {
    jest.setTimeout(20000);
    await mongo.stop();
    await mongoose.connection.close();
  });
  // checks that database is connected
  test('can create a new signed up user', async () => {
    // set the parameters for a new user
    const testUser = {
      username: 'Imatest',
      password: 'hardtoguess',
    };
    const { username, password } = await User.create(testUser);

    const compare = { username, password };
    expect(testUser).toEqual(compare);
  });

  test('rejects incrorrectly formatted username prop', async () => {
    const testUser = {
      user: 'Imatest',
      password: 'hardtoguess',
    };
    try {
      const result = await User.create(testUser);
    } catch (err) {
      const result = err;
      //   console.log('the result:', result);
      //   console.log('message:_', result._message);
      expect(result._message).toEqual('User validation failed');
    }
  });

  // reject incorrectly formatted password
  test('rejects incrorrectly formatted password prop', async () => {
    const testUser = {
      username: 'Imatest',
      passwo: 'hardtoguess',
    };
    try {
      const result = await User.create(testUser);
    } catch (err) {
      const result = err;
      //   console.log('message:_', result._message);
      expect(result._message).toEqual('User validation failed');
    }
  });
});
