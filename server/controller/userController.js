const User = require('../models/userModel');
const gitHubUser = require('../models/gitHubModel');
const db = require('../models/pokemon_model');
const oAuthSessionModel = require('../models/oAuthSessionModel')
require('dotenv').config();
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
    res.locals.ssid = ssid;

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

userController.cookieCreator = async (req, res, next) => {
  res.cookie('cookie', res.locals.ssid, {
    expires: new Date(Date.now() + 900000),
    httpOnly: true,
    sameSite: 'strict',
  })

  oAuthSessionModel.create({ cookieId: res.locals.ssid, createdAt: Date.now()})
  next()
};

userController.getUser = (req, res, next) => {
  console.log(req);
  const { username, password } = req.body;
  console.log('req body: ', req.body);
  User.findOne({ username: username }) /*, (err, result) => {*/
    .then(async (results) => {
      const passwordMatch = await bcrypt.compare(password, results.password);
      res.locals.login = passwordMatch;
      console.log(results)
      res.locals.ssid = results._id;
      return next();
    })
    .catch((err) => {
      console.log('THIS IS THE ERROR: ', err);
      const errObj = {
        log: 'AN ERROR IN THE usercontroller.getuser',
        status: 400,
        message: { err: 'AN ERROR IN THE usercontroller.getuser' },
      };
      return next(errObj);
    });
};

module.exports = userController;

