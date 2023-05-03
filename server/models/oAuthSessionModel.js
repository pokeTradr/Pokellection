const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// cookieId is taken from the unique ObjectID that mongodb automtically generates 
// by default whenever creating new document. We store the cookieId under the 
// key 'ssid' on the client's browser.
const oaSessionSchema = new Schema({
  cookieId: { type: String, required: true, unique: true},
  createdAt: { type: Date, expires: 3600, default: Date.now }
})

module.exports = mongoose.model('OASession', oaSessionSchema);