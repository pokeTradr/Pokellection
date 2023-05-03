const mongoose = require('mongoose');
const { Schema } = mongoose;

const gitHubUserSchema = new Schema({
  login: { type: String, required: true, unique: true },
  id: { type: String, unique: true },
  avatar_url: { type: String },
});

module.exports = mongoose.model('gitHubUser', gitHubUserSchema);
