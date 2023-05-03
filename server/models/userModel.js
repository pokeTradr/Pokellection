const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('dotenv').config();

// const MONGO_URI: 'mongodb+srv://yangyohan1:9Ev7mpUpSgDm6K78@cluster0.kiof2xb.mongodb.net/?retryWrites=true&w=majority';
// console.log('mongoURI:', process.env.mongoURI);
mongoose.connect(process.env.mongoURI, {
  useNewURLParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.once('open', () => {
  console.log('Connected to mongoDB database');
});

const SALT_WORK_FACTOR = 10;
const bcrypt = require('bcryptjs');

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  Decklist: { type: Array }
});

module.exports = mongoose.model('User', userSchema);
