const { MongoMemoryServer } = require('mongodb-memory-server-core');
const mongoose = require('mongoose');
const User = require('./../server/models/userModel');
// const { exit } = require('process');

console.log(MongoMemoryServer);

describe('mongo db tests', () => {
  let mongo;
  beforeAll(async () => {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

    mongo = await MongoMemoryServer.create();
    const mongoUri = await mongo.getUri();

    await mongoose.connect(mongoUri);
    console.log('connected');
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
  it('can create a new signed up user', (done) => {
    // set the parameters for a new user
    const testUser = {
      username: 'Imatest',
      password: 'hardtoguess',
    };
    User.create(testUser).then((data) => {
      const { username, password } = data;
      const compare = { username, password };
      console.log(data);
      expect(testUser).toEqual(compare);
      done();
    });
  });

  // check that the createUser
  //   afterAll((done) => {
  //     // exit();
  //     done();
  //   });
});
