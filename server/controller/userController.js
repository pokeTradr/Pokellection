const User = require('../models/userModel');
const db = require('../models/pokemon_model');
const bcrypt = require('bcrypt');

const userController = {};

userController.createUser = async (req, res, next) => {
  const { username } = req.body;
  let { password } = req.body;
  const hash = await bcrypt.hash(password, 10);
  console.log('hash:', hash)

  try {
    // create new user in mongo server
    const newUser = await User.create({
      username: username,
      password: hash,
    });
    const ssid = newUser._id.toString();

    // create a new user in POSTSQL server
    db.query(
      'INSERT INTO users (username, password, ssid) VALUES ($1, $2, $3)',
      [username, hash, ssid]
    );

    next();
  } catch (error) {
    next({
      log: 'Express error occured in userController.createUser',
      status: 400,
      message: { err: 'Express error occured in userController.createUser' },
    });
  }
};

userController.getUser = (req, res, next) => {
  //const { username } = req.body;
  console.log('before user find one');
  console.log('req body: ', req.body);
  User.findOne({ username: req.body.username }) /*, (err, result) => {*/
    .then(async (results) => {
      console.log(results);
      const passwordMatch = await bcrypt.compare(
        req.body.password,
        results.password
      );
      console.log('PASSWORD MATCH: ', passwordMatch);
      res.locals.truthy = passwordMatch;
      return next();
    })
    .catch((err) => {
      console.log('THIS IS THE ERROR: ', err);
      const errObj = {
        log: 'AN ERROR IN THE usercontroller.getuser',
        status: 400,
        message: { err: 'chill' },
      };
      return next(errObj);
    });
};

module.exports = userController;

