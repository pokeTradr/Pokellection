const mongoose = require('mongoose');
const { Schema } = mongoose;
require('dotenv').config()
// const MONGO_URI: 'mongodb+srv://yangyohan1:9Ev7mpUpSgDm6K78@cluster0.kiof2xb.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.once('open', () => {
  console.log('Connected to database');
});

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

module.exports = mongoose.model('User', userSchema);
