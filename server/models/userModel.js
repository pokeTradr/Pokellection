const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('dotenv').config();

// for sswitching between test/dev
// console.log(process.env);
if (process.env.NODE_ENV !== 'test') {
  mongoose.connect(process.env.mongoURI, {
    useNewURLParser: true,
    useUnifiedTopology: true,
  });
  mongoose.connection.once('open', () => {
    console.log('Connected to mongoDB database');
  });
}

const SALT_WORK_FACTOR = 10;
const bcrypt = require('bcryptjs');

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  deckList: { type: Array },
});

module.exports = mongoose.model('User', userSchema);
