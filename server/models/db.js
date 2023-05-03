const dotenv = require('dotenv');
const mongoose = require('mongoose');
dotenv.config();

module.exports = mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('SUCCESSFULLY CONNECTED TO DATABASE'))
  .catch((err) => console.log("Error Connecting to database: ", err))
